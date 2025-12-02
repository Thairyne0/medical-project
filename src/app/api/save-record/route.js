import { NextResponse } from 'next/server';
import { addRecord } from '@/lib/api/mockStore';

/**
 * API Route: Save extracted record
 * POST /api/save-record
 * 
 * Accepts: JSON body with PatientRecord data
 * Returns: Saved record with generated ID
 * 
 * FUTURE INTEGRATION:
 * Replace mockStore with real database calls:
 * - PostgreSQL, MySQL, MongoDB, etc.
 * - Or proxy to external API
 */
export async function POST(request) {
    try {
        const record = await request.json();

        if (!record) {
            return NextResponse.json(
                { error: 'No data provided', message: 'Please provide record data' },
                { status: 400 }
            );
        }

        // Save to mock store
        // TODO: Replace with real database insert
        const savedRecord = addRecord(record);

        return NextResponse.json({
            success: true,
            data: savedRecord
        });

    } catch (error) {
        console.error('Save error:', error);
        return NextResponse.json(
            {
                error: 'Save failed',
                message: error.message || 'Failed to save record'
            },
            { status: 500 }
        );
    }
}
