/**
 * In-memory mock data store for extracted patient records
 * This will be replaced by a real database in production
 */

// In-memory storage for extracted records
let extractedRecords = [];

// Sample data for testing dashboard and forecast features
const sampleRecords = [
    {
        id: "rec-001",
        patientId: "P-2023-1001",
        patientName: "Giovanni Rossi",
        age: 45,
        sex: "Male",
        diagnosis: "Acute Myocardial Infarction",
        pathologyGroup: "Cardiovascular",
        admissionDate: "2023-10-15",
        dischargeDate: "2023-10-22",
        department: "Cardiology",
        keyFindings: "ST-elevation MI, successful PCI performed",
        city: "Milano",
        region: "Lombardia",
        status: "confirmed",
        createdAt: "2023-10-15T08:30:00Z",
        updatedAt: "2023-10-15T08:30:00Z",
        extractedFrom: "report_001.pdf"
    },
    {
        id: "rec-002",
        patientId: "P-2023-1002",
        patientName: "Maria Bianchi",
        age: 62,
        sex: "Female",
        diagnosis: "Type 2 Diabetes Mellitus",
        pathologyGroup: "Endocrine",
        admissionDate: "2023-10-18",
        dischargeDate: "2023-10-25",
        department: "Endocrinology",
        keyFindings: "HbA1c 8.5%, insulin therapy initiated",
        city: "Roma",
        region: "Lazio",
        status: "confirmed",
        createdAt: "2023-10-18T09:15:00Z",
        updatedAt: "2023-10-18T09:15:00Z",
        extractedFrom: "report_002.pdf"
    },
    {
        id: "rec-003",
        patientId: "P-2023-1003",
        patientName: "Luca Verdi",
        age: 28,
        sex: "Male",
        diagnosis: "ACL Tear",
        pathologyGroup: "Orthopedic",
        admissionDate: "2023-10-20",
        dischargeDate: "2023-10-21",
        department: "Orthopedics",
        keyFindings: "Complete ACL tear, surgical reconstruction recommended",
        city: "Torino",
        region: "Piemonte",
        status: "confirmed",
        createdAt: "2023-10-20T10:00:00Z",
        updatedAt: "2023-10-20T10:00:00Z",
        extractedFrom: "report_003.pdf"
    },
    {
        id: "rec-004",
        patientId: "P-2023-1004",
        patientName: "Elena Neri",
        age: 55,
        sex: "Female",
        diagnosis: "Chronic Migraine",
        pathologyGroup: "Neurological",
        admissionDate: "2023-10-22",
        dischargeDate: "2023-10-23",
        department: "Neurology",
        keyFindings: "Chronic migraine with aura, preventive therapy adjusted",
        city: "Napoli",
        region: "Campania",
        status: "confirmed",
        createdAt: "2023-10-22T11:30:00Z",
        updatedAt: "2023-10-22T11:30:00Z",
        extractedFrom: "report_004.pdf"
    },
    {
        id: "rec-005",
        patientId: "P-2023-1005",
        patientName: "Alessandro Gialli",
        age: 70,
        sex: "Male",
        diagnosis: "Atrial Fibrillation",
        pathologyGroup: "Cardiovascular",
        admissionDate: "2023-10-25",
        dischargeDate: "2023-11-01",
        department: "Cardiology",
        keyFindings: "Persistent AF, anticoagulation therapy started",
        city: "Milano",
        region: "Lombardia",
        status: "confirmed",
        createdAt: "2023-10-25T14:00:00Z",
        updatedAt: "2023-10-25T14:00:00Z",
        extractedFrom: "report_005.pdf"
    },
    {
        id: "rec-006",
        patientId: "P-2023-1006",
        patientName: "Sofia Blu",
        age: 34,
        sex: "Female",
        diagnosis: "Pneumonia",
        pathologyGroup: "Respiratory",
        admissionDate: "2023-10-28",
        dischargeDate: "2023-11-03",
        department: "Pulmonology",
        keyFindings: "Community-acquired pneumonia, responded well to antibiotics",
        city: "Firenze",
        region: "Toscana",
        status: "confirmed",
        createdAt: "2023-10-28T08:45:00Z",
        updatedAt: "2023-10-28T08:45:00Z",
        extractedFrom: "report_006.pdf"
    },
    {
        id: "rec-007",
        patientId: "P-2023-1007",
        patientName: "Marco Viola",
        age: 41,
        sex: "Male",
        diagnosis: "Acute Appendicitis",
        pathologyGroup: "Gastrointestinal",
        admissionDate: "2023-11-01",
        dischargeDate: "2023-11-04",
        department: "Surgery",
        keyFindings: "Acute appendicitis, laparoscopic appendectomy performed",
        city: "Bologna",
        region: "Emilia-Romagna",
        status: "confirmed",
        createdAt: "2023-11-01T16:20:00Z",
        updatedAt: "2023-11-01T16:20:00Z",
        extractedFrom: "report_007.pdf"
    },
    {
        id: "rec-008",
        patientId: "P-2023-1008",
        patientName: "Francesca Rosa",
        age: 58,
        sex: "Female",
        diagnosis: "Hypertensive Crisis",
        pathologyGroup: "Cardiovascular",
        admissionDate: "2023-11-05",
        dischargeDate: "2023-11-08",
        department: "Cardiology",
        keyFindings: "Hypertensive emergency, BP controlled with IV medications",
        city: "Roma",
        region: "Lazio",
        status: "confirmed",
        createdAt: "2023-11-05T07:30:00Z",
        updatedAt: "2023-11-05T07:30:00Z",
        extractedFrom: "report_008.pdf"
    }
];

// Initialize store with sample data
extractedRecords = [...sampleRecords];

/**
 * Get all extracted records with optional filtering
 * @param {Object} filters - Filter options
 * @returns {Array} Filtered records
 */
export function getAllRecords(filters = {}) {
    let records = [...extractedRecords];

    // Filter by date range
    if (filters.dateRange) {
        const { start, end } = filters.dateRange;
        records = records.filter(r => {
            const admissionDate = new Date(r.admissionDate);
            return admissionDate >= new Date(start) && admissionDate <= new Date(end);
        });
    }

    // Filter by department
    if (filters.department) {
        records = records.filter(r => r.department === filters.department);
    }

    // Filter by pathology groups
    if (filters.pathologyGroups && filters.pathologyGroups.length > 0) {
        records = records.filter(r => filters.pathologyGroups.includes(r.pathologyGroup));
    }

    return records;
}

/**
 * Get a single record by ID
 * @param {string} id - Record ID
 * @returns {Object|null} Record or null if not found
 */
export function getRecordById(id) {
    return extractedRecords.find(r => r.id === id) || null;
}

/**
 * Add a new record to the store
 * @param {Object} record - Record to add
 * @returns {Object} Added record with generated ID
 */
export function addRecord(record) {
    const newRecord = {
        ...record,
        id: `rec-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: record.status || 'confirmed'
    };
    extractedRecords.push(newRecord);
    return newRecord;
}

/**
 * Update an existing record
 * @param {string} id - Record ID
 * @param {Object} updates - Fields to update
 * @returns {Object|null} Updated record or null if not found
 */
export function updateRecord(id, updates) {
    const index = extractedRecords.findIndex(r => r.id === id);
    if (index === -1) return null;

    extractedRecords[index] = {
        ...extractedRecords[index],
        ...updates,
        updatedAt: new Date().toISOString()
    };
    return extractedRecords[index];
}

/**
 * Delete a record
 * @param {string} id - Record ID
 * @returns {boolean} True if deleted, false if not found
 */
export function deleteRecord(id) {
    const index = extractedRecords.findIndex(r => r.id === id);
    if (index === -1) return false;

    extractedRecords.splice(index, 1);
    return true;
}

/**
 * Get time series data for forecasting (daily patient counts)
 * @param {number} days - Number of days of historical data
 * @returns {Array} Daily patient counts
 */
export function getTimeSeriesData(days = 30) {
    const timeSeries = [];
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - days);

    // Generate daily counts from records
    const dailyCounts = {};
    extractedRecords.forEach(record => {
        const date = record.admissionDate.split('T')[0];
        dailyCounts[date] = (dailyCounts[date] || 0) + 1;
    });

    // Fill in missing days with 0 or interpolated values
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        const dateStr = d.toISOString().split('T')[0];
        timeSeries.push({
            date: dateStr,
            count: dailyCounts[dateStr] || Math.floor(Math.random() * 3) // Random 0-2 for missing days
        });
    }

    return timeSeries;
}

/**
 * Reset store to initial sample data (for testing)
 */
export function resetStore() {
    extractedRecords = [...sampleRecords];
}
