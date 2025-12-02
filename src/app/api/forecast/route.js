import { NextResponse } from 'next/server';
import { getTimeSeriesData } from '@/lib/api/mockStore';
import { generateForecast, calculateForecastMetrics, generateRecommendations } from '@/lib/forecasting';

/**
 * API Route: Get workload forecast
 * POST /api/forecast
 * 
 * Accepts: JSON body with ForecastParams
 * Returns: ForecastData object
 * 
 * FUTURE INTEGRATION:
 * Replace with external ML/forecasting service (AWS Forecast, Azure ML, Prophet, etc.)
 */
export async function POST(request) {
    try {
        const params = await request.json();
        const {
            method = 'exponential-smoothing',
            days = 7,
            historicalDays = 30
        } = params;

        // Get historical time series data
        const historicalData = getTimeSeriesData(historicalDays);

        // Generate forecast
        const forecastPoints = generateForecast(historicalData, days, method);

        // Format historical data for response
        const historical = historicalData.map(d => ({
            date: d.date,
            value: d.count,
            isHistorical: true
        }));

        // Calculate metrics
        const metrics = calculateForecastMetrics(forecastPoints, historicalData);

        // Generate recommendations
        const recommendations = generateRecommendations(metrics);

        return NextResponse.json({
            success: true,
            data: {
                historical,
                forecast: forecastPoints,
                metrics,
                recommendations,
                generatedAt: new Date().toISOString()
            }
        });

    } catch (error) {
        console.error('Forecast error:', error);
        return NextResponse.json(
            {
                error: 'Forecast failed',
                message: error.message || 'Failed to generate forecast'
            },
            { status: 500 }
        );
    }
}
