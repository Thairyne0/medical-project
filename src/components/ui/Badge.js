import { cn } from "@/lib/utils";

export function Badge({ className, variant = "default", children, ...props }) {
    const variants = {
        default: "border-transparent bg-teal-600 text-white hover:bg-teal-700",
        secondary: "border-transparent bg-slate-100 text-slate-900 hover:bg-slate-200",
        destructive: "border-transparent bg-red-500 text-white hover:bg-red-600",
        outline: "text-slate-950 border-slate-200",
    };

    return (
        <div
            className={cn(
                "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2",
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
