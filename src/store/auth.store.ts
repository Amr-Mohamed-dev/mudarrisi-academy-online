import { persist } from "zustand/middleware";
import { create } from "zustand";
import { AuthState, User } from "@/types";
import { PROJECT_NAME } from "@/constants";

export const authStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            error: null,
            isLoading: false,

            setUser: (user: User | null) => {
                set({ user });
            },
            setIsLoading: (isLoading: boolean) => {
                set({ isLoading });
            },
            setError: (error: string | null) => {
                set({ error });
            },
            setIsAuthenticated: (isAuthenticated: boolean) => {
                set({ isAuthenticated });
            },
        }),
        {
            name: PROJECT_NAME + "-auth",
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);
