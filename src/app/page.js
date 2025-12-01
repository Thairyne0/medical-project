import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { User, Stethoscope } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12 space-y-4">
        <div className="inline-flex items-center justify-center bg-teal-100 p-3 rounded-2xl mb-4">
          <Stethoscope className="h-10 w-10 text-teal-600" />
        </div>
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Welcome to MediCare<span className="text-teal-600">Pro</span></h1>
        <p className="text-slate-500 text-lg max-w-md mx-auto">
          Advanced healthcare management for professionals and patients. Secure, intelligent, and efficient.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl w-full">
        <Link href="/doctor" className="group">
          <Card className="h-full hover:border-teal-500 transition-all hover:shadow-lg cursor-pointer group-hover:scale-[1.02]">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto bg-teal-50 p-4 rounded-full mb-4 group-hover:bg-teal-100 transition-colors">
                <Stethoscope className="h-8 w-8 text-teal-600" />
              </div>
              <CardTitle>Doctor Access</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-slate-500">
              Manage patients, view records, and access AI assistance.
            </CardContent>
          </Card>
        </Link>

        <Link href="/patient/1" className="group">
          <Card className="h-full hover:border-blue-500 transition-all hover:shadow-lg cursor-pointer group-hover:scale-[1.02]">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto bg-blue-50 p-4 rounded-full mb-4 group-hover:bg-blue-100 transition-colors">
                <User className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle>Patient Portal</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-slate-500">
              View your medical history, appointments, and prescriptions.
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
