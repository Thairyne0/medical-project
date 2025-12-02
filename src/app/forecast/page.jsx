"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ForecastChart } from "@/components/forecast/ForecastChart";
import { getWeeklyForecast } from "@/lib/api/forecast";
import { ApiError } from "@/lib/api/client";
import { normalizeForecastData } from "@/lib/transforms/forecast";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
    Loader2,
    ArrowLeft,
    TrendingUp,
    RefreshCw,
    Users,
    Calendar,
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export default function ForecastPage() {
    const [forecastData, setForecastData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadForecast();
    }, []);

    const loadForecast = async () => {
        setIsLoading(true);
        setError("");

        try {
            const result = await getWeeklyForecast();
            setForecastData(result);
        } catch (err) {
            if (err instanceof ApiError) {
                setError(err.message);
            } else {
                setError("Errore nella generazione delle previsioni");
            }
            console.error("Forecast error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    // Transform backend data for chart component
    const transformedData = normalizeForecastData(forecastData);
    const hasPeakDate = transformedData?.peakDay?.date && !Number.isNaN(new Date(transformedData.peakDay.date).valueOf());
    const peakDayLabel = hasPeakDate
        ? format(new Date(transformedData.peakDay.date), "dd MMM")
        : "N/A";
    const peakDayValue = transformedData?.peakDay?.value ?? "N/A";

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-white border-b border-slate-200">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href="/">
                                <Button variant="ghost" size="icon">
                                    <ArrowLeft className="h-5 w-5" />
                                </Button>
                            </Link>
                            <div>
                                <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                                    <TrendingUp className="h-6 w-6 text-teal-600" />
                                    Workload Forecast
                                </h1>
                                <p className="text-sm text-slate-500">
                                    Previsioni carico di lavoro per i prossimi 7 giorni
                                </p>
                            </div>
                        </div>
                        <Button onClick={loadForecast} variant="outline" className="gap-2">
                            <RefreshCw className="h-4 w-4" />
                            Aggiorna
                        </Button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-6xl mx-auto space-y-6"
                >
                    {/* Loading State */}
                    {isLoading && (
                        <Card>
                            <CardContent className="p-12">
                                <div className="text-center">
                                    <Loader2 className="h-12 w-12 text-teal-600 animate-spin mx-auto mb-4" />
                                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                                        Generazione Previsioni...
                                    </h3>
                                    <p className="text-sm text-slate-500">
                                        Analisi dati storici e calcolo predizioni
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Error State */}
                    {error && !isLoading && (
                        <Card className="border-red-200 bg-red-50">
                            <CardContent className="p-6">
                                <h3 className="font-semibold text-red-900 mb-2">Errore</h3>
                                <p className="text-red-600 mb-4">{error}</p>
                                <Button onClick={loadForecast} variant="outline">
                                    Riprova
                                </Button>
                            </CardContent>
                        </Card>
                    )}

                    {/* Forecast Results */}
                    {transformedData && !isLoading && (
                        <>
                            {/* KPI Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Card>
                                    <CardContent className="p-6">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-teal-100 rounded-xl">
                                                <Users className="h-6 w-6 text-teal-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-slate-500">
                                                    Pazienti Attesi
                                                </p>
                                                <h3 className="text-2xl font-bold text-slate-900">
                                                    {transformedData.expectedTotal}
                                                </h3>
                                                <p className="text-xs text-slate-400">
                                                    Prossimi 7 giorni
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent className="p-6">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-purple-100 rounded-xl">
                                                <Calendar className="h-6 w-6 text-purple-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-slate-500">
                                                    Giorno di Picco
                                                </p>
                                                <h3 className="text-lg font-bold text-slate-900">
                                                    {peakDayLabel}
                                                </h3>
                                                <p className="text-xs text-slate-400">
                                                    {peakDayValue} pazienti
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent className="p-6">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-blue-100 rounded-xl">
                                                <TrendingUp className="h-6 w-6 text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-slate-500">
                                                    Media Giornaliera
                                                </p>
                                                <h3 className="text-2xl font-bold text-slate-900">
                                                    {transformedData.averageDaily}
                                                </h3>
                                                <p className="text-xs text-slate-400">
                                                    pazienti/giorno
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Forecast Chart */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <ForecastChart
                                    historical={transformedData.historical ?? []}
                                    forecast={transformedData.forecast ?? []}
                                />
                            </motion.div>

                            {/* Forecast Table */}
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="text-lg font-bold text-slate-900 mb-4">
                                        Dettaglio Previsioni
                                    </h3>
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="border-b border-slate-200">
                                                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">
                                                        Data
                                                    </th>
                                                    <th className="text-right py-3 px-4 text-sm font-semibold text-slate-700">
                                                        Pazienti Previsti
                                                    </th>
                                                    <th className="text-right py-3 px-4 text-sm font-semibold text-slate-700">
                                                        Range Confidenza
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {transformedData.forecast.map((point, index) => (
                                                    <tr
                                                        key={index}
                                                        className="border-b border-slate-100 hover:bg-slate-50"
                                                    >
                                                        <td className="py-3 px-4 text-sm text-slate-900">
                                                            {format(
                                                                new Date(point.date),
                                                                "EEEE, dd MMMM yyyy"
                                                            )}
                                                        </td>
                                                        <td className="py-3 px-4 text-sm text-right font-semibold text-slate-900">
                                                            {Math.round(point.value ?? 0)}
                                                        </td>
                                                        <td className="py-3 px-4 text-sm text-right text-slate-600">
                                                            {point.confidence?.lower != null && point.confidence?.upper != null
                                                                ? `${Math.round(point.confidence.lower)} - ${Math.round(point.confidence.upper)}`
                                                                : "N/A"}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Info Card */}
                            <Card className="bg-slate-100 border-slate-300">
                                <CardContent className="p-6">
                                    <h3 className="font-semibold text-slate-900 mb-2">
                                        Informazioni sul Forecast
                                    </h3>
                                    <ul className="space-y-2 text-sm text-slate-700">
                                        <li className="flex items-start gap-2">
                                            <span className="text-teal-600 mt-0.5">•</span>
                                            <span>
                                                Le previsioni sono generate usando algoritmi di machine
                                                learning basati sui dati storici
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-teal-600 mt-0.5">•</span>
                                            <span>
                                                Il range di confidenza mostra l&apos;intervallo probabile di
                                                pazienti attesi
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-teal-600 mt-0.5">•</span>
                                            <span>
                                                Usa queste previsioni per ottimizzare staffing, letti e
                                                attrezzature
                                            </span>
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
