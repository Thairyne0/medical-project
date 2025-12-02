"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Clock, TrendingDown, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

/**
 * Operational Efficiency Component
 * Shows handling time metrics and trends
 */
export function OperationalEfficiency({ data }) {
    if (!data) return null;

    const { averageHandlingTime, medianHandlingTime, percentile90, timeSeries } = data;

    // Format time series data for chart
    const chartData = timeSeries.map(item => ({
        ...item,
        date: format(new Date(item.date), 'MMM dd')
    }));

    return (
        <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-orange-100 rounded-xl">
                                <Clock className="h-6 w-6 text-orange-600" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">Avg Handling Time</p>
                                <h3 className="text-2xl font-bold text-slate-900">{averageHandlingTime} days</h3>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-100 rounded-xl">
                                <Activity className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">Median Time</p>
                                <h3 className="text-2xl font-bold text-slate-900">{medianHandlingTime} days</h3>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-purple-100 rounded-xl">
                                <TrendingDown className="h-6 w-6 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">90th Percentile</p>
                                <h3 className="text-2xl font-bold text-slate-900">{percentile90} days</h3>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Time Series Chart */}
            <Card>
                <CardHeader>
                    <CardTitle>Handling Time Trend</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis
                                dataKey="date"
                                tick={{ fontSize: 12 }}
                            />
                            <YAxis label={{ value: 'Days', angle: -90, position: 'insideLeft' }} />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="avgHandlingTime"
                                stroke="#0d9488"
                                strokeWidth={2}
                                dot={{ fill: '#0d9488', r: 4 }}
                                name="Avg Handling Time"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    );
}
