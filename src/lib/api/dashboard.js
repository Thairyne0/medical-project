/**
 * API Client for Dashboard Metrics Endpoint
 */

import { apiFetch } from './client';

/**
 * Get dashboard analytics metrics
 * @returns Dashboard metrics including patient analysis, efficiency, and geographic data
 * @throws ApiError if request fails
 */
export async function getDashboardMetrics() {
    return apiFetch('/api/dashboard/metrics', {
        method: 'GET',
    });
}
