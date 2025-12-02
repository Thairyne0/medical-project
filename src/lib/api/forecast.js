/**
 * API Client for Forecast Endpoint
 */

import { apiFetch } from './client';

/**
 * Get 7-day workload forecast
 * @returns Forecast data with predictions and metrics
 * @throws ApiError if request fails
 */
export async function getWeeklyForecast() {
    return apiFetch('/api/forecast/weekly', {
        method: 'GET',
    });
}
