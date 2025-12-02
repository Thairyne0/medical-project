"use client";

import { Card, CardContent } from '@/components/ui/Card';
import { CheckCircle2, LucideIcon } from 'lucide-react';

/**
 * Feature Introduction Card
 * Displays a clear explanation of what each demo feature does
 */
export function FeatureIntro({ icon: Icon, title, description, benefits, color = "teal" }) {
    const colorClasses = {
        teal: "bg-teal-100 text-teal-600",
        purple: "bg-purple-100 text-purple-600",
        blue: "bg-blue-100 text-blue-600",
        orange: "bg-orange-100 text-orange-600"
    };

    const iconBg = colorClasses[color] || colorClasses.teal;

    return (
        <Card className="mb-6 border-2 border-slate-200">
            <CardContent className="p-6">
                <div className="flex items-start gap-4">
                    <div className={`p-4 rounded-2xl ${iconBg} flex-shrink-0`}>
                        <Icon className="h-8 w-8" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
                        <p className="text-slate-600 mb-4 leading-relaxed">{description}</p>

                        {benefits && benefits.length > 0 && (
                            <div className="space-y-2">
                                <p className="text-sm font-semibold text-slate-700">Benefici chiave:</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {benefits.map((benefit, index) => (
                                        <div key={index} className="flex items-start gap-2">
                                            <CheckCircle2 className="h-4 w-4 text-teal-600 flex-shrink-0 mt-0.5" />
                                            <span className="text-sm text-slate-600">{benefit}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
