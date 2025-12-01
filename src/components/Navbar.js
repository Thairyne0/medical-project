import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Stethoscope, MessageSquare, LogOut } from "lucide-react";

export function Navbar() {
    return (
        <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <div className="bg-teal-600 p-1.5 rounded-lg">
                        <Stethoscope className="h-6 w-6 text-white" />
                    </div>
                    <span className="font-bold text-xl text-slate-900 tracking-tight">MediCare<span className="text-teal-600">Pro</span></span>
                </Link>

                <div className="flex items-center gap-4">
                    <Link href="/doctor">
                        <Button variant="ghost" size="sm">Dashboard</Button>
                    </Link>
                    <Link href="/ai-chat">
                        <Button variant="primary" size="sm" className="gap-2">
                            <MessageSquare className="h-4 w-4" />
                            Text to AI
                        </Button>
                    </Link>
                    <Button variant="ghost" size="icon" className="text-slate-500 hover:text-red-500">
                        <LogOut className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </nav>
    );
}
