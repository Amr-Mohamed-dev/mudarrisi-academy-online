import { useContext } from "react";
import { ToastContextValue } from "@/types";
import { ToastContext } from "@/providers/ToastProvider";

export const useToast = (): ToastContextValue => {
    const context = useContext(ToastContext);
    if (context === undefined) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
};
