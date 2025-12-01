"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { PatientList } from "@/components/PatientList";
import { PatientSummary } from "@/components/PatientSummary";
import { NotificationList } from "@/components/NotificationList";
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";
import { patients } from "@/lib/mockData";
import { Button } from "@/components/ui/Button";
import { LayoutDashboard, Users } from "lucide-react";

export default function DoctorDashboard() {
    const [selectedPatientId, setSelectedPatientId] = useState(null);
    const [view, setView] = useState("patients"); // 'patients' or 'analytics'

    const selectedPatient = patients.find(p => p.id === selectedPatientId);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />

            <main className="flex-1 container mx-auto px-4 py-6 overflow-hidden h-[calc(100vh-64px)]">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-slate-900">
                        {view === "patients" ? "Patient Management" : "Hospital Insights"}
                    </h1>
                    <div className="flex bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
                        <button
                            onClick={() => setView("patients")}
                            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${view === "patients" ? "bg-teal-50 text-teal-700" : "text-slate-500 hover:text-slate-900"
                                }`}
                        >
                            <Users className="h-4 w-4" /> Patients
                        </button>
                        <button
                            onClick={() => setView("analytics")}
                            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${view === "analytics" ? "bg-teal-50 text-teal-700" : "text-slate-500 hover:text-slate-900"
                                }`}
                        >
                            <LayoutDashboard className="h-4 w-4" /> Analytics
                        </button>
                    </div>
                </div>

                {view === "patients" ? (
                    <div className="grid grid-cols-12 gap-6 h-[calc(100%-60px)]">
                        {/* Left Sidebar: Patients & Notifications */}
                        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6 h-full overflow-hidden">
                            <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 p-4 overflow-hidden">
                                <PatientList
                                    selectedPatientId={selectedPatientId}
                                    onSelectPatient={setSelectedPatientId}
                                />
                            </div>
                            <div className="h-1/3 bg-white rounded-2xl shadow-sm border border-slate-200 p-4 overflow-auto">
                                <NotificationList />
                            </div>
                        </div>

                        {/* Right Panel: Patient Summary */}
                        <div className="col-span-12 lg:col-span-8 h-full overflow-auto">
                            <PatientSummary patient={selectedPatient} />
                        </div>
                    </div>
                ) : (
                    <AnalyticsDashboard />
                )}
            </main>
        </div>
    );
}
