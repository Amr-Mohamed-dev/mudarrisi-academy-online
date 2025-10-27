import { useEffect } from "react";
import { authStore } from "@/store";
import { removeToken } from "@/utils";
import { useAuthServices } from "@/services";
import { PROJECT_NAME } from "@/constants";

let isLoggingOut = false;

export const useAuthStateListener = () => {
    const { isLoading } = authStore();
    const { logout } = useAuthServices();

    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (
                e.key === PROJECT_NAME + "-auth" &&
                e.newValue === "logged_out"
            ) {
                if (isLoggingOut) return;
                isLoggingOut = true;

                localStorage.removeItem(PROJECT_NAME + "-auth");
                removeToken();
                logout();
            }
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, [logout]);

    return { isLoading };
};
