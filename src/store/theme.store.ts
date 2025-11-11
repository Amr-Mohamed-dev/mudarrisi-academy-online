// store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PROJECT_NAME } from "@/constants";

export type ThemeItem = "light" | "dark" | "system";

interface ThemeStore {
    theme: ThemeItem;
    setTheme: (theme: ThemeItem) => void;
    toggleTheme: () => void;
    isDarkMode: boolean;
}

export function applyTheme(theme: ThemeItem) {
    const root = document.documentElement;

    if (theme === "system") {
        const prefersDark = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;
        root.classList.toggle("dark", prefersDark);
    } else {
        root.classList.toggle("dark", theme === "dark");
    }
}

export const themeStore = create<ThemeStore>()(
    persist(
        (set) => ({
            theme: "system",
            isDarkMode: false,
            setTheme: (theme) => {
                set({ theme });
                applyTheme(theme); // apply immediately on change
                set({ isDarkMode: theme === "dark" });
            },
            toggleTheme: () => {
                const { theme } = themeStore.getState();
                set({ theme: theme === "system" ? "light" : "system" });
                set({ isDarkMode: theme === "dark" });
            },
        }),
        { name: PROJECT_NAME + "-theme" }
    )
);

// 🟢 Apply theme immediately on first load
applyTheme(themeStore.getState().theme);

// react to system theme changes
window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
        const { theme } = themeStore.getState();
        if (theme === "system") applyTheme("system");
    });
