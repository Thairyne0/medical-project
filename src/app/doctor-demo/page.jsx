"use client";

import { useState } from "react";
import { DemoLayout } from "@/components/doctor-demo/DemoLayout";
import { FeatureIntro } from "@/components/doctor-demo/FeatureIntro";
import { FileUploadZone } from "@/components/FileUploadZone";
import { ExtractionResultsTable } from "@/components/ExtractionResultsTable";
import { PatientAnalysis } from "@/components/dashboard/PatientAnalysis";
import { OperationalEfficiency } from "@/components/dashboard/OperationalEfficiency";
import { GeographicDistribution } from "@/components/dashboard/GeographicDistribution";
import { DashboardFilters } from "@/components/dashboard/DashboardFilters";
import { ForecastChart } from "@/components/forecast/ForecastChart";
import { ForecastMetrics } from "@/components/forecast/ForecastMetrics";
import { uploadPdf } from "@/lib/api/intake";
import { getDashboardMetrics } from "@/lib/api/dashboard";
import { getWeeklyForecast } from "@/lib/api/forecast";
import { ApiError } from "@/lib/api/client";
import { normalizeDashboardMetrics } from "@/lib/transforms/dashboard";
import { normalizeForecastData } from "@/lib/transforms/forecast";
import { Card, CardContent } from "@/components/ui/Card";
import {
    FileText,
    BarChart3,
    TrendingUp,
    Loader2,
    CheckCircle2,
    RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function DoctorDemoPage() {
    const [activeTab, setActiveTab] = useState("ai-analysis");

    // AI Analysis state
    const [file, setFile] = useState(null);
    const [extractedData, setExtractedData] = useState(null);
    const [isExtracting, setIsExtracting] = useState(false);
    const [extractError, setExtractError] = useState("");

    // Analytics state
    const [metrics, setMetrics] = useState(null);
    const [isLoadingMetrics, setIsLoadingMetrics] = useState(false);
    const [metricsError, setMetricsError] = useState("");

    // Forecast state
    const [forecastData, setForecastData] = useState(null);
    const [isLoadingForecast, setIsLoadingForecast] = useState(false);
    const [forecastError, setForecastError] = useState("");

    const tabs = [
        { id: "ai-analysis", label: "AI Document Analysis", icon: FileText },
        { id: "analytics", label: "Clinical Analytics", icon: BarChart3 },
        { id: "forecast", label: "Workload Forecasting", icon: TrendingUp },
    ];

    // AI Analysis handlers
    const handleFileSelect = async (selectedFile) => {
        setFile(selectedFile);
        setExtractedData(null);
        setExtractError("");

        if (selectedFile) {
            setIsExtracting(true);
            try {
                const result = await uploadPdf(selectedFile);
                setExtractedData(result);
            } catch (err) {
                if (err instanceof ApiError) {
                    setExtractError(err.message);
                } else {
                    setExtractError("Errore durante l'estrazione");
                }
            } finally {
                setIsExtracting(false);
            }
        }
    };

    const handleConfirm = async (data) => {
        // In the real backend integration, data is saved automatically on upload.
        // This handler is kept for UI consistency if we want to show a success message or reset.
        // For now, we can just reset the view.
        setFile(null);
        setExtractedData(null);
    };

    const handleCancel = () => {
        setFile(null);
        setExtractedData(null);
        setExtractError("");
    };

    // Analytics handlers
    const loadMetrics = async () => {
        setIsLoadingMetrics(true);
        setMetricsError("");
        try {
            const result = await getDashboardMetrics();
            setMetrics(result);
        } catch (err) {
            if (err instanceof ApiError) {
                setMetricsError(err.message);
            } else {
                setMetricsError("Errore nel caricamento delle metriche");
            }
        } finally {
            setIsLoadingMetrics(false);
        }
    };

    // Forecast handlers
    const loadForecast = async () => {
        setIsLoadingForecast(true);
        setForecastError("");
        try {
            const result = await getWeeklyForecast();
            setForecastData(result);
        } catch (err) {
            if (err instanceof ApiError) {
                setForecastError(err.message);
            } else {
                setForecastError("Errore nella generazione delle previsioni");
            }
        } finally {
            setIsLoadingForecast(false);
        }
    };

    // Load data when switching tabs
    const handleTabChange = (tabId) => {
        setActiveTab(tabId);

        if (tabId === "analytics" && !metrics) {
            loadMetrics();
        }

        if (tabId === "forecast" && !forecastData) {
            loadForecast();
        }
    };

    // Transform metrics for display components
    const transformedMetrics = normalizeDashboardMetrics(metrics);

    // Transform forecast for display components
    const normalizedForecast = normalizeForecastData(forecastData);
    const transformedForecast = normalizedForecast
        ? {
            historical: normalizedForecast.historical,
            forecast: normalizedForecast.forecast,
            metrics: {
                expectedTotal: normalizedForecast.expectedTotal,
                peakDay: normalizedForecast.peakDay,
                averageDaily: normalizedForecast.averageDaily,
                trend: "stable", // Backend doesn't provide trend yet
            },
            recommendations: {
                staffing: "Maintain current staffing levels.",
                beds: "Bed capacity is sufficient for expected demand.",
                equipment: "Standard equipment availability required.",
            },
        }
        : null;

    return (
        <DemoLayout activeTab={activeTab} onTabChange={handleTabChange} tabs={tabs}>
            {/* AI Document Analysis Tab */}
            {activeTab === "ai-analysis" && (
                <div className="max-w-4xl mx-auto space-y-6">
                    <FeatureIntro
                        icon={FileText}
                        title="AI Document Analysis"
                        description="Carica report clinici in formato PDF e l'AI estrae automaticamente informazioni chiave come dati paziente, diagnosi, date di ricovero, e risultati clinici."
                        benefits={[
                            "Risparmia tempo nell'inserimento dati",
                            "Riduce errori di trascrizione",
                            "Standardizza l'acquisizione dati",
                            "Estrazione automatica in pochi secondi",
                        ]}
                        color="teal"
                    />

                    <Card>
                        <CardContent className="p-6">
                            <FileUploadZone onFileSelect={handleFileSelect} />
                        </CardContent>
                    </Card>

                    {isExtracting && (
                        <Card>
                            <CardContent className="p-12">
                                <div className="text-center">
                                    <Loader2 className="h-12 w-12 text-teal-600 animate-spin mx-auto mb-4" />
                                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                                        Estrazione in corso...
                                    </h3>
                                    <p className="text-sm text-slate-500">
                                        L&apos;AI sta analizzando il documento clinico
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {extractedData && !isExtracting && (
                        <ExtractionResultsTable
                            data={{
                                patientId: extractedData.patient_id,
                                patientName: extractedData.patient_name,
                                age: extractedData.age,
                                sex: extractedData.sex,
                                diagnosis: extractedData.diagnosis,
                                pathologyGroup: extractedData.pathology_group,
                                admissionDate: extractedData.admission_date,
                                dischargeDate: extractedData.discharge_date,
                                department: extractedData.department,
                                city: extractedData.city,
                                region: extractedData.region,
                                keyFindings: extractedData.key_findings,
                            }}
                            onConfirm={handleConfirm}
                            onCancel={handleCancel}
                        />
                    )}

                    {extractError && (
                        <Card className="border-red-200 bg-red-50">
                            <CardContent className="p-4">
                                <p className="text-sm text-red-600">{extractError}</p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            )}

            {/* Clinical Analytics Tab */}
            {activeTab === "analytics" && (
                <div className="space-y-6">
                    <FeatureIntro
                        icon={BarChart3}
                        title="Clinical Analytics"
                        description="Dashboard analitica completa con visualizzazioni di distribuzione pazienti per patologia ed età, metriche di efficienza operativa, e distribuzione geografica."
                        benefits={[
                            "Insights immediati sui dati clinici",
                            "Monitora efficienza operativa",
                            "Analizza provenienza pazienti",
                            "Identifica trend e pattern",
                        ]}
                        color="purple"
                    />

                    {/* Filters sono disabilitati per ora */}
                    {/* <DashboardFilters onFilterChange={handleFilterChange} /> */}

                    {isLoadingMetrics && (
                        <Card>
                            <CardContent className="p-12">
                                <div className="text-center">
                                    <Loader2 className="h-12 w-12 text-purple-600 animate-spin mx-auto mb-4" />
                                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                                        Caricamento Analytics...
                                    </h3>
                                    <p className="text-sm text-slate-500">
                                        Calcolo delle metriche dai dati pazienti
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {metricsError && (
                        <Card className="border-red-200 bg-red-50">
                            <CardContent className="p-6">
                                <p className="text-red-600">{metricsError}</p>
                            </CardContent>
                        </Card>
                    )}

                    {transformedMetrics && !isLoadingMetrics && (
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 mb-4">
                                    Analisi Pazienti
                                </h3>
                                <PatientAnalysis data={transformedMetrics.patientAnalysis} />
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-slate-900 mb-4">
                                    Efficienza Operativa
                                </h3>
                                <OperationalEfficiency
                                    data={transformedMetrics.operationalEfficiency}
                                />
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-slate-900 mb-4">
                                    Distribuzione Geografica
                                </h3>
                                <GeographicDistribution
                                    data={transformedMetrics.geographicDistribution}
                                />
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Workload Forecasting Tab */}
            {activeTab === "forecast" && (
                <div className="max-w-6xl mx-auto space-y-6">
                    <FeatureIntro
                        icon={TrendingUp}
                        title="Workload Forecasting"
                        description="Previsioni del carico di lavoro per i prossimi 7 giorni usando algoritmi di machine learning, con raccomandazioni per ottimizzare risorse (personale, letti, attrezzature)."
                        benefits={[
                            "Pianifica risorse in anticipo",
                            "Ottimizza costi operativi",
                            "Migliora gestione personale",
                            "Previeni sovraccarichi",
                        ]}
                        color="blue"
                    />

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-semibold text-slate-900 mb-1">
                                        Previsione Settimanale
                                    </h3>
                                    <p className="text-sm text-slate-500">
                                        Analisi basata sui dati storici recenti
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        onClick={loadForecast}
                                        variant="outline"
                                        className="gap-2"
                                    >
                                        <RefreshCw className="h-4 w-4" />
                                        Aggiorna
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {isLoadingForecast && (
                        <Card>
                            <CardContent className="p-12">
                                <div className="text-center">
                                    <Loader2 className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
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

                    {forecastError && (
                        <Card className="border-red-200 bg-red-50">
                            <CardContent className="p-6">
                                <p className="text-red-600">{forecastError}</p>
                            </CardContent>
                        </Card>
                    )}

                    {transformedForecast && !isLoadingForecast && (
                        <>
                            <ForecastChart
                                historical={transformedForecast.historical}
                                forecast={transformedForecast.forecast}
                            />
                            <ForecastMetrics
                                metrics={transformedForecast.metrics}
                                recommendations={transformedForecast.recommendations}
                            />
                        </>
                    )}
                </div>
            )}
        </DemoLayout>
    );
}
