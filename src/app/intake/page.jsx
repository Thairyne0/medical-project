"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileUploadZone } from '@/components/FileUploadZone';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { uploadPdf } from '@/lib/api/intake';
import { ApiError } from '@/lib/api/client';
import { Loader2, CheckCircle2, ArrowLeft, FileText, Edit2, Check } from 'lucide-react';
import Link from 'next/link';

export default function IntakePage() {
    const [file, setFile] = useState(null);
    const [extractedData, setExtractedData] = useState(null);
    const [isExtracting, setIsExtracting] = useState(false);
    const [error, setError] = useState('');

    const handleFileSelect = async (selectedFile) => {
        setFile(selectedFile);
        setExtractedData(null);
        setError('');

        if (selectedFile) {
            await handleExtract(selectedFile);
        }
    };

    const handleExtract = async (fileToExtract) => {
        setIsExtracting(true);
        setError('');

        try {
            const result = await uploadPdf(fileToExtract);
            setExtractedData(result);
        } catch (err) {
            if (err instanceof ApiError) {
                setError(err.message);
            } else {
                setError('Errore durante l\'estrazione del PDF');
            }
            console.error('Extraction error:', err);
        } finally {
            setIsExtracting(false);
        }
    };

    const handleReset = () => {
        setFile(null);
        setExtractedData(null);
        setError('');
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-white border-b border-slate-200">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center gap-4">
                        <Link href="/">
                            <Button variant="ghost" size="icon">
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">Patient Intake</h1>
                            <p className="text-sm text-slate-500">Carica report clinici per l&apos;estrazione automatica dei dati</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl mx-auto space-y-6"
                >
                    {/* Upload Section */}
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-teal-100 rounded-lg">
                                    <FileText className="h-5 w-5 text-teal-600" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-slate-900">Carica Report Clinico</h2>
                                    <p className="text-sm text-slate-500">Formato PDF, massimo 10MB</p>
                                </div>
                            </div>
                            <FileUploadZone onFileSelect={handleFileSelect} />
                        </CardContent>
                    </Card>

                    {/* Loading State */}
                    {isExtracting && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
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
                        </motion.div>
                    )}

                    {/* Extraction Results */}
                    {extractedData && !isExtracting && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-lg font-bold text-slate-900">Informazioni Estratte</h3>
                                        <div className="flex items-center gap-2 text-sm text-green-600">
                                            <CheckCircle2 className="h-4 w-4" />
                                            <span>Salvato automaticamente</span>
                                        </div>
                                    </div>

                                    {/* We use DataField for read-only view here, matching the previous design */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <DataField label="ID Paziente" value={extractedData.patient_id} />
                                        <DataField label="Nome" value={extractedData.patient_name} />
                                        <DataField label="Età" value={extractedData.age.toString()} />
                                        <DataField label="Sesso" value={extractedData.sex} />
                                        <DataField label="Diagnosi" value={extractedData.diagnosis} className="md:col-span-2" />
                                        <DataField label="Gruppo Patologia" value={extractedData.pathology_group} />
                                        <DataField label="Reparto" value={extractedData.department} />
                                        <DataField label="Data Ammissione" value={new Date(extractedData.admission_date).toLocaleDateString('it-IT')} />
                                        <DataField label="Data Dimissione" value={new Date(extractedData.discharge_date).toLocaleDateString('it-IT')} />
                                        <DataField label="Città" value={extractedData.city} />
                                        <DataField label="Regione" value={extractedData.region || "N/A"} />
                                        <DataField label="Risultati Chiave" value={extractedData.key_findings} className="md:col-span-2" />
                                    </div>

                                    <div className="mt-6 pt-6 border-t border-slate-200">
                                        <Button onClick={handleReset} variant="outline" className="w-full">
                                            Carica Nuovo Documento
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}

                    {/* Error State */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <Card className="border-red-200 bg-red-50">
                                <CardContent className="p-6">
                                    <h3 className="font-semibold text-red-900 mb-2">Errore</h3>
                                    <p className="text-sm text-red-600">{error}</p>
                                    <Button onClick={handleReset} variant="outline" className="mt-4">
                                        Riprova
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}

                    {/* Info Card */}
                    {!file && !extractedData && (
                        <Card className="bg-blue-50 border-blue-200">
                            <CardContent className="p-6">
                                <h3 className="font-semibold text-blue-900 mb-2">Come funziona</h3>
                                <ul className="space-y-2 text-sm text-blue-800">
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-600 mt-0.5">•</span>
                                        <span>Carica un report clinico PDF contenente informazioni paziente</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-600 mt-0.5">•</span>
                                        <span>L&apos;AI estrarrà automaticamente i dati chiave (ID paziente, diagnosi, date, ecc.)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-600 mt-0.5">•</span>
                                        <span>I dati vengono salvati automaticamente nel database</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-600 mt-0.5">•</span>
                                        <span>Visualizza i risultati immediatamente dopo l&apos;estrazione</span>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>
                    )}
                </motion.div>
            </div>
        </div>
    );
}

// Helper component for displaying data fields
function DataField({ label, value, className = '' }) {
    return (
        <div className={`space-y-1 ${className}`}>
            <label className="text-sm font-medium text-slate-700">{label}</label>
            <div className="px-3 py-2 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-900">{value}</span>
            </div>
        </div>
    );
}
