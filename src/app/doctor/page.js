"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { PatientList } from "@/components/PatientList";
import { PatientSummary } from "@/components/PatientSummary";
import { NotificationList } from "@/components/NotificationList";
import { patients } from "@/lib/mockData";

export default function DoctorDashboard() {
    const [selectedPatientId, setSelectedPatientId] = useState(null);

    const selectedPatient = patients.find(p => p.id === selectedPatientId);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />

            <main className="flex-1 container mx-auto px-4 py-6 overflow-hidden h-[calc(100vh-64px)]">
                <div className="grid grid-cols-12 gap-6 h-full">
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
            </main>
        </div>
    );
}
