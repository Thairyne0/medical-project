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
    {
        id: 1,
        title: "Lab Results Ready",
        message: "Blood work results for Giulia Bianchi are available.",
        time: "10 min ago",
        type: "info"
    },
    {
        id: 2,
        title: "Appointment Cancelled",
        message: "Luca Verdi cancelled his appointment for tomorrow.",
        time: "1 hour ago",
        type: "warning"
    },
    {
        id: 3,
        title: "System Update",
        message: "System maintenance scheduled for tonight at 2 AM.",
        time: "3 hours ago",
        type: "system"
    },
    {
        id: 4,
        title: "New Patient Registered",
        message: "Alessandro Gialli has been assigned to you.",
        time: "5 hours ago",
        type: "success"
    }
];
