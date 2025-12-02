/**
 * API Client for Intake/Upload Endpoints
 */

import { apiFetch } from './client';

/**
 * Upload a PDF file and extract patient information
 * @param file - PDF file to upload
 * @returns Extracted patient record
 * @throws ApiError if upload fails or file is invalid
 */
export async function uploadPdf(file) {
    const formData = new FormData();
    formData.append('file', file);

    return apiFetch('/api/intake/upload-pdf', {
        method: 'POST',
        body: formData,
        // Note: Don't set Content-Type header, browser will set it with boundary
    });
}

/**
 * Get all patient records from the database
 * @returns Array of patient records
 * @throws ApiError if request fails
 */
export async function getAllRecords() {
    return apiFetch('/api/intake/records', {
        method: 'GET',
    });
}
