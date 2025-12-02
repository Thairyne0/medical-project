"use client";

import { useState } from "react";
import { Upload, File, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function FileUpload({ onUpload }) {
    const [dragActive, setDragActive] = useState(false);
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        if (!file) return;
        setUploading(true);
        // Mock upload delay
        setTimeout(() => {
            setUploading(false);
            onUpload(file);
            setFile(null);
        }, 1500);
    };

    return (
        <div className="w-full">
            {!file ? (
                <div
                    className={cn(
                        "border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer",
                        dragActive ? "border-teal-500 bg-teal-50" : "border-slate-200 hover:border-teal-400 hover:bg-slate-50"
                    )}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById("file-upload").click()}
                >
                    <input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        onChange={handleChange}
                        accept=".pdf,.jpg,.png,.doc,.docx"
                    />
                    <div className="bg-teal-100 p-3 rounded-full w-fit mx-auto mb-4">
                        <Upload className="h-6 w-6 text-teal-600" />
                    </div>
                    <p className="text-sm font-medium text-slate-900">Click to upload or drag and drop</p>
                    <p className="text-xs text-slate-500 mt-1">PDF, PNG, JPG up to 10MB</p>
                </div>
            ) : (
                <div className="border border-slate-200 rounded-xl p-4 bg-white">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-100 p-2 rounded-lg">
                                <File className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-900">{file.name}</p>
                                <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                        </div>
                        <button onClick={() => setFile(null)} className="text-slate-400 hover:text-red-500">
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                    <Button
                        onClick={handleUpload}
                        className="w-full"
                        disabled={uploading}
                    >
                        {uploading ? "Uploading..." : "Confirm Upload"}
                    </Button>
                </div>
            )}
        </div>
    );
}
