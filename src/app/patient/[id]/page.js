"use client";

import { use, useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { patients } from "@/lib/mockData";
import { ArrowLeft, Calendar, User, FileText, Activity, Pill, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function PatientDetailPage({ params }) {
    // Unwrap params using React.use()
    const unwrappedParams = use(params);
    const [patient, setPatient] = useState(null);

    useEffect(() => {
        if (unwrappedParams?.id) {
            const found = patients.find(p => p.id === unwrappedParams.id);
            setPatient(found);
        }
    }, [unwrappedParams]);

    if (!patient) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            <main className="container mx-auto px-4 py-8">
                <Link href="/doctor">
                    <Button variant="ghost" className="mb-6 gap-2 pl-0 hover:bg-transparent hover:text-teal-600">
                        <ArrowLeft className="h-4 w-4" /> Back to Dashboard
                    </Button>
                </Link>

                {/* Header Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-8">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="h-32 w-32 rounded-full border-4 border-slate-100 shadow-inner overflow-hidden flex-shrink-0">
                            <img src={patient.avatar} alt={patient.name} className="h-full w-full object-cover" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-4 mb-2">
                                <h1 className="text-3xl font-bold text-slate-900">{patient.name}</h1>
                                <Badge variant={patient.status === "Critical" ? "destructive" : "default"} className="text-sm px-3 py-1">
                                    {patient.status}
                                </Badge>
                            </div>
                            <div className="flex flex-wrap gap-6 text-slate-500 mb-6">
                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4" />
                                    <span>{patient.gender}, {patient.age} years</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    <span>DOB: 01/01/1980</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Activity className="h-4 w-4" />
                                    <span>Last Visit: {patient.lastVisit}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Card className="bg-slate-50 border-slate-100">
                                    <CardContent className="p-4">
                                        <p className="text-xs font-medium text-slate-500 uppercase">Diagnosis</p>
                                        <p className="font-semibold text-slate-900">{patient.diagnosis}</p>
                                    </CardContent>
                                </Card>
                                <Card className="bg-slate-50 border-slate-100">
                                    <CardContent className="p-4">
                                        <p className="text-xs font-medium text-slate-500 uppercase">Blood Type</p>
                                        <p className="font-semibold text-slate-900">A+</p>
                                    </CardContent>
                                </Card>
                                <Card className="bg-slate-50 border-slate-100">
                                    <CardContent className="p-4">
                                        <p className="text-xs font-medium text-slate-500 uppercase">Insurance</p>
                                        <p className="font-semibold text-slate-900">MediCare Plus</p>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Medical History */}
                    <div className="lg:col-span-2 space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <FileText className="h-5 w-5 text-teal-600" />
                                    Medical History
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    {patient.history.length > 0 ? patient.history.map((record, i) => (
                                        <div key={i} className="flex gap-4 pb-6 border-b border-slate-100 last:border-0 last:pb-0">
                                            <div className="flex flex-col items-center">
                                                <div className="h-2 w-2 rounded-full bg-teal-600 mb-1" />
                                                <div className="w-0.5 flex-1 bg-slate-100" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start mb-1">
                                                    <h3 className="font-semibold text-slate-900">{record.type}</h3>
                                                    <span className="text-sm text-slate-500">{record.date}</span>
                                                </div>
                                                <p className="text-sm text-slate-600 mb-2">{record.notes}</p>
                                                <Badge variant="secondary" className="text-xs font-normal">
                                                    {record.doctor}
                                                </Badge>
                                            </div>
                                        </div>
                                    )) : (
                                        <p className="text-slate-500 italic">No history records found.</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Activity className="h-5 w-5 text-teal-600" />
                                    Vitals Trends
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-48 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100 border-dashed">
                                    <p className="text-slate-400">Chart Visualization Placeholder</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column: Medications & Allergies */}
                    <div className="space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Pill className="h-5 w-5 text-blue-600" />
                                    Current Medications
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3">
                                    {patient.medications.map((med, i) => (
                                        <li key={i} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg text-blue-900 font-medium">
                                            <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                                            {med}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                                    Allergies
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {patient.allergies.map((allergy, i) => (
                                        <Badge key={i} variant="destructive" className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200">
                                            {allergy}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Notes</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    {patient.notes}
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
}
