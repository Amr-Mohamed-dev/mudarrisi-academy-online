import { ReactNode } from "react";
import { ToastProvider } from "./ToastProvider";
import QueryProvider from "./QueryProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster as Sonner } from "@/components/ui/sonner";

function Providers({ children }: { children: ReactNode }) {
    return (
        <TooltipProvider>
            <Sonner />

            <ToastProvider maxToasts={5}>
                <QueryProvider>{children}</QueryProvider>
            </ToastProvider>
        </TooltipProvider>
    );
}

export default Providers;
