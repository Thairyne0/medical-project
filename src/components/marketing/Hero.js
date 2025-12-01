"use client";

import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Activity, ShieldCheck, Zap } from "lucide-react";

export function Hero() {
    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gradient-to-b from-slate-50 to-white">
            {/* Background Shapes */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-teal-100/50 blur-3xl" />
                <div className="absolute top-[20%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-100/50 blur-3xl" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-sm font-medium mb-6">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                            </span>
                            Revolutionizing Healthcare Analytics
                        </span>
                        <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 tracking-tight mb-6 leading-[1.1]">
                            AI for Modern <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">
                                Healthcare
                            </span>
                        </h1>
                        <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
                            Empower your medical institution with predictive analytics, clinical NLP, and automated workflows.
                            Trustworthy AI for better patient outcomes.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/login">
                                <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-xl shadow-teal-600/20">
                                    Book a Demo <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/products">
                                <Button variant="outline" size="lg" className="h-14 px-8 text-lg rounded-full bg-white/50 backdrop-blur-sm">
                                    Explore Products
                                </Button>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Floating Cards Animation */}
                    <div className="mt-20 relative h-64 hidden md:block">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="absolute left-[10%] top-0 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4 w-64"
                        >
                            <div className="bg-blue-100 p-3 rounded-xl">
                                <Activity className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 font-medium uppercase">Predictive AI</p>
                                <p className="font-bold text-slate-900">Risk Analysis: Low</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="absolute left-[50%] -translate-x-1/2 top-10 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4 w-64 z-20"
                        >
                            <div className="bg-teal-100 p-3 rounded-xl">
                                <ShieldCheck className="h-6 w-6 text-teal-600" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 font-medium uppercase">DataHub</p>
                                <p className="font-bold text-slate-900">GDPR Compliant</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7, duration: 0.8 }}
                            className="absolute right-[10%] top-0 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4 w-64"
                        >
                            <div className="bg-purple-100 p-3 rounded-xl">
                                <Zap className="h-6 w-6 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 font-medium uppercase">ProcessBot</p>
                                <p className="font-bold text-slate-900">Efficiency +45%</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
