"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { FileUpload } from "@/components/FileUpload";
import { DoctorMessages } from "@/components/DoctorMessages";
import { FileText, Sparkles, Clock, CheckCircle } from "lucide-react";

export default function PatientDashboard() {
    const [documents, setDocuments] = useState([
        { id: 1, name: "Blood Test Results.pdf", date: "2023-11-20", status: "Analyzed" },
        { id: 2, name: "X-Ray Report.pdf", date: "2023-10-15", status: "Pending" }
    ]);

    const handleUpload = (file) => {
        const newDoc = {
            id: Date.now(),
            name: file.name,
            date: new Date().toISOString().split('T')[0],
            status: "Pending"
        };
        setDocuments([newDoc, ...documents]);
    };

    const handleAnalyze = (id) => {
        // Mock AI analysis
        const updatedDocs = documents.map(doc =>
            doc.id === id ? { ...doc, status: "Analyzing..." } : doc
        );
        setDocuments(updatedDocs);

        setTimeout(() => {
            setDocuments(prev => prev.map(doc =>
                doc.id === id ? { ...doc, status: "Analyzed" } : doc
            ));
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            <main className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">Welcome back, Marco</h1>
                    <p className="text-slate-500">Here's your health overview</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: My Records & Upload */}
                    <div className="lg:col-span-2 space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <FileText className="h-5 w-5 text-teal-600" />
                                    My Medical Records
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <FileUpload onUpload={handleUpload} />

                                <div className="space-y-4">
                                    <h3 className="font-medium text-slate-900">Recent Documents</h3>
                                    {documents.map((doc) => (
                                        <div key={doc.id} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl shadow-sm">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-slate-100 p-2 rounded-lg">
                                                    <FileText className="h-5 w-5 text-slate-600" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-slate-900">{doc.name}</p>
                                                    <p className="text-xs text-slate-500">{doc.date}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Badge variant={doc.status === "Analyzed" ? "default" : "secondary"}>
                                                    {doc.status}
                                                </Badge>
                                                {doc.status === "Analyzed" ? (
                                                    <Button variant="ghost" size="sm" className="text-teal-600">
                                                        View Analysis
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="gap-2"
                                                        onClick={() => handleAnalyze(doc.id)}
                                                        disabled={doc.status === "Analyzing..."}
                                                    >
                                                        <Sparkles className="h-3 w-3" />
                                                        {doc.status === "Analyzing..." ? "Analyzing..." : "Analyze with AI"}
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column: Doctor's Corner */}
                    <div className="space-y-8">
                        <Card className="bg-gradient-to-br from-teal-600 to-teal-700 text-white border-none">
                            <CardContent className="p-6">
                                <h3 className="text-lg font-bold mb-2">AI Health Assistant</h3>
                                <p className="text-teal-100 text-sm mb-4">
                                    Your latest blood test results show normal cholesterol levels. Keep up the good work!
                                </p>
                                <Button variant="secondary" size="sm" className="w-full text-teal-700">
                                    Ask a question
                                </Button>
                            </CardContent>
                        </Card>

                        <div>
                            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <Clock className="h-5 w-5 text-slate-400" />
                                Doctor's Updates
                            </h3>
                            <DoctorMessages />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
