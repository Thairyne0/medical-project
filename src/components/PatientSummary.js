import { useState } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { MessagingPanel } from "@/components/MessagingPanel";
import { Activity, Calendar, FileText, ArrowRight, Phone, Mail, MapPin, Send, Eye, CalendarPlus } from "lucide-react";
import { messages as mockMessages, aiAnalysisResults } from "@/lib/mockData";

export function PatientSummary({ patient }) {
    const [patientMessages, setPatientMessages] = useState(patient ? (mockMessages[patient.id] || []) : []);
    const [showDocuments, setShowDocuments] = useState(false);
    const [showAIAnalysis, setShowAIAnalysis] = useState(false);
    const [selectedDocId, setSelectedDocId] = useState(null);

    const handleSendMessage = (text) => {
        if (!patient) return;
        const newMsg = {
            id: patientMessages.length + 1,
            from: "doctor",
            sender: "Dr. Rossi",
            text,
            timestamp: new Date().toLocaleString("it-IT"),
            type: "text"
        };
        setPatientMessages([...patientMessages, newMsg]);
    };

    const handleRecommendVisit = () => {
        if (!patient) return;
        const visitMsg = {
            id: patientMessages.length + 1,
            from: "doctor",
            sender: "Dr. Rossi",
            text: "Ti consiglio una visita di controllo. Ho programmato un appuntamento.",
            timestamp: new Date().toLocaleString("it-IT"),
            type: "visit_recommendation",
            visitDetails: {
                date: "2024-03-15",
                time: "10:00",
                reason: "Controllo di routine"
            }
        };
        setPatientMessages([...patientMessages, visitMsg]);
    };

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

            {/* Clinical AI Suite */}
            <Card className="border-teal-100 bg-teal-50/30">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-bold text-teal-800 flex items-center gap-2">
                        <Activity className="h-4 w-4" /> Clinical AI Suite
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <div className="flex justify-between text-sm mb-1">
                            <span className="text-slate-600">Readmission Risk (PredictiveAI)</span>
                            <span className="font-bold text-red-600">High (78%)</span>
                        </div>
                        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-red-500 w-[78%]" />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1 bg-white border-teal-200 text-teal-700 hover:bg-teal-50">
                            Generate Discharge
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 bg-white border-teal-200 text-teal-700 hover:bg-teal-50">
                            Automate Billing
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Doctor Actions */}
            <Card className="border-purple-100 bg-purple-50/30">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-bold text-purple-800">Azioni Medico</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                        <Button
                            size="sm"
                            variant="outline"
                            className="bg-white border-purple-200 text-purple-700 hover:bg-purple-50"
                            onClick={handleRecommendVisit}
                        >
                            <CalendarPlus className="h-4 w-4 mr-2" />
                            Consiglia Visita
                        </Button>
                        <Button
                            size="sm"
                            variant="outline"
                            className="bg-white border-purple-200 text-purple-700 hover:bg-purple-50"
                            onClick={() => setShowDocuments(!showDocuments)}
                        >
                            <Eye className="h-4 w-4 mr-2" />
                            Vedi Documenti
                        </Button>
                    </div>
                    {showDocuments && (
                        <div className="p-3 bg-white rounded-lg border border-purple-100 space-y-2">
                            <p className="text-xs font-medium text-slate-600">Documenti Paziente:</p>
                            {[1, 2].map(docId => {
                                const analysis = aiAnalysisResults[docId];
                                return analysis ? (
                                    <div key={docId} className="flex items-center justify-between p-2 bg-slate-50 rounded">
                                        <span className="text-sm">{analysis.documentName}</span>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            className="text-xs h-6"
                                            onClick={() => {
                                                setSelectedDocId(docId);
                                                setShowAIAnalysis(true);
                                            }}
                                        >
                                            Analisi AI
                                        </Button>
                                    </div>
                                ) : null;
                            })}
                        </div>
                    )}
                    {showAIAnalysis && selectedDocId && aiAnalysisResults[selectedDocId] && (
                        <div className="p-3 bg-white rounded-lg border border-purple-100 space-y-2">
                            <div className="flex justify-between items-center">
                                <p className="text-xs font-bold text-purple-700">Analisi AI</p>
                                <button
                                    onClick={() => setShowAIAnalysis(false)}
                                    className="text-xs text-slate-400 hover:text-slate-600"
                                >
                                    ✕
                                </button>
                            </div>
                            <p className="text-xs text-slate-600">{aiAnalysisResults[selectedDocId].summary}</p>
                            <div className="text-xs space-y-1">
                                {aiAnalysisResults[selectedDocId].recommendations?.map((rec, i) => (
                                    <p key={i} className="text-slate-500">• {rec}</p>
                                ))}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Messaging Panel */}
            <div className="flex-1 min-h-[300px]">
                <MessagingPanel
                    messages={patientMessages}
                    onSendMessage={handleSendMessage}
                    userType="doctor"
                />
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
