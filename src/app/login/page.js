"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Stethoscope, Lock } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (email === "medico@gmail.com") {
      router.push("/doctor");
    } else if (email === "paziente@gmail.com") {
      router.push("/patient-dashboard");
    } else {
      setError("Invalid email. Use medico@gmail.com or paziente@gmail.com");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8 space-y-2">
        <div className="inline-flex items-center justify-center bg-teal-600 p-3 rounded-2xl mb-4 shadow-lg shadow-teal-600/20">
          <Stethoscope className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">MediCare<span className="text-teal-600">Pro</span></h1>
        <p className="text-slate-500">Secure Access Portal</p>
      </div>

      <Card className="w-full max-w-md shadow-xl border-slate-200">
        <CardHeader className="space-y-1 text-center pb-2">
          <CardTitle className="text-xl">Sign in to your account</CardTitle>
          <p className="text-sm text-slate-500">Enter your email to access the portal</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <Input
                  type="email"
                  placeholder="name@example.com"
                  className="pl-9"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
            </div>
            <Button type="submit" className="w-full" size="lg">
              Sign In
            </Button>
            <div className="text-center text-xs text-slate-400 mt-4">
              <p>Demo Credentials:</p>
              <p>Doctor: medico@gmail.com</p>
              <p>Patient: paziente@gmail.com</p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
