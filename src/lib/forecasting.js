/**
 * Forecasting algorithms for workload prediction
 * These are simple statistical methods suitable for MVP
 * 
 * FUTURE ENHANCEMENT:
 * For production, consider using more sophisticated models:
 * - ARIMA (AutoRegressive Integrated Moving Average)
 * - Prophet (Facebook's forecasting library)
 * - LSTM neural networks
 * - External ML services (AWS Forecast, Azure ML, etc.)
 */

/**
 * Calculate moving average
 * @param {number[]} data - Array of values
 * @param {number} window - Window size
 * @returns {number[]} Moving averages
 */
export function movingAverage(data, window = 7) {
    const result = [];
    for (let i = 0; i < data.length; i++) {
        if (i < window - 1) {
            result.push(data[i]); // Not enough data points yet
        } else {
            const sum = data.slice(i - window + 1, i + 1).reduce((a, b) => a + b, 0);
            result.push(sum / window);
        }
    }
    return result;
}

/**
 * Exponential smoothing forecast
 * @param {number[]} data - Historical data
 * @param {number} alpha - Smoothing parameter (0-1)
 * @returns {number[]} Smoothed values
 */
export function exponentialSmoothing(data, alpha = 0.3) {
    if (data.length === 0) return [];

    const result = [data[0]];
    for (let i = 1; i < data.length; i++) {
        const smoothed = alpha * data[i] + (1 - alpha) * result[i - 1];
        result.push(smoothed);
    }
    return result;
}

/**
 * Generate forecast for next N days
 * @param {Array<{date: string, count: number}>} historicalData - Historical time series
 * @param {number} days - Number of days to forecast
 * @param {string} method - Forecasting method ('moving-average' or 'exponential-smoothing')
 * @returns {Array<{date: string, value: number, isHistorical: boolean, confidence?: object}>}
 */
export function generateForecast(historicalData, days = 7, method = 'exponential-smoothing') {
    if (!historicalData || historicalData.length === 0) {
        return [];
    }

    const values = historicalData.map(d => d.count);
    let smoothed;

    if (method === 'moving-average') {
        smoothed = movingAverage(values, 7);
    } else {
        smoothed = exponentialSmoothing(values, 0.3);
    }

    // Calculate trend
    const recentValues = values.slice(-7);
    const avgRecent = recentValues.reduce((a, b) => a + b, 0) / recentValues.length;
    const olderValues = values.slice(-14, -7);
    const avgOlder = olderValues.length > 0
        ? olderValues.reduce((a, b) => a + b, 0) / olderValues.length
        : avgRecent;
    const trend = (avgRecent - avgOlder) / 7; // Daily trend

    // Generate forecast points
    const lastValue = smoothed[smoothed.length - 1];
    const lastDate = new Date(historicalData[historicalData.length - 1].date);
    const forecast = [];

    for (let i = 1; i <= days; i++) {
        const forecastDate = new Date(lastDate);
        forecastDate.setDate(lastDate.getDate() + i);

        // Simple linear trend projection with some randomness
        const baseValue = lastValue + (trend * i);
        const value = Math.max(0, Math.round(baseValue));

        // Calculate confidence interval (wider as we go further)
        const stdDev = calculateStdDev(values);
        const confidenceMultiplier = 1 + (i * 0.1); // Increases with distance

        forecast.push({
            date: forecastDate.toISOString().split('T')[0],
            value: value,
            isHistorical: false,
            confidence: {
                lower: Math.max(0, Math.round(value - stdDev * confidenceMultiplier)),
                upper: Math.round(value + stdDev * confidenceMultiplier)
            }
        });
    }

    return forecast;
}

/**
 * Calculate standard deviation
 * @param {number[]} values - Array of numbers
 * @returns {number} Standard deviation
 */
function calculateStdDev(values) {
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    const squareDiffs = values.map(value => Math.pow(value - avg, 2));
    const avgSquareDiff = squareDiffs.reduce((a, b) => a + b, 0) / squareDiffs.length;
    return Math.sqrt(avgSquareDiff);
}

/**
 * Find peak day in forecast
 * @param {Array} forecastPoints - Forecast data points
 * @returns {{date: string, value: number}} Peak day
 */
export function findPeakDay(forecastPoints) {
    if (!forecastPoints || forecastPoints.length === 0) {
        return { date: '', value: 0 };
    }

    return forecastPoints.reduce((peak, point) => {
        return point.value > peak.value ? point : peak;
    }, forecastPoints[0]);
}

/**
 * Calculate forecast metrics
 * @param {Array} forecastPoints - Forecast data points
 * @param {Array} historicalData - Historical data for trend analysis
 * @returns {object} Metrics including total, peak, average, trend
 */
export function calculateForecastMetrics(forecastPoints, historicalData) {
    const expectedTotal = forecastPoints.reduce((sum, point) => sum + point.value, 0);
    const averageDaily = expectedTotal / forecastPoints.length;
    const peakDay = findPeakDay(forecastPoints);

    // Determine trend
    const recentAvg = historicalData.slice(-7).reduce((sum, d) => sum + d.count, 0) / 7;
    const forecastAvg = averageDaily;
    let trend = 'stable';
    if (forecastAvg > recentAvg * 1.1) trend = 'increasing';
    if (forecastAvg < recentAvg * 0.9) trend = 'decreasing';

    return {
        expectedTotal: Math.round(expectedTotal),
        peakDay,
        averageDaily: Math.round(averageDaily * 10) / 10, // Round to 1 decimal
        trend
    };
}

/**
 * Generate resource recommendations based on forecast
 * @param {object} metrics - Forecast metrics
 * @param {number} currentCapacity - Current resource capacity
 * @returns {object} Recommendations for staffing, beds, equipment
 */
export function generateRecommendations(metrics, currentCapacity = {}) {
    const { expectedTotal, peakDay, trend } = metrics;
    const avgDaily = expectedTotal / 7;

    // Simple recommendation logic
    const recommendations = {
        staffing: '',
        beds: '',
        equipment: ''
    };

    if (trend === 'increasing') {
        recommendations.staffing = `Increase staffing by 15-20% to handle expected ${Math.round(avgDaily)} patients/day. Peak on ${new Date(peakDay.date).toLocaleDateString()} with ${peakDay.value} patients.`;
        recommendations.beds = `Prepare ${Math.ceil(avgDaily * 0.8)} additional beds. Ensure ${Math.ceil(peakDay.value * 0.9)} beds available for peak day.`;
        recommendations.equipment = 'Stock up on consumables. Schedule equipment maintenance before peak period.';
    } else if (trend === 'decreasing') {
        recommendations.staffing = `Maintain current staffing levels. Expected ${Math.round(avgDaily)} patients/day represents a decrease.`;
        recommendations.beds = 'Current bed capacity is sufficient. Consider scheduling elective procedures.';
        recommendations.equipment = 'Good time for equipment maintenance and inventory optimization.';
    } else {
        recommendations.staffing = `Maintain current staffing for stable workload of ~${Math.round(avgDaily)} patients/day.`;
        recommendations.beds = `Current bed allocation adequate. Monitor for ${peakDay.value} patients on ${new Date(peakDay.date).toLocaleDateString()}.`;
        recommendations.equipment = 'Continue standard inventory management practices.';
    }

    return recommendations;
}
