export const patients = [
    {
        id: "1",
        name: "Marco Rossi",
        age: 45,
        gender: "Male",
        lastVisit: "2023-10-15",
        status: "Stable",
        diagnosis: "Hypertension",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marco",
        notes: "Patient reports mild headaches. BP monitored weekly.",
        history: [
            { date: "2023-10-15", type: "Checkup", doctor: "Dr. Smith", notes: "BP 130/85. Adjusted medication." },
            { date: "2023-09-01", type: "Lab Work", doctor: "Dr. Smith", notes: "Cholesterol levels normal." },
        ],
        medications: ["Lisinopril 10mg", "Atorvastatin 20mg"],
        allergies: ["Penicillin"],
        contact: {
            phone: "+39 333 1234567",
            email: "marco.rossi@example.com",
            address: "Via Roma 10, Milano"
        }
    },
    {
        id: "2",
        name: "Giulia Bianchi",
        age: 32,
        gender: "Female",
        lastVisit: "2023-11-02",
        status: "Critical",
        diagnosis: "Type 2 Diabetes",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Giulia",
        notes: "Insulin sensitivity decreasing. Needs dietary review.",
        history: [
            { date: "2023-11-02", type: "Emergency", doctor: "Dr. House", notes: "Hyperglycemia episode." },
        ],
        medications: ["Metformin 500mg", "Insulin Glargine"],
        allergies: ["None"],
        contact: {
            phone: "+39 333 9876543",
            email: "giulia.bianchi@example.com",
            address: "Corso Italia 22, Roma"
        }
    },
    {
        id: "3",
        name: "Luca Verdi",
        age: 28,
        gender: "Male",
        lastVisit: "2023-10-20",
        status: "Recovering",
        diagnosis: "ACL Tear",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Luca",
        notes: "Physiotherapy progressing well. Range of motion improving.",
        history: [
            { date: "2023-10-20", type: "Physio", doctor: "Dr. Stone", notes: "Knee flexion at 90 degrees." },
        ],
        medications: ["Ibuprofen 400mg"],
        allergies: ["Latex"],
        contact: {
            phone: "+39 333 5555555",
            email: "luca.verdi@example.com",
            address: "Via Napoli 5, Torino"
        }
    },
    {
        id: "4",
        name: "Elena Neri",
        age: 55,
        gender: "Female",
        lastVisit: "2023-11-10",
        status: "Stable",
        diagnosis: "Migraine",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
        notes: "Frequency of attacks reduced with new medication.",
        history: [],
        medications: ["Sumatriptan 50mg"],
        allergies: ["Sulfa drugs"],
        contact: {
            phone: "+39 333 4444444",
            email: "elena.neri@example.com",
            address: "Piazza San Marco 1, Venezia"
        }
    },
    {
        id: "5",
        name: "Alessandro Gialli",
        age: 60,
        gender: "Male",
        lastVisit: "2023-11-05",
        status: "Observation",
        diagnosis: "Arrhythmia",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alessandro",
        notes: "Holter monitor results pending.",
        history: [],
        medications: ["Bisoprolol 2.5mg"],
        allergies: ["None"],
        contact: {
            phone: "+39 333 2222222",
            email: "alessandro.g@example.com",
            address: "Via Firenze 8, Bologna"
        }
    }
];

export const notifications = [
    { id: 1, type: "alert", message: "Patient #1234 vitals critical", time: "5 min ago" },
    { id: 2, type: "info", message: "Lab results ready for Maria Bianchi", time: "1 hour ago" },
    { id: 3, type: "reminder", message: "Appointment with Giovanni Verdi at 3 PM", time: "2 hours ago" }
];

// Messages between doctors and patients
export const messages = {
    1: [ // Messages for patient ID 1
        {
            id: 1,
            from: "doctor",
            sender: "Dr. Rossi",
            text: "Buongiorno Marco, ho visto i tuoi ultimi esami del sangue. I valori sono nella norma.",
            timestamp: "2023-11-20 10:30",
            type: "text"
        },
        {
            id: 2,
            from: "patient",
            sender: "Marco Bianchi",
            text: "Grazie dottore! Devo fare altri controlli?",
            timestamp: "2023-11-20 11:15",
            type: "text"
        },
        {
            id: 3,
            from: "doctor",
            sender: "Dr. Rossi",
            text: "Ti consiglio una visita di controllo tra 3 mesi. Ho programmato un appuntamento.",
            timestamp: "2023-11-20 14:00",
            type: "visit_recommendation",
            visitDetails: {
                date: "2024-02-20",
                time: "10:00",
                reason: "Controllo di routine"
            }
        }
    ],
    2: [
        {
            id: 1,
            from: "doctor",
            sender: "Dr. Rossi",
            text: "Maria, ho analizzato la tua radiografia. Tutto apposto, nessuna anomalia rilevata.",
            timestamp: "2023-11-18 09:00",
            type: "text"
        }
    ]
};

// Visit recommendations
export const visitRecommendations = [
    {
        id: 1,
        patientId: 1,
        doctorName: "Dr. Rossi",
        date: "2024-02-20",
        time: "10:00",
        reason: "Controllo di routine",
        status: "pending",
        notes: "Portare esami del sangue recenti"
    }
];

// AI Analysis results for documents
export const aiAnalysisResults = {
    1: {
        documentName: "Blood Test Results.pdf",
        analysisDate: "2023-11-20",
        summary: "Valori nella norma. Colesterolo leggermente elevato ma accettabile.",
        findings: [
            { parameter: "Colesterolo totale", value: "195 mg/dL", status: "normal", note: "Limite superiore 200 mg/dL" },
            { parameter: "HDL", value: "55 mg/dL", status: "good", note: "Valore ottimale" },
            { parameter: "LDL", value: "120 mg/dL", status: "normal", note: "Entro i limiti" },
            { parameter: "Trigliceridi", value: "100 mg/dL", status: "good", note: "Valore ottimale" }
        ],
        recommendations: [
            "Continuare dieta equilibrata",
            "Attività fisica regolare (30 min/giorno)",
            "Controllo tra 6 mesi"
        ]
    },
    2: {
        documentName: "X-Ray Report.pdf",
        analysisDate: "2023-10-15",
        summary: "Radiografia torace: nessuna anomalia rilevata.",
        findings: [
            { area: "Polmoni", status: "normal", note: "Campi polmonari liberi" },
            { area: "Cuore", status: "normal", note: "Ombra cardiaca nella norma" },
            { area: "Strutture ossee", status: "normal", note: "Nessuna frattura" }
        ],
        recommendations: [
            "Nessun follow-up necessario",
            "Controllo annuale di routine"
        ]
    }
};
