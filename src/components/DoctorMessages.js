"use client";

import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Calendar } from "lucide-react";
import { MessagingPanel } from "@/components/MessagingPanel";
import { useState } from "react";
import { messages as mockMessages, visitRecommendations } from "@/lib/mockData";

export function DoctorMessages() {
    const patientId = 1; // In a real app, this would come from auth/context
    const [patientMessages, setPatientMessages] = useState(mockMessages[patientId] || []);
    const patientVisits = visitRecommendations.filter(v => v.patientId === patientId);

    const handleSendMessage = (text) => {
        const newMsg = {
            id: patientMessages.length + 1,
            from: "patient",
            sender: "Marco Bianchi",
            text,
            timestamp: new Date().toLocaleString("it-IT"),
            type: "text"
        };
        setPatientMessages([...patientMessages, newMsg]);
    };

    return (
        <div className="space-y-4">
            {/* Visit Recommendations */}
            {patientVisits.length > 0 && (
                <Card className="border-orange-200 bg-orange-50">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-3">
                            <Calendar className="h-5 w-5 text-orange-600" />
                            <h4 className="font-bold text-orange-900">Visite Consigliate</h4>
                        </div>
                        {patientVisits.map(visit => (
                            <div key={visit.id} className="bg-white p-3 rounded-lg space-y-1">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-semibold text-slate-900">{visit.reason}</p>
                                        <p className="text-sm text-slate-600">
                                            {visit.date} alle {visit.time}
                                        </p>
                                        {visit.notes && (
                                            <p className="text-xs text-slate-500 mt-1">{visit.notes}</p>
                                        )}
                                    </div>
                                    <Badge variant={visit.status === "pending" ? "secondary" : "default"}>
                                        {visit.status === "pending" ? "Da confermare" : visit.status}
                                    </Badge>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            )}

            {/* Messaging */}
            <div className="h-[400px]">
                <MessagingPanel
                    messages={patientMessages}
                    onSendMessage={handleSendMessage}
                    userType="patient"
                />
            </div>
        </div>
    );
}
