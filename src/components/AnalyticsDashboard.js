import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { BarChart3, TrendingUp, Users, Activity } from "lucide-react";

export function AnalyticsDashboard() {
    return (
        <div className="space-y-6 h-full overflow-auto p-1">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="p-3 bg-blue-100 rounded-xl">
                            <Users className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Total Patients</p>
                            <h3 className="text-2xl font-bold text-slate-900">1,248</h3>
                            <p className="text-xs text-green-600 flex items-center gap-1">
                                <TrendingUp className="h-3 w-3" /> +12% this month
                            </p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="p-3 bg-purple-100 rounded-xl">
                            <Activity className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Avg. Wait Time</p>
                            <h3 className="text-2xl font-bold text-slate-900">14 min</h3>
                            <p className="text-xs text-green-600 flex items-center gap-1">
                                <TrendingUp className="h-3 w-3" /> -2 min vs last week
                            </p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="p-3 bg-teal-100 rounded-xl">
                            <BarChart3 className="h-6 w-6 text-teal-600" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Bed Occupancy</p>
                            <h3 className="text-2xl font-bold text-slate-900">87%</h3>
                            <p className="text-xs text-orange-600 flex items-center gap-1">
                                High Capacity
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="h-80">
                    <CardHeader>
                        <CardTitle>Department Efficiency</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center h-64 bg-slate-50 rounded-lg border border-dashed border-slate-200 m-6">
                        <p className="text-slate-400">Interactive Chart Placeholder</p>
                    </CardContent>
                </Card>
                <Card className="h-80">
                    <CardHeader>
                        <CardTitle>Readmission Rates by Age</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center h-64 bg-slate-50 rounded-lg border border-dashed border-slate-200 m-6">
                        <p className="text-slate-400">Interactive Chart Placeholder</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
