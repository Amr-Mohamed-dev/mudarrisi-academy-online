import { Link, useLocation } from "react-router-dom";
import { X } from "lucide-react";
import { SITE_MAP } from "@/constants";
import MainLogo from "@/assets/images/main-logo.png";
import MainLogoLight from "@/assets/images/main-logo-light.png";
import { themeStore } from "@/store";

type Props = {
    isSidebarOpen: boolean;
    onToggleSidebar: () => void;
};

const SideBar = ({ isSidebarOpen, onToggleSidebar }: Props) => {
    const location = useLocation();
    const { theme } = themeStore();

    const handleLogoClick = (e: React.MouseEvent) => {
        e.preventDefault();
        window.location.href = SITE_MAP.site.home.href;
    };

    const isActive = (path: string) => {
        return (
            location.pathname === path ||
            location.pathname.startsWith(`${path}/`)
        );
    };

    const pages = Object.entries(SITE_MAP.dashboard).map(([_, value]) => value);

    return (
        <>
            <div
                className={`side-bar ${
                    isSidebarOpen ? "open" : ""
                } flex flex-col h-screen transition-all duration-300 ease-in-out bg-white dark:bg-black-300 border-r border-gray-200 dark:border-gray-700 overflow-y-auto`}
            >
                {/* Close Sidebar button */}
                <button
                    type="button"
                    onClick={onToggleSidebar}
                    className="absolute top-0 right-0 p-2 text-gray-600 rounded-lg cursor-pointer md:hidden hover:text-gray-900  hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 dark:hover:text-gray-200 dark:hover:bg-gray-700 dark:focus:bg-gray-700 dark:focus:ring-2 dark:focus:ring-gray-700"
                >
                    <X className="w-6 h-6" />
                    <span className="sr-only">Toggle sidebar</span>
                </button>

                {/* Logo Section */}
                <div
                    className="p-6 flex justify-center cursor-pointer"
                    onClick={handleLogoClick}
                >
                    <img
                        src={
                            theme === "dark" || theme === "system"
                                ? MainLogo
                                : theme === "light" || theme === "system"
                                ? MainLogoLight
                                : MainLogo
                        }
                        alt=""
                        loading="lazy"
                    />
                </div>

                {/* Links Section */}
                <div className="py-5 w-full h-full bg-white dark:bg-black-300">
                    {/* Navigation Menu */}
                    <ul className="space-y-2 pb-10">
                        {pages?.map((route) => {
                            const path = route.links.main.href;
                            return (
                                <li key={path}>
                                    <Link
                                        to={path}
                                        className={`flex items-center justify-between py-2 ps-4 rounded-md hover:bg-primary-50 dark:hover:bg-primary-700`}
                                    >
                                        <div className="flex items-center gap-2">
                                            {route?.icon &&
                                                route?.icon({
                                                    color: isActive(path)
                                                        ? "#1576a9"
                                                        : "#625d57 ",
                                                    height: 24,
                                                    width: 24,
                                                })}

                                            <span
                                                className={`text-right
                                        ${
                                            isActive(path)
                                                ? "font-bold text-primary-500"
                                                : "text-secondary-800 dark:text-secondary-500 hover:text-gray-700"
                                        }  transition-all duration-200 ease-in-out`}
                                            >
                                                {route.title}
                                            </span>
                                        </div>

                                        {/* Active dot */}
                                        <div
                                            className={`w-0.5 h-4 rounded-full ${
                                                isActive(path)
                                                    ? "bg-primary-500"
                                                    : "bg-transparent"
                                            } transition-all duration-200 ease-in-out`}
                                        />
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default SideBar;
