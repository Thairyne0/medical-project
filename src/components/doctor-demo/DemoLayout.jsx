"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Sparkles, LucideIcon } from 'lucide-react';
import Link from 'next/link';
/**
 * Demo Layout Component
 * Provides consistent layout for doctor demo with tabs and demo indicator
 */
export function DemoLayout({ children, activeTab, onTabChange, tabs }) {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-white border-b border-slate-200">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                            <Link href="/">
                                <Button variant="ghost" size="icon">
                                    <ArrowLeft className="h-5 w-5" />
                                </Button>
                            </Link>
                            <div>
                                <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                                    <Sparkles className="h-6 w-6 text-teal-600" />
                                    Doctor Demo - AI Clinical Suite
                                </h1>
                                <p className="text-sm text-slate-500">
                                    Esplora le funzionalità AI per la gestione clinica
                                </p>
                            </div>
                        </div>

                        {/* Demo Badge */}
                        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-teal-50 border border-teal-200 rounded-lg">
                            <div className="w-2 h-2 bg-teal-600 rounded-full animate-pulse" />
                            <span className="text-sm font-medium text-teal-700">Modalità Demo</span>
                        </div>
                    </div>

                    {/* Tab Navigation */}
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => onTabChange(tab.id)}
                                className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${activeTab === tab.id
                                    ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/20'
                                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                                    }`}
                            >
                                <tab.icon className="h-5 w-5" />
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="container mx-auto px-4 py-8">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {children}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
