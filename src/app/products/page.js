import { MarketingNavbar } from "@/components/marketing/MarketingNavbar";
import { Footer } from "@/components/marketing/Footer";
import { Button } from "@/components/ui/Button";
import { Database, Brain, Bot, BarChart3, Check } from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: "Products - MediCarePro",
    description: "Explore our suite of AI-powered healthcare products.",
};

export default function ProductsPage() {
    const products = [
        {
            id: "datahub",
            title: "DataHub",
            subtitle: "The Foundation of Medical Intelligence",
            description: "A secure, scalable data lake that unifies patient records, imaging, and genomic data. Built with native FHIR support for seamless interoperability.",
            features: ["FHIR Interoperability", "Real-time Data Ingestion", "Enterprise-grade Security", "Multi-modal Data Support"],
            icon: Database,
            color: "text-blue-600",
            bg: "bg-blue-50",
        },
        {
            id: "predictive",
            title: "PredictiveAI",
            subtitle: "See the Future of Patient Care",
            description: "Advanced machine learning models that identify high-risk patients before critical events occur. Reduce readmissions and optimize resource allocation.",
            features: ["Sepsis Early Warning", "Readmission Risk Scoring", "Length of Stay Prediction", "Mortality Risk Analysis"],
            icon: Brain,
            color: "text-purple-600",
            bg: "bg-purple-50",
        },
        {
            id: "processbot",
            title: "ProcessBot",
            subtitle: "Automate the Mundane",
            description: "Intelligent RPA bots that handle scheduling, billing coding, and claims processing. Free up your staff to focus on patient care.",
            features: ["Automated Scheduling", "Smart Billing Coding", "Claims Denial Management", "Prior Authorization"],
            icon: Bot,
            color: "text-orange-600",
            bg: "bg-orange-50",
        },
        {
            id: "insights",
            title: "Insights",
            subtitle: "Actionable Analytics Dashboard",
            description: "Real-time visualization of clinical and operational KPIs. Empower leadership with data-driven decision making capabilities.",
            features: ["Customizable Widgets", "Real-time Alerts", "Departmental Benchmarking", "Financial Forecasting"],
            icon: BarChart3,
            color: "text-teal-600",
            bg: "bg-teal-50",
        },
    ];

    return (
        <div className="min-h-screen bg-white font-sans text-slate-900">
            <MarketingNavbar />

            <main className="pt-24 pb-20">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h1 className="text-4xl lg:text-5xl font-bold mb-6">Our Product Suite</h1>
                        <p className="text-xl text-slate-500">
                            Integrated solutions for the modern healthcare ecosystem.
                        </p>
                    </div>

                    <div className="space-y-24">
                        {products.map((product, index) => (
                            <div key={product.id} id={product.id} className={`flex flex-col lg:flex-row gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                                <div className="flex-1">
                                    <div className={`w-16 h-16 rounded-2xl ${product.bg} flex items-center justify-center mb-6`}>
                                        <product.icon className={`h-8 w-8 ${product.color}`} />
                                    </div>
                                    <h2 className="text-3xl font-bold mb-2">{product.title}</h2>
                                    <p className={`text-lg font-medium mb-4 ${product.color}`}>{product.subtitle}</p>
                                    <p className="text-slate-500 text-lg mb-8 leading-relaxed">
                                        {product.description}
                                    </p>
                                    <ul className="grid sm:grid-cols-2 gap-4 mb-8">
                                        {product.features.map((feature, i) => (
                                            <li key={i} className="flex items-center gap-3">
                                                <div className="bg-green-100 rounded-full p-1">
                                                    <Check className="h-3 w-3 text-green-600" />
                                                </div>
                                                <span className="text-slate-700 font-medium">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <Link href="/login">
                                        <Button size="lg" className="rounded-full">Request Demo</Button>
                                    </Link>
                                </div>
                                <div className="flex-1 w-full">
                                    <div className="aspect-video bg-slate-100 rounded-2xl border border-slate-200 shadow-xl flex items-center justify-center relative overflow-hidden group">
                                        <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 opacity-50" />
                                        <product.icon className={`h-24 w-24 ${product.color} opacity-20 group-hover:scale-110 transition-transform duration-500`} />
                                        <span className="relative z-10 font-medium text-slate-400">UI Preview Placeholder</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
