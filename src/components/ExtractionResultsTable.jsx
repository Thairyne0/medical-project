"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Check, Edit2, X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Extraction Results Table Component
 * Displays extracted patient information in an editable table format
 */
export function ExtractionResultsTable({ data, onConfirm, onCancel }) {
    const [editedData, setEditedData] = useState(data);
    const [editingField, setEditingField] = useState(null);

    const handleFieldChange = (field, value) => {
        setEditedData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const fields = [
        { key: "patientId", label: "Patient ID", type: "text" },
        { key: "patientName", label: "Patient Name", type: "text" },
        { key: "age", label: "Age", type: "number" },
        {
            key: "sex",
            label: "Sex",
            type: "select",
            options: ["Male", "Female", "Other"],
        },
        { key: "diagnosis", label: "Diagnosis", type: "text" },
        { key: "pathologyGroup", label: "Pathology Group", type: "text" },
        { key: "admissionDate", label: "Admission Date", type: "date" },
        { key: "dischargeDate", label: "Discharge Date", type: "date" },
        { key: "department", label: "Department", type: "text" },
        { key: "city", label: "City", type: "text" },
        { key: "region", label: "Region", type: "text" },
        { key: "keyFindings", label: "Key Findings", type: "textarea" },
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <span>Extracted Information</span>
                    <span className="text-sm font-normal text-slate-500">
                        Review and edit if needed
                    </span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {fields.map((field) => (
                            <div
                                key={field.key}
                                className={cn(
                                    "space-y-1",
                                    field.type === "textarea" && "md:col-span-2"
                                )}
                            >
                                <label className="text-sm font-medium text-slate-700">
                                    {field.label}
                                </label>
                                {editingField === field.key ? (
                                    <div className="flex gap-2">
                                        {field.type === "select" ? (
                                            <select
                                                value={editedData[field.key]}
                                                onChange={(e) =>
                                                    handleFieldChange(field.key, e.target.value)
                                                }
                                                className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                                autoFocus
                                            >
                                                {field.options?.map((opt) => (
                                                    <option key={opt} value={opt}>
                                                        {opt}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : field.type === "textarea" ? (
                                            <textarea
                                                value={editedData[field.key]}
                                                onChange={(e) =>
                                                    handleFieldChange(field.key, e.target.value)
                                                }
                                                className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 min-h-[80px]"
                                                autoFocus
                                            />
                                        ) : (
                                            <Input
                                                type={field.type}
                                                value={editedData[field.key]}
                                                onChange={(e) =>
                                                    handleFieldChange(field.key, e.target.value)
                                                }
                                                className="flex-1"
                                                autoFocus
                                            />
                                        )}
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            onClick={() => setEditingField(null)}
                                        >
                                            <Check className="h-4 w-4 text-teal-600" />
                                        </Button>
                                    </div>
                                ) : (
                                    <div
                                        className="flex items-center justify-between px-3 py-2 bg-slate-50 rounded-lg border border-slate-200 hover:border-slate-300 cursor-pointer group"
                                        onClick={() => setEditingField(field.key)}
                                    >
                                        <span className="text-slate-900">
                                            {editedData[field.key] || "-"}
                                        </span>
                                        <Edit2 className="h-4 w-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-slate-200">
                        <Button
                            onClick={() => onConfirm(editedData)}
                            className="flex-1"
                        >
                            <Check className="h-4 w-4 mr-2" />
                            Confirm &amp; Save
                        </Button>
                        <Button onClick={onCancel} variant="outline" className="flex-1">
                            <X className="h-4 w-4 mr-2" />
                            Cancel
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
