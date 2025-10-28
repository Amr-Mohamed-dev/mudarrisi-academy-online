import { useEffect, useState } from "react";
import { ChevronDown, Dot, Moon, Sun } from "lucide-react";
import ThemeBox from "./ThemeBox";
import { themeStore } from "@/store";
import { Link, useNavigate } from "react-router-dom";
import { PATHS } from "@/constants";

const Navbar = () => {
    const links = [
        {
            href: PATHS.site.home.href,
            label: "الرئيسية",
        },
        {
            href: PATHS.site.teachers.href,
            label: "المدرسين",
        },
        {
            href: PATHS.site.subjects.href,
            label: "المواد",
        },
        {
            href: PATHS.site.about.href,
            label: "من نحن",
        },
    ];
    const navigate = useNavigate();
    const { theme } = themeStore();
    const [activeLink, setActiveLink] = useState("/");
    const [isThemeOpen, setIsThemeOpen] = useState(false);

    const toggleThemeMenu = () => {
        setIsThemeOpen(!isThemeOpen);
    };

    const handleLoginButton = () => {
        navigate(PATHS.auth.auth.href);
    };

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;

            if (!target.closest("#theme-button") && isThemeOpen) {
                setIsThemeOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isThemeOpen]);

    useEffect(() => {
        setActiveLink(window.location.pathname);
    }, [window.location.pathname]);

    const isActiveLink = (link: string) => {
        return activeLink === link;
    };

    return (
        <div className="w-full absolute top-0 pt-3 z-50 px-50">
            <div className="w-full flex justify-between">
                {/* Left side - Logo */}
                <div className="flex justify-start items-center w-1/3">
                    {/* Add logo or branding here if needed */}
                </div>

                {/* Right side - Notifications and Profile */}
                <div className="flex items-center space-x-10">
                    {/* Links */}
                    <div className="flex items-center space-x-10">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                to={link.href}
                                className={`capitalize hover:opacity-80 transition-all duration-300 ease-in-out relative ${
                                    isActiveLink(link.href)
                                        ? "text-primary-200"
                                        : "dark:text-secondary-200"
                                }`}
                            >
                                {link.label}
                                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-0.5 overflow-hidden">
                                    <span
                                        className="block w-full h-full"
                                        style={{
                                            height: "2px",
                                            background:
                                                "linear-gradient(90deg, transparent 0%, #017EA1 50%, #017EA1 50%, transparent 100%)",
                                            opacity: isActiveLink(link.href)
                                                ? 1
                                                : 0,
                                            transition:
                                                "opacity 0.3s ease-in-out",
                                            transform: "scaleY(0.75)",
                                        }}
                                    />
                                </span>
                            </Link>
                        ))}
                    </div>

                    {/* Theme Drop menu */}
                    <div className="relative">
                        <button
                            type="button"
                            onClick={toggleThemeMenu}
                            className="flex items-center space-x-2 hover:opacity-80 transition-all duration-300 ease-in-out"
                        >
                            {theme === "dark" ? (
                                <Moon className="w-5 h-5 text-black-200 dark:text-secondary-200" />
                            ) : theme === "light" ? (
                                <Sun className="w-5 h-5 text-black-200 dark:text-secondary-200" />
                            ) : (
                                <Dot className="w-5 h-5 text-black-200 dark:text-secondary-200" />
                            )}
                            <h1 className="dark:text-secondary-200">Theme</h1>
                            <ChevronDown className="w-5 h-5 text-black-200 dark:text-secondary-200" />
                        </button>

                        {isThemeOpen && <ThemeBox onClose={toggleThemeMenu} />}
                    </div>

                    {/* Login Button */}
                    <div>
                        <button
                            type="button"
                            onClick={handleLoginButton}
                            className="text-gray-600 dark:text-secondary-200 hover:opacity-80 rounded-lg cursor-pointer transition-all duration-300 ease-in-out"
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
