import { ReactNode } from "react";
import { ToastProvider } from "./ToastProvider";
import QueryProvider from "./QueryProvider";
import { TooltipProvider } from "@/components/ui/tooltip";

function Providers({ children }: { children: ReactNode }) {
    return (
        <TooltipProvider>
            <ToastProvider maxToasts={5}>
                <QueryProvider>{children}</QueryProvider>
            </ToastProvider>
        </TooltipProvider>
    );
}

export default Providers;
