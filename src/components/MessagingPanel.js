import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Send, Calendar, FileText } from "lucide-react";
import { useState } from "react";

export function MessagingPanel({ messages = [], onSendMessage, userType = "patient" }) {
    const [newMessage, setNewMessage] = useState("");

    const handleSend = () => {
        if (newMessage.trim()) {
            onSendMessage(newMessage);
            setNewMessage("");
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <Card className="h-full flex flex-col">
            <CardHeader className="pb-3">
                <CardTitle className="text-lg">Messaggi</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-4 overflow-hidden">
                {/* Messages List */}
                <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                    {messages.length === 0 ? (
                        <p className="text-slate-400 text-sm text-center py-8">Nessun messaggio</p>
                    ) : (
                        messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.from === userType ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${msg.from === userType
                                            ? "bg-teal-600 text-white"
                                            : "bg-slate-100 text-slate-900"
                                        }`}
                                >
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs font-medium opacity-75">
                                            {msg.sender}
                                        </span>
                                        <span className="text-xs opacity-60">{msg.timestamp}</span>
                                    </div>

                                    {msg.type === "visit_recommendation" && (
                                        <div className="mb-2 p-3 bg-white/10 rounded-lg">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Calendar className="h-4 w-4" />
                                                <span className="font-semibold text-sm">Visita Consigliata</span>
                                            </div>
                                            <div className="text-sm space-y-1">
                                                <p><strong>Data:</strong> {msg.visitDetails?.date}</p>
                                                <p><strong>Ora:</strong> {msg.visitDetails?.time}</p>
                                                <p><strong>Motivo:</strong> {msg.visitDetails?.reason}</p>
                                            </div>
                                        </div>
                                    )}

                                    <p className="text-sm leading-relaxed">{msg.text}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Message Input */}
                <div className="flex gap-2 pt-3 border-t border-slate-200">
                    <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Scrivi un messaggio..."
                        className="flex-1"
                    />
                    <Button onClick={handleSend} size="sm" className="px-4">
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
