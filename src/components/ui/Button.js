import { cn } from "@/lib/utils";

export function Button({ className, variant = "primary", size = "md", children, ...props }) {
    const variants = {
        primary: "bg-teal-600 text-white hover:bg-teal-700 shadow-md shadow-teal-600/20",
        secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
        outline: "border border-slate-200 bg-transparent hover:bg-slate-50 text-slate-700",
        ghost: "bg-transparent hover:bg-slate-100 text-slate-700",
        danger: "bg-red-500 text-white hover:bg-red-600 shadow-md shadow-red-500/20",
    };

    const sizes = {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4 py-2 text-sm",
        lg: "h-12 px-6 text-base",
        icon: "h-10 w-10 p-2 flex items-center justify-center",
    };

    return (
        <button
            className={cn(
                "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 disabled:pointer-events-none disabled:opacity-50",
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}
