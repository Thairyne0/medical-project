/**
 * AI Extraction Service
 * This module handles PDF parsing and information extraction
 * 
 * CURRENT IMPLEMENTATION: Mock/Simulated extraction
 * FUTURE INTEGRATION: Replace with real AI service
 * 
 * Integration options:
 * 1. Azure Form Recognizer / Document Intelligence
 * 2. AWS Textract
 * 3. Google Cloud Document AI
 * 4. Custom ML model (e.g., fine-tuned LLM)
 * 5. Third-party medical document parsing service
 */

/**
 * Extract key information from a PDF file
 * 
 * MOCK IMPLEMENTATION:
 * Currently returns simulated data for demonstration
 * 
 * TO INTEGRATE REAL AI SERVICE:
 * 1. Replace this function body with actual API call to AI service
 * 2. Add authentication (API keys, tokens)
 * 3. Handle file upload to AI service
 * 4. Parse AI service response format
 * 5. Map response to ExtractedInfo structure
 * 6. Add error handling for AI service failures
 * 
 * Example with Azure Form Recognizer:
 * ```javascript
 * const { DocumentAnalysisClient, AzureKeyCredential } = require("@azure/ai-form-recognizer");
 * const client = new DocumentAnalysisClient(endpoint, new AzureKeyCredential(apiKey));
 * const poller = await client.beginAnalyzeDocument("prebuilt-document", fileBuffer);
 * const result = await poller.pollUntilDone();
 * // Parse result.documents and map to ExtractedInfo
 * ```
 * 
 * @param {File|Buffer} file - PDF file to extract from
 * @returns {Promise<ExtractedInfo>} Extracted patient information
 */
export async function extractFromPDF(file) {
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));

    // TODO: REPLACE THIS MOCK DATA WITH REAL AI EXTRACTION
    // When integrating real AI service:
    // 1. Upload file to AI service
    // 2. Wait for processing
    // 3. Parse response
    // 4. Return structured data

    // Mock extracted data - simulates AI extraction results
    const mockData = {
        patientId: `P-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000) + 1000}`,
        patientName: generateRandomName(),
        age: Math.floor(Math.random() * 60) + 20,
        sex: Math.random() > 0.5 ? 'Male' : 'Female',
        diagnosis: getRandomDiagnosis(),
        pathologyGroup: '', // Will be set based on diagnosis
        admissionDate: getRandomDate(-30, -7),
        dischargeDate: '', // Will be calculated
        department: '', // Will be set based on diagnosis
        keyFindings: '',
        city: getRandomCity(),
        region: getRandomRegion()
    };

    // Set pathology group and department based on diagnosis
    const diagnosisInfo = getDiagnosisInfo(mockData.diagnosis);
    mockData.pathologyGroup = diagnosisInfo.pathologyGroup;
    mockData.department = diagnosisInfo.department;
    mockData.keyFindings = diagnosisInfo.keyFindings;

    // Calculate discharge date (admission + random 1-14 days)
    const admission = new Date(mockData.admissionDate);
    const stayDuration = Math.floor(Math.random() * 14) + 1;
    const discharge = new Date(admission);
    discharge.setDate(admission.getDate() + stayDuration);
    mockData.dischargeDate = discharge.toISOString().split('T')[0];

    return mockData;
}

/**
 * Validate PDF file
 * @param {File} file - File to validate
 * @returns {{valid: boolean, error?: string}}
 */
export function validatePDFFile(file) {
    // Check file type
    if (!file.type.includes('pdf') && !file.name.endsWith('.pdf')) {
        return {
            valid: false,
            error: 'File must be a PDF document'
        };
    }

    // Check file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
        return {
            valid: false,
            error: 'File size must be less than 10MB'
        };
    }

    return { valid: true };
}

// Helper functions for mock data generation

function generateRandomName() {
    const firstNames = ['Marco', 'Giulia', 'Luca', 'Elena', 'Alessandro', 'Sofia', 'Matteo', 'Francesca', 'Giovanni', 'Chiara'];
    const lastNames = ['Rossi', 'Bianchi', 'Verdi', 'Neri', 'Gialli', 'Blu', 'Viola', 'Rosa', 'Marino', 'Colombo'];
    return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
}

function getRandomDiagnosis() {
    const diagnoses = [
        'Acute Myocardial Infarction',
        'Type 2 Diabetes Mellitus',
        'Pneumonia',
        'Chronic Obstructive Pulmonary Disease',
        'Hypertensive Crisis',
        'Atrial Fibrillation',
        'Acute Appendicitis',
        'Chronic Migraine',
        'ACL Tear',
        'Stroke (Ischemic)',
        'Acute Kidney Injury',
        'Sepsis'
    ];
    return diagnoses[Math.floor(Math.random() * diagnoses.length)];
}

function getDiagnosisInfo(diagnosis) {
    const mapping = {
        'Acute Myocardial Infarction': {
            pathologyGroup: 'Cardiovascular',
            department: 'Cardiology',
            keyFindings: 'ST-elevation MI, troponin elevated, successful intervention'
        },
        'Type 2 Diabetes Mellitus': {
            pathologyGroup: 'Endocrine',
            department: 'Endocrinology',
            keyFindings: 'HbA1c elevated, insulin therapy initiated'
        },
        'Pneumonia': {
            pathologyGroup: 'Respiratory',
            department: 'Pulmonology',
            keyFindings: 'Community-acquired pneumonia, chest X-ray shows infiltrates'
        },
        'Chronic Obstructive Pulmonary Disease': {
            pathologyGroup: 'Respiratory',
            department: 'Pulmonology',
            keyFindings: 'COPD exacerbation, FEV1 reduced, oxygen therapy required'
        },
        'Hypertensive Crisis': {
            pathologyGroup: 'Cardiovascular',
            department: 'Cardiology',
            keyFindings: 'Severe hypertension, BP controlled with IV medications'
        },
        'Atrial Fibrillation': {
            pathologyGroup: 'Cardiovascular',
            department: 'Cardiology',
            keyFindings: 'Persistent AF, anticoagulation therapy started'
        },
        'Acute Appendicitis': {
            pathologyGroup: 'Gastrointestinal',
            department: 'Surgery',
            keyFindings: 'Acute appendicitis confirmed, laparoscopic appendectomy performed'
        },
        'Chronic Migraine': {
            pathologyGroup: 'Neurological',
            department: 'Neurology',
            keyFindings: 'Chronic migraine with aura, preventive therapy adjusted'
        },
        'ACL Tear': {
            pathologyGroup: 'Orthopedic',
            department: 'Orthopedics',
            keyFindings: 'Complete ACL tear, MRI confirmed, surgical reconstruction recommended'
        },
        'Stroke (Ischemic)': {
            pathologyGroup: 'Neurological',
            department: 'Neurology',
            keyFindings: 'Ischemic stroke, thrombolysis administered, good recovery'
        },
        'Acute Kidney Injury': {
            pathologyGroup: 'Renal',
            department: 'Nephrology',
            keyFindings: 'AKI stage 2, creatinine elevated, fluid management initiated'
        },
        'Sepsis': {
            pathologyGroup: 'Infectious Disease',
            department: 'Internal Medicine',
            keyFindings: 'Sepsis with multi-organ involvement, broad-spectrum antibiotics started'
        }
    };

    return mapping[diagnosis] || {
        pathologyGroup: 'General',
        department: 'Internal Medicine',
        keyFindings: 'Clinical evaluation completed, treatment plan established'
    };
}

function getRandomCity() {
    const cities = ['Milano', 'Roma', 'Napoli', 'Torino', 'Firenze', 'Bologna', 'Venezia', 'Genova', 'Palermo', 'Bari'];
    return cities[Math.floor(Math.random() * cities.length)];
}

function getRandomRegion() {
    const regions = {
        'Milano': 'Lombardia',
        'Roma': 'Lazio',
        'Napoli': 'Campania',
        'Torino': 'Piemonte',
        'Firenze': 'Toscana',
        'Bologna': 'Emilia-Romagna',
        'Venezia': 'Veneto',
        'Genova': 'Liguria',
        'Palermo': 'Sicilia',
        'Bari': 'Puglia'
    };
    const cities = Object.keys(regions);
    const city = cities[Math.floor(Math.random() * cities.length)];
    return regions[city];
}

function getRandomDate(minDaysAgo, maxDaysAgo) {
    const today = new Date();
    const daysAgo = Math.floor(Math.random() * (maxDaysAgo - minDaysAgo + 1)) + minDaysAgo;
    const date = new Date(today);
    date.setDate(today.getDate() + daysAgo);
    return date.toISOString().split('T')[0];
}
