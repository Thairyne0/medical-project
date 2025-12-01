import { MarketingNavbar } from "@/components/marketing/MarketingNavbar";
import { Footer } from "@/components/marketing/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Stethoscope, FileText, Activity, Layers } from "lucide-react";

export const metadata = {
    title: "Solutions - MediCarePro",
    description: "Tailored AI solutions for radiology, clinical NLP, and more.",
};

export default function SolutionsPage() {
    const solutions = [
        {
            title: "Radiology AI",
            desc: "Automated anomaly detection in X-rays, CT scans, and MRIs. Reduce diagnostic errors and speed up reporting.",
            icon: Activity,
            color: "text-blue-600",
            bg: "bg-blue-50",
        },
        {
            title: "Clinical NLP",
            desc: "Extract structured data from unstructured clinical notes. Automatically code diagnoses and procedures.",
            icon: FileText,
            color: "text-purple-600",
            bg: "bg-purple-50",
        },
        {
            title: "Predictive Analytics",
            desc: "Forecast patient volume, staffing needs, and disease outbreaks. Optimize hospital operations.",
            icon: Layers,
            color: "text-orange-600",
            bg: "bg-orange-50",
        },
        {
            title: "Remote Monitoring",
            desc: "IoT integration for real-time patient monitoring. Alerts for vitals deterioration.",
            icon: Stethoscope,
            color: "text-teal-600",
            bg: "bg-teal-50",
        },
    ];

    return (
        <div className="min-h-screen bg-white font-sans text-slate-900">
            <MarketingNavbar />

            <main className="pt-32 pb-24">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h1 className="text-4xl lg:text-5xl font-bold mb-6">Solutions by Use Case</h1>
                        <p className="text-xl text-slate-500">
                            Targeted applications of our AI technology to solve specific healthcare challenges.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {solutions.map((sol, i) => (
                            <Card key={i} className="hover:shadow-lg transition-shadow border-slate-200">
                                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                                    <div className={`p-3 rounded-xl ${sol.bg}`}>
                                        <sol.icon className={`h-6 w-6 ${sol.color}`} />
                                    </div>
                                    <CardTitle className="text-xl">{sol.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-slate-500 leading-relaxed">
                                        {sol.desc}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
