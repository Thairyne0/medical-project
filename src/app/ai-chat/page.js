"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { Send, Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AIChatPage() {
    const [messages, setMessages] = useState([
        { id: 1, role: "ai", content: "Hello, I am your medical AI assistant. How can I help you today?" }
    ]);
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), role: "user", content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput("");

        // Mock AI response
        setTimeout(() => {
            const aiMsg = {
                id: Date.now() + 1,
                role: "ai",
                content: "I understand. Based on the symptoms you described, it might be advisable to schedule a check-up. (This is a demo response)"
            };
            setMessages(prev => [...prev, aiMsg]);
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />

            <main className="flex-1 container mx-auto px-4 py-6 flex flex-col h-[calc(100vh-64px)]">
                <Card className="flex-1 flex flex-col overflow-hidden shadow-lg border-slate-200">
                    <div className="bg-teal-600 p-4 text-white flex items-center gap-3">
                        <div className="bg-white/20 p-2 rounded-full">
                            <Bot className="h-6 w-6" />
                        </div>
                        <div>
                            <h1 className="font-bold text-lg">Medical AI Assistant</h1>
                            <p className="text-teal-100 text-xs">Always here to help</p>
                        </div>
                    </div>

                    <ScrollArea className="flex-1 p-4 bg-slate-50/50">
                        <div className="space-y-4 max-w-3xl mx-auto">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={cn(
                                        "flex gap-3 max-w-[80%]",
                                        msg.role === "user" ? "ml-auto flex-row-reverse" : ""
                                    )}
                                >
                                    <div className={cn(
                                        "h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0",
                                        msg.role === "ai" ? "bg-teal-100 text-teal-600" : "bg-blue-100 text-blue-600"
                                    )}>
                                        {msg.role === "ai" ? <Bot className="h-5 w-5" /> : <User className="h-5 w-5" />}
                                    </div>
                                    <div className={cn(
                                        "p-3 rounded-2xl text-sm leading-relaxed shadow-sm",
                                        msg.role === "user"
                                            ? "bg-blue-600 text-white rounded-tr-none"
                                            : "bg-white text-slate-800 border border-slate-100 rounded-tl-none"
                                    )}>
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>

                    <div className="p-4 bg-white border-t border-slate-100">
                        <div className="max-w-3xl mx-auto flex gap-2">
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                placeholder="Type your medical question..."
                                className="flex-1"
                            />
                            <Button onClick={handleSend} className="px-6">
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                        <p className="text-center text-xs text-slate-400 mt-2">
                            AI can make mistakes. Please consult a real doctor for medical advice.
                        </p>
                    </div>
                </Card>
            </main>
        </div>
    );
}
