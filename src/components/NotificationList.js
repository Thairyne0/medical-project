import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Bell, AlertCircle, Info, CheckCircle } from "lucide-react";
import { notifications } from "@/lib/mockData";
import { cn } from "@/lib/utils";

export function NotificationList() {
    const getIcon = (type) => {
        switch (type) {
            case "warning": return <AlertCircle className="h-5 w-5 text-amber-500" />;
            case "success": return <CheckCircle className="h-5 w-5 text-green-500" />;
            case "system": return <Info className="h-5 w-5 text-blue-500" />;
            default: return <Bell className="h-5 w-5 text-teal-500" />;
        }
    };

    return (
        <Card className="h-full border-none shadow-none bg-transparent">
            <CardHeader className="px-0 pt-0 pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                    <Bell className="h-5 w-5 text-slate-400" />
                    Notifications
                </CardTitle>
            </CardHeader>
            <CardContent className="px-0 space-y-3">
                {notifications.map((note) => (
                    <div key={note.id} className="flex gap-3 p-3 rounded-lg bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="mt-0.5">{getIcon(note.type)}</div>
                        <div className="flex-1">
                            <h4 className="text-sm font-medium text-slate-900">{note.title}</h4>
                            <p className="text-xs text-slate-500 mt-0.5">{note.message}</p>
                            <span className="text-[10px] text-slate-400 mt-1 block">{note.time}</span>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
