import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Activity, Calendar, FileText, ArrowRight, Phone, Mail, MapPin } from "lucide-react";

export function PatientSummary({ patient }) {
    if (!patient) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 p-8 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                <Activity className="h-12 w-12 mb-4 opacity-50" />
                <p className="text-lg font-medium">Select a patient to view details</p>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col gap-6">
            {/* Header Card */}
            <Card className="border-none shadow-md bg-gradient-to-br from-white to-slate-50">
                <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="h-20 w-20 rounded-full border-4 border-white shadow-sm overflow-hidden bg-slate-100">
                                <img src={patient.avatar} alt={patient.name} className="h-full w-full object-cover" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900">{patient.name}</h2>
                                <div className="flex items-center gap-2 mt-1 text-slate-500 text-sm">
                                    <span>{patient.gender}, {patient.age} yrs</span>
                                    <span>•</span>
                                    <span>ID: #{patient.id}</span>
                                </div>
                                <div className="flex gap-2 mt-3">
                                    <Badge variant={patient.status === "Critical" ? "destructive" : "default"}>
                                        {patient.status}
                                    </Badge>
                                    <Badge variant="secondary">{patient.diagnosis}</Badge>
                                </div>
                            </div>
                        </div>
                        <Link href={`/patient/${patient.id}`}>
                            <Button className="gap-2 shadow-lg shadow-teal-600/20">
                                Full Profile <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
                <Card className="bg-blue-50 border-blue-100">
                    <CardContent className="p-4 flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                            <Calendar className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-xs text-blue-600 font-medium uppercase tracking-wider">Last Visit</p>
                            <p className="font-semibold text-slate-900">{patient.lastVisit}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-purple-50 border-purple-100">
                    <CardContent className="p-4 flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                            <FileText className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-xs text-purple-600 font-medium uppercase tracking-wider">Notes</p>
                            <p className="font-semibold text-slate-900 truncate max-w-[120px]">{patient.notes}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Contact Info */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-3 text-slate-600">
                        <Phone className="h-4 w-4 text-slate-400" />
                        <span>{patient.contact.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600">
                        <Mail className="h-4 w-4 text-slate-400" />
                        <span>{patient.contact.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600">
                        <MapPin className="h-4 w-4 text-slate-400" />
                        <span>{patient.contact.address}</span>
                    </div>
                </CardContent>
            </Card>

            {/* Recent History Preview */}
            <Card className="flex-1">
                <CardHeader>
                    <CardTitle className="text-lg">Recent History</CardTitle>
                </CardHeader>
                <CardContent>
                    {patient.history.length > 0 ? (
                        <div className="space-y-4">
                            {patient.history.slice(0, 2).map((record, i) => (
                                <div key={i} className="flex gap-4 pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                                    <div className="text-xs font-medium text-slate-500 w-20 pt-1">{record.date}</div>
                                    <div>
                                        <p className="font-medium text-slate-900">{record.type}</p>
                                        <p className="text-sm text-slate-500">{record.notes}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-slate-500 text-sm italic">No recent history available.</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
