"use client";

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Calendar, Building2, Activity } from 'lucide-react';

/**
 * Dashboard Filters Component
 * Provides filter controls for the dashboard
 */
export function DashboardFilters({ onFilterChange }) {
    const [filters, setFilters] = useState({
        dateRange: null,
        department: '',
        pathologyGroups: []
    });

    const departments = [
        'All Departments',
        'Cardiology',
        'Endocrinology',
        'Pulmonology',
        'Neurology',
        'Orthopedics',
        'Surgery',
        'Internal Medicine',
        'Nephrology'
    ];

    const pathologyGroups = [
        'Cardiovascular',
        'Endocrine',
        'Respiratory',
        'Neurological',
        'Orthopedic',
        'Gastrointestinal',
        'Renal',
        'Infectious Disease'
    ];

    const handleDepartmentChange = (dept) => {
        const newFilters = {
            ...filters,
            department: dept === 'All Departments' ? '' : dept
        };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const handleReset = () => {
        const resetFilters = {
            dateRange: null,
            department: '',
            pathologyGroups: []
        };
        setFilters(resetFilters);
        onFilterChange(resetFilters);
    };

    return (
        <Card>
            <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Date Range (Simplified for MVP) */}
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                            <Calendar className="h-4 w-4 text-teal-600" />
                            Date Range
                        </label>
                        <select
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            onChange={(e) => {
                                const value = e.target.value;
                                let dateRange = null;
                                if (value !== 'all') {
                                    const end = new Date();
                                    const start = new Date();
                                    start.setDate(end.getDate() - parseInt(value));
                                    dateRange = {
                                        start: start.toISOString().split('T')[0],
                                        end: end.toISOString().split('T')[0]
                                    };
                                }
                                const newFilters = { ...filters, dateRange };
                                setFilters(newFilters);
                                onFilterChange(newFilters);
                            }}
                        >
                            <option value="all">All Time</option>
                            <option value="7">Last 7 Days</option>
                            <option value="30">Last 30 Days</option>
                            <option value="90">Last 90 Days</option>
                        </select>
                    </div>

                    {/* Department */}
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                            <Building2 className="h-4 w-4 text-teal-600" />
                            Department
                        </label>
                        <select
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            value={filters.department || 'All Departments'}
                            onChange={(e) => handleDepartmentChange(e.target.value)}
                        >
                            {departments.map(dept => (
                                <option key={dept} value={dept}>{dept}</option>
                            ))}
                        </select>
                    </div>

                    {/* Reset Button */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-700 opacity-0">
                            Actions
                        </label>
                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={handleReset}
                        >
                            Reset Filters
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
