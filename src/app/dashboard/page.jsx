"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PatientAnalysis } from '@/components/dashboard/PatientAnalysis';
import { OperationalEfficiency } from '@/components/dashboard/OperationalEfficiency';
import { GeographicDistribution } from '@/components/dashboard/GeographicDistribution';
import { getDashboardMetrics } from '@/lib/api/dashboard';
import { ApiError } from '@/lib/api/client';
import { normalizeDashboardMetrics } from '@/lib/transforms/dashboard';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Loader2, ArrowLeft, BarChart3, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
    const [metrics, setMetrics] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeSection, setActiveSection] = useState('patient');

    useEffect(() => {
        loadMetrics();
    }, []);

    const loadMetrics = async () => {
        setIsLoading(true);
        setError('');

        try {
            const result = await getDashboardMetrics();
            setMetrics(result);
        } catch (err) {
            if (err instanceof ApiError) {
                setError(err.message);
            } else {
                setError('Errore nel caricamento delle metriche');
            }
            console.error('Dashboard error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const sections = [
        { id: 'patient', label: 'Analisi Pazienti', icon: BarChart3 },
        { id: 'operational', label: 'Efficienza Operativa', icon: BarChart3 },
        { id: 'geographic', label: 'Distribuzione Geografica', icon: BarChart3 }
    ];

    // Transform backend data for components
    const transformedMetrics = normalizeDashboardMetrics(metrics);

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
                                <h1 className="text-2xl font-bold text-slate-900">Analytics Dashboard</h1>
                                <p className="text-sm text-slate-500">Insights completi sui dati clinici e operativi</p>
                            </div>
                        </div>
                        <Button onClick={loadMetrics} variant="outline" className="gap-2">
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
                    className="space-y-6"
                >
                    {/* Section Tabs */}
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {sections.map(section => (
                            <button
                                key={section.id}
                                onClick={() => setActiveSection(section.id)}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${activeSection === section.id
                                    ? 'bg-teal-600 text-white'
                                    : 'bg-white text-slate-600 hover:bg-slate-100'
                                    }`}
                            >
                                {section.label}
                            </button>
                        ))}
                    </div>

                    {/* Loading State */}
                    {isLoading && (
                        <Card>
                            <CardContent className="p-12">
                                <div className="text-center">
                                    <Loader2 className="h-12 w-12 text-teal-600 animate-spin mx-auto mb-4" />
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

                    {/* Error State */}
                    {error && !isLoading && (
                        <Card className="border-red-200 bg-red-50">
                            <CardContent className="p-6">
                                <h3 className="font-semibold text-red-900 mb-2">Errore</h3>
                                <p className="text-red-600 mb-4">{error}</p>
                                <Button onClick={loadMetrics} variant="outline">
                                    Riprova
                                </Button>
                            </CardContent>
                        </Card>
                    )}

                    {/* Dashboard Sections */}
                    {transformedMetrics && !isLoading && (
                        <motion.div
                            key={activeSection}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {activeSection === 'patient' && (
                                <PatientAnalysis data={transformedMetrics.patientAnalysis} />
                            )}
                            {activeSection === 'operational' && (
                                <OperationalEfficiency data={transformedMetrics.operationalEfficiency} />
                            )}
                            {activeSection === 'geographic' && (
                                <GeographicDistribution data={transformedMetrics.geographicDistribution} />
                            )}
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
