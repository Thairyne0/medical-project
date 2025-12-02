function toNumber(value, fallback = 0) {
    const num = Number(value);
    return Number.isFinite(num) ? num : fallback;
}

function roundToOne(value) {
    return Math.round(toNumber(value) * 10) / 10;
}

function formatRange(min, max) {
    if (min == null && max == null) return null;
    if (min != null && max != null) return `${min}-${max}`;
    if (min != null) return `${min}+`;
    return `-${max}`;
}

export function normalizeDashboardMetrics(rawMetrics) {
    if (!rawMetrics) return null;

    const metrics = rawMetrics.data ?? rawMetrics;
    const patient = metrics.patientAnalysis ?? metrics.patient_analysis ?? metrics.patient ?? {};
    const operational = metrics.operationalEfficiency ?? metrics.operational_efficiency ?? metrics.operational ?? {};
    const geographic = metrics.geographicDistribution ?? metrics.geographic_distribution ?? metrics.geo ?? {};

    const byPathology = patient.byPathology ?? patient.by_pathology ?? {};
    const byAgeInput = patient.byAge ?? patient.by_age ?? patient.ageBuckets ?? [];
    const byAge = Array.isArray(byAgeInput)
        ? byAgeInput
            .map(item => ({
                range: item.range ?? formatRange(item.min, item.max),
                count: toNumber(item.count),
            }))
            .filter(item => item.range)
        : Object.entries(byAgeInput).map(([range, count]) => ({
            range,
            count: toNumber(count),
        }));

    const patientAnalysis = {
        totalPatients: toNumber(patient.totalPatients ?? patient.total_patients),
        byPathology,
        byAge,
        mostFrequentPathology: patient.mostFrequentPathology ?? patient.most_frequent_pathology ?? Object.keys(byPathology)[0] ?? 'N/A',
        medianAge: roundToOne(patient.medianAge ?? patient.median_age),
        averageAge: roundToOne(patient.averageAge ?? patient.average_age),
    };

    const timeSeriesInput = operational.timeSeries ?? operational.time_series ?? operational.history ?? [];
    const timeSeries = Array.isArray(timeSeriesInput)
        ? timeSeriesInput
            .map(item => ({
                date: item.date ?? item.day ?? item.period ?? '',
                avgHandlingTime: roundToOne(item.avgHandlingTime ?? item.avg_handling_time ?? item.value),
                patientCount: toNumber(item.patientCount ?? item.patient_count ?? item.count),
            }))
            .filter(item => item.date)
        : [];

    const operationalEfficiency = {
        averageHandlingTime: roundToOne(operational.averageHandlingTime ?? operational.avgHandlingTime ?? operational.average_handling_time),
        medianHandlingTime: roundToOne(operational.medianHandlingTime ?? operational.median_handling_time),
        percentile90: roundToOne(operational.percentile90 ?? operational.percentile_90 ?? operational.p90),
        timeSeries,
    };

    const byCity = geographic.byCity ?? geographic.by_city ?? {};
    const byRegion = geographic.byRegion ?? geographic.by_region ?? {};
    const topCitiesInput = geographic.topCities ?? geographic.top_cities;
    const totalCityCount = Object.values(byCity).reduce((sum, count) => sum + toNumber(count), 0);
    const topCities = Array.isArray(topCitiesInput)
        ? topCitiesInput
            .map(city => {
                const count = toNumber(city.count ?? city.value);
                const percentage = city.percentage ?? city.percent;
                return {
                    name: city.name ?? city.city ?? '',
                    count,
                    percentage: percentage != null
                        ? Math.round(percentage)
                        : totalCityCount > 0
                            ? Math.round((count / totalCityCount) * 100)
                            : 0,
                };
            })
            .filter(city => city.name)
        : Object.entries(byCity)
            .map(([name, count]) => ({
                name,
                count: toNumber(count),
                percentage: totalCityCount > 0 ? Math.round((toNumber(count) / totalCityCount) * 100) : 0,
            }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 10);

    return {
        patientAnalysis,
        operationalEfficiency,
        geographicDistribution: {
            byCity,
            byRegion,
            topCities,
        },
    };
}
