function toNumber(value, fallback = 0) {
    const num = Number(value);
    return Number.isFinite(num) ? num : fallback;
}

function roundToOne(value) {
    return Math.round(toNumber(value) * 10) / 10;
}

function normalizeConfidence(confidence) {
    if (!confidence) return null;

    const lower = confidence.lower ?? confidence.low ?? confidence.l;
    const upper = confidence.upper ?? confidence.high ?? confidence.u;

    if (lower == null && upper == null) return null;

    return {
        lower: toNumber(lower, null),
        upper: toNumber(upper, null),
    };
}

function mapSeries(items, isHistorical) {
    if (!Array.isArray(items)) return [];

    return items
        .map(item => ({
            date: item.date ?? item.day ?? item.timestamp ?? '',
            value: toNumber(item.value ?? item.count ?? item.y),
            confidence: normalizeConfidence(item.confidence ?? item.interval),
            isHistorical,
        }))
        .filter(point => point.date);
}

function sortByDate(series) {
    return series.sort((a, b) => new Date(a.date) - new Date(b.date));
}

function findPeak(points) {
    return points.reduce((peak, point) => {
        if (!peak || toNumber(point.value) > toNumber(peak.value)) return point;
        return peak;
    }, null);
}

export function normalizeForecastData(rawData) {
    if (!rawData) return null;

    const data = rawData.data ?? rawData;

    const historical = sortByDate(
        mapSeries(
            data.historical ?? data.historicalData ?? data.history ?? [],
            true
        )
    );

    const forecast = sortByDate(
        mapSeries(
            data.forecast ?? data.predictions ?? data.forecastPoints ?? data.forecast_points ?? [],
            false
        )
    );

    const metrics = data.metrics ?? data.summary ?? data.stats ?? {};
    const computedTotal = forecast.reduce((sum, point) => sum + toNumber(point.value), 0);
    const expectedTotal = toNumber(
        metrics.expectedTotal ?? metrics.expected_total ?? metrics.total,
        computedTotal
    );

    const averageDaily = metrics.averageDaily ?? metrics.average_daily ?? (forecast.length ? expectedTotal / forecast.length : 0);

    const peak = metrics.peakDay ?? metrics.peak_day ?? findPeak(forecast);
    const peakDay = peak
        ? { date: peak.date ?? '', value: toNumber(peak.value) }
        : { date: '', value: 0 };

    return {
        historical,
        forecast,
        expectedTotal: Math.round(expectedTotal),
        peakDay,
        averageDaily: roundToOne(averageDaily),
        trend: metrics.trend ?? metrics.direction ?? 'stable',
        recommendations: data.recommendations ?? metrics.recommendations ?? null,
    };
}
