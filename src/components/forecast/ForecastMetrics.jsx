"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { TrendingUp, Calendar, Users, Lightbulb } from 'lucide-react';
import { format } from 'date-fns';

/**
 * Forecast Metrics Component
 * Displays KPIs and recommendations from forecast data
 */
export function ForecastMetrics({ metrics, recommendations }) {
    if (!metrics) return null;

    const { expectedTotal, peakDay, averageDaily, trend } = metrics;

    const hasPeakDate = peakDay?.date && !Number.isNaN(new Date(peakDay.date).valueOf());
    const formattedPeakDate = hasPeakDate ? format(new Date(peakDay.date), 'MMM dd') : 'N/A';
    const formattedPeakValue = peakDay?.value != null ? peakDay.value : 'N/A';

    const trendConfig = {
        increasing: { color: 'text-orange-600', bg: 'bg-orange-100', label: 'Increasing' },
        decreasing: { color: 'text-blue-600', bg: 'bg-blue-100', label: 'Decreasing' },
        stable: { color: 'text-green-600', bg: 'bg-green-100', label: 'Stable' }
    };

    const trendStyle = trendConfig[trend] || trendConfig.stable;

    return (
        <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-teal-100 rounded-xl">
                                <Users className="h-6 w-6 text-teal-600" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">Expected Patients</p>
                                <h3 className="text-2xl font-bold text-slate-900">{expectedTotal}</h3>
                                <p className="text-xs text-slate-400">Next 7 days</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-purple-100 rounded-xl">
                                <Calendar className="h-6 w-6 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">Peak Day</p>
                                <h3 className="text-lg font-bold text-slate-900">
                                    {formattedPeakDate}
                                </h3>
                                <p className="text-xs text-slate-400">{formattedPeakValue} patients</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className={`p-3 ${trendStyle.bg} rounded-xl`}>
                                <TrendingUp className={`h-6 w-6 ${trendStyle.color}`} />
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">Trend</p>
                                <h3 className={`text-xl font-bold ${trendStyle.color}`}>
                                    {trendStyle.label}
                                </h3>
                                <p className="text-xs text-slate-400">{averageDaily}/day avg</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Resource Recommendations */}
            {recommendations && (
                <Card className="bg-gradient-to-br from-teal-50 to-blue-50 border-teal-200">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-teal-900">
                            <Lightbulb className="h-5 w-5" />
                            Resource Optimization Recommendations
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="bg-white rounded-lg p-4 border border-teal-100">
                            <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                                <div className="w-2 h-2 bg-teal-600 rounded-full" />
                                Staffing
                            </h4>
                            <p className="text-sm text-slate-700">{recommendations.staffing}</p>
                        </div>

                        <div className="bg-white rounded-lg p-4 border border-blue-100">
                            <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-600 rounded-full" />
                                Bed Capacity
                            </h4>
                            <p className="text-sm text-slate-700">{recommendations.beds}</p>
                        </div>

                        <div className="bg-white rounded-lg p-4 border border-purple-100">
                            <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                                <div className="w-2 h-2 bg-purple-600 rounded-full" />
                                Equipment & Supplies
                            </h4>
                            <p className="text-sm text-slate-700">{recommendations.equipment}</p>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Cost Optimization Note */}
            <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6">
                    <h3 className="font-semibold text-blue-900 mb-2">💰 Cost Optimization Impact</h3>
                    <p className="text-sm text-blue-800">
                        Accurate workload forecasting enables proactive resource allocation, reducing overtime costs,
                        minimizing equipment idle time, and optimizing staff scheduling. This data-driven approach
                        can reduce operational costs by 15-25% while maintaining quality of care.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
