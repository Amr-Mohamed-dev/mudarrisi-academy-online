import { PROJECT_NAME } from "@/constants";
import { User } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface authStore {
    user: User | null;
    setUser: (user: User | null) => void;
    isAuthenticated: boolean;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const authStore = create<authStore>()(
    persist(
        (set) => ({
            user: null,
            setUser: (user) => set({ user }),
            isAuthenticated: false,
            setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
        }),
        { name: PROJECT_NAME + "-user" }
    )
);
