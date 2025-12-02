/**
 * Base API Client for FastAPI Backend
 * Provides typed fetch wrapper with error handling
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

/**
 * Custom API Error class
 */
export class ApiError extends Error {
    constructor(
        message,
        status,
        data
    ) {
        super(message);
        this.status = status;
        this.data = data;
        this.name = 'ApiError';
    }
}

/**
 * Type-safe fetch wrapper for API calls
 * @param path - API endpoint path (e.g., '/api/intake/records')
 * @param options - Fetch options
 * @returns Parsed JSON response
 * @throws ApiError on HTTP errors or network failures
 */
export async function apiFetch(
    path,
    options = {}
) {
    const url = `${API_BASE_URL}${path}`;

    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                ...options.headers,
            },
        });

        if (!response.ok) {
            let errorData = {};
            try {
                errorData = await response.json();
            } catch {
                // If response is not JSON, use status text
                errorData = { detail: response.statusText };
            }

            throw new ApiError(
                errorData.detail || `HTTP ${response.status}: ${response.statusText}`,
                response.status,
                errorData
            );
        }

        // Parse JSON response
        const data = await response.json();
        return data;

    } catch (error) {
        // Re-throw ApiError as-is
        if (error instanceof ApiError) {
            throw error;
        }

        // Wrap other errors (network, parsing, etc.)
        throw new ApiError(
            error instanceof Error ? error.message : 'Network error',
            0,
            error
        );
    }
}

/**
 * Get the configured API base URL
 */
export function getApiBaseUrl() {
    return API_BASE_URL;
}
