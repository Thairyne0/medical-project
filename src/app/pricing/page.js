import { MarketingNavbar } from "@/components/marketing/MarketingNavbar";
import { Footer } from "@/components/marketing/Footer";
import { Button } from "@/components/ui/Button";
import { Check } from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: "Pricing - MediCarePro",
    description: "Flexible pricing plans for clinics and hospitals.",
};

export default function PricingPage() {
    const plans = [
        {
            name: "Starter",
            price: "$499",
            period: "/month",
            desc: "Perfect for small private clinics.",
            features: ["Up to 5 Users", "Basic DataHub Access", "Standard Support", "Daily Backups"],
            cta: "Start Trial",
            popular: false,
        },
        {
            name: "Professional",
            price: "$1,499",
            period: "/month",
            desc: "For growing medical centers.",
            features: ["Up to 20 Users", "Full DataHub & Insights", "PredictiveAI (Basic)", "Priority Support", "API Access"],
            cta: "Get Started",
            popular: true,
        },
        {
            name: "Enterprise",
            price: "Custom",
            period: "",
            desc: "For large hospitals and networks.",
            features: ["Unlimited Users", "Full Suite Access", "Custom AI Models", "Dedicated Account Manager", "On-premise Deployment Option"],
            cta: "Contact Sales",
            popular: false,
        },
    ];

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <MarketingNavbar />

            <main className="pt-32 pb-24">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h1 className="text-4xl lg:text-5xl font-bold mb-6">Simple, Transparent Pricing</h1>
                        <p className="text-xl text-slate-500">
                            Choose the plan that fits your institution&apos;s needs. No hidden fees.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {plans.map((plan) => (
                            <div
                                key={plan.name}
                                className={`relative bg-white rounded-2xl shadow-xl border ${plan.popular ? 'border-teal-500 ring-4 ring-teal-500/10' : 'border-slate-200'} p-8 flex flex-col`}
                            >
                                {plan.popular && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-teal-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                                        Most Popular
                                    </div>
                                )}
                                <div className="mb-8">
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                                    <p className="text-slate-500 text-sm">{plan.desc}</p>
                                </div>
                                <div className="mb-8">
                                    <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                                    <span className="text-slate-500">{plan.period}</span>
                                </div>
                                <ul className="space-y-4 mb-8 flex-1">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <Check className="h-5 w-5 text-teal-500 flex-shrink-0" />
                                            <span className="text-slate-700 text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Link href="/login" className="block">
                                    <Button
                                        variant={plan.popular ? "primary" : "outline"}
                                        className="w-full"
                                    >
                                        {plan.cta}
                                    </Button>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
