import { ThemeItem, themeStore } from "@/store";
import { Dot, Moon, Sun } from "lucide-react";
import { JSX } from "react";

type Props = { onClose: () => void };

function ThemeBox({ onClose }: Props) {
    const { theme, setTheme } = themeStore();

    const options: { key: ThemeItem; label: string; icon: JSX.Element }[] = [
        {
            key: "light",
            label: "Light",
            icon: <Sun className="w-5 h-5 dark:text-secondary-500" />,
        },
        {
            key: "dark",
            label: "Dark",
            icon: <Moon className="w-5 h-5 dark:text-secondary-500" />,
        },
        {
            key: "system",
            label: "System",
            icon: <Dot className="w-5 h-5 dark:text-secondary-500" />,
        },
    ];

    return (
        <div
            id="theme-button"
            className="absolute top-10 right-0 z-50 w-40 bg-white dark:bg-black-300 rounded-xl shadow"
        >
            {options
                .filter((opt) => opt.key !== theme)
                .map((opt) => (
                    <button
                        key={opt.key}
                        className="flex w-full items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-secondary-800 transition-all duration-300 ease-in-out"
                        onClick={() => {
                            setTheme(opt.key);
                            onClose();
                        }}
                    >
                        {opt.icon}
                        <span className="dark:text-secondary-500">
                            {opt.label}
                        </span>
                    </button>
                ))}
        </div>
    );
}

export default ThemeBox;
