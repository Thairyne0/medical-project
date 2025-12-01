import { MarketingNavbar } from "@/components/marketing/MarketingNavbar";
import { Footer } from "@/components/marketing/Footer";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent } from "@/components/ui/Card";
import { Mail, MapPin, Phone } from "lucide-react";

export const metadata = {
    title: "Contact Us - MediCarePro",
    description: "Get in touch with our sales team.",
};

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <MarketingNavbar />

            <main className="pt-32 pb-24">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h1 className="text-4xl lg:text-5xl font-bold mb-6">Get in Touch</h1>
                        <p className="text-xl text-slate-500">
                            Ready to transform your healthcare institution? Our team is here to help.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
                        {/* Contact Form */}
                        <Card className="shadow-xl border-slate-200">
                            <CardContent className="p-8">
                                <form className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-700">First Name</label>
                                            <Input placeholder="John" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-700">Last Name</label>
                                            <Input placeholder="Doe" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700">Email</label>
                                        <Input type="email" placeholder="john@hospital.com" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700">Organization</label>
                                        <Input placeholder="City General Hospital" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700">Message</label>
                                        <textarea
                                            className="flex min-h-[120px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            placeholder="Tell us about your needs..."
                                        />
                                    </div>
                                    <Button size="lg" className="w-full">Send Message</Button>
                                </form>
                            </CardContent>
                        </Card>

                        {/* Contact Info */}
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-4">
                                        <MapPin className="h-6 w-6 text-teal-600 mt-1" />
                                        <div>
                                            <p className="font-medium text-slate-900">Headquarters</p>
                                            <p className="text-slate-500">123 Innovation Drive<br />Tech Valley, CA 94025</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Phone className="h-6 w-6 text-teal-600" />
                                        <div>
                                            <p className="font-medium text-slate-900">Phone</p>
                                            <p className="text-slate-500">+1 (555) 123-4567</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Mail className="h-6 w-6 text-teal-600" />
                                        <div>
                                            <p className="font-medium text-slate-900">Email</p>
                                            <p className="text-slate-500">sales@medicarepro.com</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-200 h-64 rounded-2xl flex items-center justify-center text-slate-500">
                                Map Placeholder
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
