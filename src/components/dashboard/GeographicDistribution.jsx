"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { MapPin } from 'lucide-react';

/**
 * Geographic Distribution Component
 * Shows patient distribution by city/region
 */
export function GeographicDistribution({ data }) {
    if (!data) return null;

    const { topCities, byRegion } = data;

    // Get top regions
    const topRegions = Object.entries(byRegion)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Cities */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-teal-600" />
                            Top Cities
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {topCities.map((city, index) => (
                                <div key={city.name} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-sm font-bold text-teal-600">
                                            {index + 1}
                                        </div>
                                        <span className="font-medium text-slate-900">{city.name}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-32 bg-slate-200 rounded-full h-2">
                                            <div
                                                className="bg-teal-600 h-2 rounded-full transition-all"
                                                style={{ width: `${city.percentage}%` }}
                                            />
                                        </div>
                                        <span className="text-sm font-semibold text-slate-700 w-12 text-right">
                                            {city.count}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Top Regions */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-purple-600" />
                            Top Regions
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {topRegions.map((region, index) => (
                                <div key={region.name} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-sm font-bold text-purple-600">
                                            {index + 1}
                                        </div>
                                        <span className="font-medium text-slate-900">{region.name}</span>
                                    </div>
                                    <span className="text-lg font-bold text-slate-700">
                                        {region.count}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Map Placeholder */}
            <Card>
                <CardHeader>
                    <CardTitle>Geographic Distribution Map</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-64 bg-slate-100 rounded-lg border-2 border-dashed border-slate-300 flex items-center justify-center">
                        <div className="text-center">
                            <MapPin className="h-12 w-12 text-slate-400 mx-auto mb-2" />
                            <p className="text-slate-500 font-medium">Interactive Map Visualization</p>
                            <p className="text-sm text-slate-400 mt-1">
                                Integrate with Leaflet or Mapbox for production
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
