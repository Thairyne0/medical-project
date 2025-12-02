"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { format } from 'date-fns';

/**
 * Forecast Chart Component
 * Displays historical data and forecast with confidence interval
 */
export function ForecastChart({ historical, forecast }) {
    if (!historical || !forecast) return null;

    // Combine historical and forecast data
    const allData = [
        ...historical.map(d => ({
            date: format(new Date(d.date), 'MMM dd'),
            actual: d.value,
            forecast: null,
            lower: null,
            upper: null
        })),
        ...forecast.map(d => ({
            date: format(new Date(d.date), 'MMM dd'),
            actual: null,
            forecast: d.value,
            lower: d.confidence?.lower || null,
            upper: d.confidence?.upper || null
        }))
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle>7-Day Workload Forecast</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                    <AreaChart data={allData}>
                        <defs>
                            <linearGradient id="confidenceGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#0d9488" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="#0d9488" stopOpacity={0.05} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis
                            dataKey="date"
                            tick={{ fontSize: 12 }}
                        />
                        <YAxis label={{ value: 'Patients', angle: -90, position: 'insideLeft' }} />
                        <Tooltip />

                        {/* Confidence interval */}
                        <Area
                            type="monotone"
                            dataKey="upper"
                            stroke="none"
                            fill="url(#confidenceGradient)"
                            fillOpacity={0.3}
                        />
                        <Area
                            type="monotone"
                            dataKey="lower"
                            stroke="none"
                            fill="#ffffff"
                        />

                        {/* Historical line */}
                        <Line
                            type="monotone"
                            dataKey="actual"
                            stroke="#64748b"
                            strokeWidth={2}
                            dot={{ fill: '#64748b', r: 3 }}
                            name="Historical"
                        />

                        {/* Forecast line */}
                        <Line
                            type="monotone"
                            dataKey="forecast"
                            stroke="#0d9488"
                            strokeWidth={3}
                            strokeDasharray="5 5"
                            dot={{ fill: '#0d9488', r: 4 }}
                            name="Forecast"
                        />
                    </AreaChart>
                </ResponsiveContainer>

                <div className="mt-4 flex items-center justify-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-0.5 bg-slate-500" />
                        <span className="text-slate-600">Historical Data</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-0.5 bg-teal-600 border-dashed" style={{ borderTop: '2px dashed' }} />
                        <span className="text-slate-600">Forecast</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-3 bg-teal-600 opacity-20" />
                        <span className="text-slate-600">Confidence Interval</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
