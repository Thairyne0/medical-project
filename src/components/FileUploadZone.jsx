"use client";

import { useState, useCallback } from 'react';
import { Upload, FileText, X, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * File Upload Zone Component
 * Supports drag & drop and file picker for PDF uploads
 */
export function FileUploadZone({ onFileSelect, accept = '.pdf', maxSize = 10485760 }) {
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    const validateFile = useCallback((file) => {
        setError('');

        // Check file type
        if (!file.type.includes('pdf') && !file.name.endsWith('.pdf')) {
            setError('Please upload a PDF file');
            return false;
        }

        // Check file size
        if (file.size > maxSize) {
            const sizeMB = (maxSize / (1024 * 1024)).toFixed(0);
            setError(`File size must be less than ${sizeMB}MB`);
            return false;
        }

        return true;
    }, [maxSize]);

    const handleFile = useCallback((file) => {
        if (validateFile(file)) {
            setSelectedFile(file);
            onFileSelect(file);
        }
    }, [validateFile, onFileSelect]);

    const handleDragEnter = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            handleFile(files[0]);
        }
    }, [handleFile]);

    const handleFileInput = useCallback((e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            handleFile(files[0]);
        }
    }, [handleFile]);

    const handleRemove = useCallback(() => {
        setSelectedFile(null);
        setError('');
        onFileSelect(null);
    }, [onFileSelect]);

    return (
        <div className="w-full">
            <div
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={cn(
                    "relative border-2 border-dashed rounded-xl p-8 transition-all duration-200",
                    isDragging
                        ? "border-teal-500 bg-teal-50"
                        : error
                            ? "border-red-300 bg-red-50"
                            : selectedFile
                                ? "border-teal-300 bg-teal-50"
                                : "border-slate-300 bg-slate-50 hover:border-slate-400"
                )}
            >
                {selectedFile ? (
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-teal-100 rounded-lg">
                                <FileText className="h-8 w-8 text-teal-600" />
                            </div>
                            <div>
                                <p className="font-medium text-slate-900">{selectedFile.name}</p>
                                <p className="text-sm text-slate-500">
                                    {(selectedFile.size / 1024).toFixed(1)} KB
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={handleRemove}
                            className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
                            aria-label="Remove file"
                        >
                            <X className="h-5 w-5 text-slate-600" />
                        </button>
                    </div>
                ) : (
                    <div className="text-center">
                        <div className="mx-auto w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mb-4">
                            <Upload className="h-8 w-8 text-slate-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">
                            {isDragging ? 'Drop your PDF here' : 'Upload Clinical Report'}
                        </h3>
                        <p className="text-sm text-slate-500 mb-4">
                            Drag and drop your PDF file here, or click to browse
                        </p>
                        <label className="inline-block">
                            <input
                                type="file"
                                accept={accept}
                                onChange={handleFileInput}
                                className="hidden"
                            />
                            <span className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors cursor-pointer">
                                Choose File
                            </span>
                        </label>
                        <p className="text-xs text-slate-400 mt-3">
                            PDF files only, max {(maxSize / (1024 * 1024)).toFixed(0)}MB
                        </p>
                    </div>
                )}
            </div>

            {error && (
                <div className="mt-3 flex items-center gap-2 text-red-600 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    <span>{error}</span>
                </div>
            )}
        </div>
    );
}
