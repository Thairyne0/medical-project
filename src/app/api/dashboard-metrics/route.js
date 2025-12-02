import { NextResponse } from 'next/server';
import { getAllRecords } from '@/lib/api/mockStore';

/**
 * API Route: Get dashboard metrics
 * POST /api/dashboard-metrics
 * 
 * Accepts: JSON body with DashboardFilters
 * Returns: DashboardMetrics object
 * 
 * FUTURE INTEGRATION:
 * Replace calculations with database aggregation queries or external analytics service
 */
export async function POST(request) {
    try {
        const filters = await request.json();

        // Get filtered records
        const records = getAllRecords(filters);

        // Calculate patient analysis metrics
        const patientAnalysis = calculatePatientAnalysis(records);

        // Calculate operational efficiency metrics
        const operationalEfficiency = calculateOperationalEfficiency(records);

        // Calculate geographic distribution
        const geographicDistribution = calculateGeographicDistribution(records);

        return NextResponse.json({
            success: true,
            data: {
                patientAnalysis,
                operationalEfficiency,
                geographicDistribution,
                generatedAt: new Date().toISOString()
            }
        });

    } catch (error) {
        console.error('Dashboard metrics error:', error);
        return NextResponse.json(
            {
                error: 'Calculation failed',
                message: error.message || 'Failed to calculate dashboard metrics'
            },
            { status: 500 }
        );
    }
}

function calculatePatientAnalysis(records) {
    const totalPatients = records.length;

    // Group by pathology
    const byPathology = {};
    records.forEach(r => {
        byPathology[r.pathologyGroup] = (byPathology[r.pathologyGroup] || 0) + 1;
    });

    // Group by age ranges
    const ageRanges = [
        { range: '0-18', min: 0, max: 18 },
        { range: '19-35', min: 19, max: 35 },
        { range: '36-50', min: 36, max: 50 },
        { range: '51-65', min: 51, max: 65 },
        { range: '66+', min: 66, max: 150 }
    ];

    const byAge = ageRanges.map(({ range, min, max }) => ({
        range,
        count: records.filter(r => r.age >= min && r.age <= max).length
    }));

    // Find most frequent pathology
    const mostFrequentPathology = Object.entries(byPathology)
        .sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

    // Calculate median and average age
    const ages = records.map(r => r.age).sort((a, b) => a - b);
    const medianAge = ages.length > 0
        ? ages[Math.floor(ages.length / 2)]
        : 0;
    const averageAge = ages.length > 0
        ? Math.round(ages.reduce((sum, age) => sum + age, 0) / ages.length)
        : 0;

    return {
        totalPatients,
        byPathology,
        byAge,
        mostFrequentPathology,
        medianAge,
        averageAge
    };
}

function calculateOperationalEfficiency(records) {
    const handlingTimes = records.map(r => {
        const admission = new Date(r.admissionDate);
        const discharge = new Date(r.dischargeDate);
        return (discharge - admission) / (1000 * 60 * 60 * 24); // days
    }).filter(t => !isNaN(t) && t >= 0);

    const averageHandlingTime = handlingTimes.length > 0
        ? handlingTimes.reduce((sum, t) => sum + t, 0) / handlingTimes.length
        : 0;

    const sortedTimes = [...handlingTimes].sort((a, b) => a - b);
    const medianHandlingTime = sortedTimes.length > 0
        ? sortedTimes[Math.floor(sortedTimes.length / 2)]
        : 0;

    const percentile90Index = Math.floor(sortedTimes.length * 0.9);
    const percentile90 = sortedTimes[percentile90Index] || 0;

    // Generate time series (group by admission date)
    const timeSeriesMap = {};
    records.forEach(r => {
        const date = r.admissionDate.split('T')[0];
        if (!timeSeriesMap[date]) {
            timeSeriesMap[date] = { totalTime: 0, count: 0 };
        }
        const admission = new Date(r.admissionDate);
        const discharge = new Date(r.dischargeDate);
        const handlingTime = (discharge - admission) / (1000 * 60 * 60 * 24);
        if (!isNaN(handlingTime) && handlingTime >= 0) {
            timeSeriesMap[date].totalTime += handlingTime;
            timeSeriesMap[date].count += 1;
        }
    });

    const timeSeries = Object.entries(timeSeriesMap)
        .map(([date, data]) => ({
            date,
            avgHandlingTime: data.count > 0 ? data.totalTime / data.count : 0,
            patientCount: data.count
        }))
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    return {
        averageHandlingTime: Math.round(averageHandlingTime * 10) / 10,
        medianHandlingTime: Math.round(medianHandlingTime * 10) / 10,
        percentile90: Math.round(percentile90 * 10) / 10,
        timeSeries
    };
}

function calculateGeographicDistribution(records) {
    const byCity = {};
    const byRegion = {};

    records.forEach(r => {
        if (r.city) {
            byCity[r.city] = (byCity[r.city] || 0) + 1;
        }
        if (r.region) {
            byRegion[r.region] = (byRegion[r.region] || 0) + 1;
        }
    });

    const totalPatients = records.length;
    const topCities = Object.entries(byCity)
        .map(([name, count]) => ({
            name,
            count,
            percentage: totalPatients > 0 ? Math.round((count / totalPatients) * 100) : 0
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

    return {
        byCity,
        byRegion,
        topCities
    };
}
