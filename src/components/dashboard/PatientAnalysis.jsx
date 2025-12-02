"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Users, TrendingUp, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

/**
 * Patient Analysis Component
 * Shows patient distribution by pathology and age
 */
export function PatientAnalysis({ data }) {
    if (!data) return null;

    const { totalPatients, byPathology, byAge, mostFrequentPathology, medianAge, averageAge } = data;

    // Format data for charts
    const pathologyData = Object.entries(byPathology).map(([name, count]) => ({
        name,
        count
    }));

    const ageData = byAge.filter(item => item.count > 0);

    return (
        <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-100 rounded-xl">
                                <Users className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">Total Patients</p>
                                <h3 className="text-2xl font-bold text-slate-900">{totalPatients}</h3>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-purple-100 rounded-xl">
                                <Activity className="h-6 w-6 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">Most Frequent</p>
                                <h3 className="text-lg font-bold text-slate-900">{mostFrequentPathology}</h3>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-teal-100 rounded-xl">
                                <TrendingUp className="h-6 w-6 text-teal-600" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">Median Age</p>
                                <h3 className="text-2xl font-bold text-slate-900">{medianAge} yrs</h3>
                                <p className="text-xs text-slate-400">Avg: {averageAge} yrs</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Pathology Distribution */}
                <Card>
                    <CardHeader>
                        <CardTitle>Distribution by Pathology Group</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={pathologyData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                <XAxis
                                    dataKey="name"
                                    angle={-45}
                                    textAnchor="end"
                                    height={100}
                                    tick={{ fontSize: 12 }}
                                />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="count" fill="#0d9488" radius={[8, 8, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Age Distribution */}
                <Card>
                    <CardHeader>
                        <CardTitle>Distribution by Age Range</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={ageData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                <XAxis dataKey="range" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="count" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
