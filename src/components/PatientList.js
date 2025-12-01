import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { Search, User } from "lucide-react";
import { patients } from "@/lib/mockData";
import { cn } from "@/lib/utils";

export function PatientList({ selectedPatientId, onSelectPatient }) {
    return (
        <div className="flex flex-col h-full">
            <div className="mb-4 space-y-4">
                <h2 className="text-xl font-bold text-slate-900">My Patients</h2>
                <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input placeholder="Search patients..." className="pl-9 bg-white" />
                </div>
            </div>

            <ScrollArea className="flex-1 -mx-2 px-2">
                <div className="space-y-2 pb-4">
                    {patients.map((patient) => (
                        <div
                            key={patient.id}
                            onClick={() => onSelectPatient(patient.id)}
                            className={cn(
                                "flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border",
                                selectedPatientId === patient.id
                                    ? "bg-teal-50 border-teal-200 shadow-sm"
                                    : "bg-white border-transparent hover:bg-slate-50 hover:border-slate-200"
                            )}
                        >
                            <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200">
                                <img src={patient.avatar} alt={patient.name} className="h-full w-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className={cn(
                                    "font-medium truncate",
                                    selectedPatientId === patient.id ? "text-teal-900" : "text-slate-900"
                                )}>
                                    {patient.name}
                                </h3>
                                <p className="text-xs text-slate-500 truncate">{patient.diagnosis}</p>
                            </div>
                            {patient.status === "Critical" && (
                                <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                            )}
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}
