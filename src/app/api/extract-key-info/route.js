import { NextResponse } from 'next/server';
import { extractFromPDF, validatePDFFile } from '@/lib/extraction/aiExtractor';

/**
 * API Route: Extract key information from PDF
 * POST /api/extract-key-info
 * 
 * Accepts: multipart/form-data with 'file' field
 * Returns: ExtractedInfo object
 * 
 * FUTURE INTEGRATION:
 * When switching to external AI service, this route can:
 * 1. Act as a proxy to external AI service
 * 2. Be removed entirely if frontend calls AI service directly
 * 3. Add authentication/authorization logic
 */
export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file');

        if (!file) {
            return NextResponse.json(
                { error: 'No file provided', message: 'Please upload a PDF file' },
                { status: 400 }
            );
        }

        // Validate file
        const validation = validatePDFFile(file);
        if (!validation.valid) {
            return NextResponse.json(
                { error: 'Invalid file', message: validation.error },
                { status: 400 }
            );
        }

        // Extract information from PDF
        // TODO: When using external AI service, pass file to external API here
        const extractedInfo = await extractFromPDF(file);

        return NextResponse.json({
            success: true,
            data: extractedInfo
        });

    } catch (error) {
        console.error('Extraction error:', error);
        return NextResponse.json(
            {
                error: 'Extraction failed',
                message: error.message || 'Failed to extract information from PDF'
            },
            { status: 500 }
        );
    }
}
