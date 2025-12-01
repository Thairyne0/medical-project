import { MarketingNavbar } from "@/components/marketing/MarketingNavbar";
import { Footer } from "@/components/marketing/Footer";
import { Card, CardContent } from "@/components/ui/Card";
import { Shield, Users, Heart } from "lucide-react";

export const metadata = {
    title: "About Us - MediCarePro",
    description: "Our mission to revolutionize healthcare with ethical AI.",
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white font-sans text-slate-900">
            <MarketingNavbar />

            <main className="pt-32 pb-24">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center mb-20">
                        <h1 className="text-4xl lg:text-5xl font-bold mb-6">Our Mission</h1>
                        <p className="text-xl text-slate-500 leading-relaxed">
                            To empower healthcare providers with intelligent tools that save lives, reduce burnout, and make high-quality care accessible to all.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mb-24">
                        {[
                            { title: "Trust & Security", icon: Shield, desc: "We prioritize patient privacy above all else. HIPAA & GDPR compliant by design." },
                            { title: "Patient-Centric", icon: Heart, desc: "Technology should serve humans, not the other way around." },
                            { title: "Expert Team", icon: Users, desc: "Built by a team of doctors, data scientists, and engineers." },
                        ].map((val, i) => (
                            <Card key={i} className="text-center border-none shadow-none bg-slate-50">
                                <CardContent className="pt-6">
                                    <div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                                        <val.icon className="h-8 w-8 text-teal-600" />
                                    </div>
                                    <h3 className="text-lg font-bold mb-2">{val.title}</h3>
                                    <p className="text-slate-500">{val.desc}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="bg-slate-900 rounded-3xl p-12 text-center text-white">
                        <h2 className="text-3xl font-bold mb-4">Join the Revolution</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto mb-8">
                            We are always looking for passionate individuals to join our team.
                        </p>
                        <a href="#" className="text-teal-400 font-medium hover:underline">View Open Positions →</a>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
