import { NextResponse } from 'next/server';
import { getAllRecords } from '@/lib/api/mockStore';

/**
 * API Route: Get all extracted records
 * GET /api/records?startDate=...&endDate=...&department=...&pathologyGroups=...
 * 
 * Query parameters:
 * - startDate: ISO date string
 * - endDate: ISO date string
 * - department: string
 * - pathologyGroups: comma-separated string
 * 
 * Returns: Array of PatientRecord objects
 * 
 * FUTURE INTEGRATION:
 * Replace mockStore with real database queries
 */
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);

        const filters = {};

        // Parse date range
        const startDate = searchParams.get('startDate');
        const endDate = searchParams.get('endDate');
        if (startDate && endDate) {
            filters.dateRange = { start: startDate, end: endDate };
        }

        // Parse department
        const department = searchParams.get('department');
        if (department) {
            filters.department = department;
        }

        // Parse pathology groups
        const pathologyGroups = searchParams.get('pathologyGroups');
        if (pathologyGroups) {
            filters.pathologyGroups = pathologyGroups.split(',');
        }

        // Get records from mock store
        // TODO: Replace with real database query
        const records = getAllRecords(filters);

        return NextResponse.json({
            success: true,
            data: records
        });

    } catch (error) {
        console.error('Fetch records error:', error);
        return NextResponse.json(
            {
                error: 'Fetch failed',
                message: error.message || 'Failed to fetch records'
            },
            { status: 500 }
        );
    }
}
