import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { MessageSquare, Calendar, AlertCircle } from "lucide-react";

export function DoctorMessages() {
    const messages = [
        {
            id: 1,
            type: "message",
            doctor: "Dr. Smith",
            content: "Please remember to fast for 8 hours before your blood test tomorrow.",
            date: "Today, 9:00 AM"
        },
        {
            id: 2,
            type: "suggestion",
            doctor: "Dr. House",
            content: "Based on your recent symptoms, I suggest scheduling a cardiology check-up.",
            date: "Yesterday"
        }
    ];

    return (
        <div className="space-y-4">
            {messages.map((msg) => (
                <Card key={msg.id} className="border-l-4 border-l-teal-500">
                    <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                            <div className="mt-1">
                                {msg.type === "suggestion" ? (
                                    <Calendar className="h-5 w-5 text-teal-600" />
                                ) : (
                                    <MessageSquare className="h-5 w-5 text-blue-600" />
                                )}
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <h4 className="font-semibold text-slate-900">{msg.doctor}</h4>
                                    <span className="text-xs text-slate-500">{msg.date}</span>
                                </div>
                                <p className="text-sm text-slate-600 mt-1">{msg.content}</p>
                                {msg.type === "suggestion" && (
                                    <button className="text-xs font-medium text-teal-600 mt-2 hover:underline">
                                        Schedule Appointment →
                                    </button>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
