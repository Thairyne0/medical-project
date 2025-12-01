import Link from "next/link";
import { Stethoscope, Twitter, Linkedin, Facebook, Instagram } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300 py-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="bg-teal-600 p-1.5 rounded-lg">
                                <Stethoscope className="h-6 w-6 text-white" />
                            </div>
                            <span className="font-bold text-xl text-white tracking-tight">
                                MediCare<span className="text-teal-500">Pro</span>
                            </span>
                        </Link>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Empowering healthcare providers with advanced AI analytics and process automation.
                            Better data, better care.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <Link href="#" className="hover:text-teal-500 transition-colors"><Twitter className="h-5 w-5" /></Link>
                            <Link href="#" className="hover:text-teal-500 transition-colors"><Linkedin className="h-5 w-5" /></Link>
                            <Link href="#" className="hover:text-teal-500 transition-colors"><Facebook className="h-5 w-5" /></Link>
                            <Link href="#" className="hover:text-teal-500 transition-colors"><Instagram className="h-5 w-5" /></Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-6">Products</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/products#datahub" className="hover:text-teal-500 transition-colors">DataHub</Link></li>
                            <li><Link href="/products#predictive" className="hover:text-teal-500 transition-colors">PredictiveAI</Link></li>
                            <li><Link href="/products#processbot" className="hover:text-teal-500 transition-colors">ProcessBot</Link></li>
                            <li><Link href="/products#insights" className="hover:text-teal-500 transition-colors">Insights</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-6">Company</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/about" className="hover:text-teal-500 transition-colors">About Us</Link></li>
                            <li><Link href="/careers" className="hover:text-teal-500 transition-colors">Careers</Link></li>
                            <li><Link href="/blog" className="hover:text-teal-500 transition-colors">Blog</Link></li>
                            <li><Link href="/contact" className="hover:text-teal-500 transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-6">Legal</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/privacy" className="hover:text-teal-500 transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-teal-500 transition-colors">Terms of Service</Link></li>
                            <li><Link href="/security" className="hover:text-teal-500 transition-colors">Security</Link></li>
                            <li><Link href="/gdpr" className="hover:text-teal-500 transition-colors">GDPR Compliance</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
                    <p>&copy; {new Date().getFullYear()} MediCarePro Inc. All rights reserved.</p>
                    <p>Designed for the future of healthcare.</p>
                </div>
            </div>
        </footer>
    );
}
