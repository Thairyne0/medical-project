import { MarketingNavbar } from "@/components/marketing/MarketingNavbar";
import { Footer } from "@/components/marketing/Footer";
import { Hero } from "@/components/marketing/Hero";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Database, Brain, Bot, BarChart3, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "MediCarePro - AI for Modern Healthcare",
  description: "Advanced AI analytics, predictive models, and process automation for hospitals and clinics.",
};

export default function MarketingHome() {
  const products = [
    {
      id: "datahub",
      title: "DataHub",
      description: "Centralized medical data lake with FHIR interoperability.",
      icon: Database,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      id: "predictive",
      title: "PredictiveAI",
      description: "Early warning systems and risk stratification models.",
      icon: Brain,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      id: "processbot",
      title: "ProcessBot",
      description: "RPA for scheduling, billing, and administrative tasks.",
      icon: Bot,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      id: "insights",
      title: "Insights",
      description: "Real-time clinical and operational dashboards.",
      icon: BarChart3,
      color: "text-teal-600",
      bg: "bg-teal-50",
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <MarketingNavbar />

      <main>
        <Hero />

        {/* Products Overview */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Comprehensive AI Suite</h2>
              <p className="text-lg text-slate-500">
                Four powerful modules designed to work together, covering every aspect of modern healthcare management.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <Card key={product.id} className="border-slate-100 shadow-lg hover:shadow-xl transition-shadow group">
                  <CardContent className="p-8">
                    <div className={`w-14 h-14 rounded-2xl ${product.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <product.icon className={`h-7 w-7 ${product.color}`} />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{product.title}</h3>
                    <p className="text-slate-500 mb-6 leading-relaxed">
                      {product.description}
                    </p>
                    <Link href={`/products#${product.id}`} className="inline-flex items-center text-sm font-semibold text-teal-600 hover:text-teal-700">
                      Learn more <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-lg text-slate-500">Seamless integration into your existing hospital workflow.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-12 relative">
              {/* Connector Line (Desktop) */}
              <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-0.5 bg-slate-200 -z-0" />

              {[
                { step: "01", title: "Connect", desc: "Securely link your EHR/EMR systems via our FHIR-ready API." },
                { step: "02", title: "Analyze", desc: "Our AI models process data in real-time to identify risks and opportunities." },
                { step: "03", title: "Act", desc: "Receive actionable insights and automated alerts directly in your dashboard." },
              ].map((item, i) => (
                <div key={i} className="relative z-10 text-center">
                  <div className="w-24 h-24 mx-auto bg-white rounded-full shadow-lg border-4 border-slate-50 flex items-center justify-center mb-6">
                    <span className="text-2xl font-bold text-teal-600">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-slate-500 max-w-xs mx-auto">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits / CTA */}
        <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-[50%] h-full bg-teal-900/10 blur-3xl pointer-events-none" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-6">Why Choose MediCarePro?</h2>
                <div className="space-y-4 mb-8">
                  {[
                    "HIPAA & GDPR Compliant Security",
                    "99.9% Uptime SLA",
                    "Seamless EHR Integration",
                    "24/7 Dedicated Support"
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="h-6 w-6 text-teal-500 flex-shrink-0" />
                      <span className="text-lg text-slate-300">{benefit}</span>
                    </div>
                  ))}
                </div>
                <Link href="/login">
                  <Button size="lg" className="bg-teal-500 hover:bg-teal-600 text-white border-none">
                    Get Started Today
                  </Button>
                </Link>
              </div>
              <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-2xl">
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-700 pb-4">
                    <div>
                      <p className="text-sm text-slate-400">Monthly Savings</p>
                      <p className="text-2xl font-bold text-white">$45,000+</p>
                    </div>
                    <div className="text-green-400 text-sm font-medium">+12% vs last month</div>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-700 pb-4">
                    <div>
                      <p className="text-sm text-slate-400">Patient Satisfaction</p>
                      <p className="text-2xl font-bold text-white">4.9/5.0</p>
                    </div>
                    <div className="text-green-400 text-sm font-medium">Top 1%</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">Admin Hours Saved</p>
                      <p className="text-2xl font-bold text-white">1,200 hrs</p>
                    </div>
                    <div className="text-green-400 text-sm font-medium">Year to date</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
