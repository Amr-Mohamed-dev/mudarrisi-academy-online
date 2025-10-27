import { useEffect, useState } from "react";
import { Bell, ChevronDown, Dot, Menu, Moon, Sun } from "lucide-react";
import DefaultUser from "@/assets/images/default-user.png";
import NotificationBox from "./NotificationBox";
import { NotificationItem } from "@/types";
import ImgWithSpinner from "@/components/ui/image";
import ProfileBox from "./ProfileBox";
import { authStore } from "@/store";
import ThemeBox from "./ThemeBox";
import { themeStore } from "@/store";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/constants";

type Props = {
    onToggleSidebar: () => void;
};

const Navbar = ({ onToggleSidebar }: Props) => {
    const navigate = useNavigate();
    const { user, isLoading, isAuthenticated } = authStore();
    const { theme } = themeStore();

    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState<NotificationItem[]>([]);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isThemeOpen, setIsThemeOpen] = useState(false);

    const handleNotifications = () => {
        setShowNotifications(!showNotifications);
        setIsProfileOpen(false);
        setIsThemeOpen(false);
    };

    const toggleProfileMenu = () => {
        setIsProfileOpen(!isProfileOpen);
        setIsThemeOpen(false);
        setShowNotifications(false);
    };

    const toggleThemeMenu = () => {
        setIsThemeOpen(!isThemeOpen);
        setIsProfileOpen(false);
        setShowNotifications(false);
    };

    const handleLoginButton = () => {
        navigate(PATHS.auth.login.href);
    };

    useEffect(() => {
        setNotifications([]);
    }, []);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (
                !target.closest("#notification-dropdown") &&
                !target.closest("#notification-button") &&
                showNotifications
            ) {
                setShowNotifications(false);
            }

            if (
                !target.closest("#profile-dropdown") &&
                !target.closest("#user-menu-button") &&
                isProfileOpen
            ) {
                setIsProfileOpen(false);
            }

            if (
                !target.closest("#theme-dropdown") &&
                !target.closest("#theme-button") &&
                isThemeOpen
            ) {
                setIsThemeOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showNotifications, isProfileOpen, isThemeOpen]);

    return (
        <nav className="py-2.5 w-full top-0 border-b border-gray-200 dark:border-gray-700 flex justify-between z-50">
            {/* Left side - Greeting */}
            <div className="flex justify-start items-center w-1/3">
                {/* Sidebar toggle button */}
                {window.location.pathname !== "/" && (
                    <button
                        type="button"
                        onClick={onToggleSidebar}
                        className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 dark:hover:text-gray-200 dark:hover:bg-gray-700 dark:focus:bg-gray-700 dark:focus:ring-2 dark:focus:ring-gray-700"
                    >
                        <Menu className="w-6 h-6" />
                        <span className="sr-only">Toggle sidebar</span>
                    </button>
                )}
                <h1 className="text-xl font-medium dark:text-secondary-500">
                    Hello, {user?.name || "there"}!
                </h1>
            </div>
            {/* Right side - Notifications and Profile */}
            <div className="flex items-center space-x-4 px-5">
                {/* Theme Drop menu */}
                <div className="relative">
                    <button
                        type="button"
                        onClick={toggleThemeMenu}
                        className="flex items-center space-x-2 hover:opacity-80 transition-all duration-300 ease-in-out"
                    >
                        {theme === "dark" ? (
                            <Moon className="w-5 h-5 text-black-200 dark:text-secondary-500" />
                        ) : theme === "light" ? (
                            <Sun className="w-5 h-5 text-black-200 dark:text-secondary-500" />
                        ) : (
                            <Dot className="w-5 h-5 text-black-200 dark:text-secondary-500" />
                        )}
                        <h1 className="dark:text-secondary-500">Theme</h1>
                        <ChevronDown className="w-5 h-5 text-black-200 dark:text-secondary-500" />
                    </button>

                    {isThemeOpen && <ThemeBox onClose={toggleThemeMenu} />}
                </div>

                {isAuthenticated ? (
                    <>
                        {/* Notifications */}
                        <div className="relative w-8 h-8 rounded-full bg-transparent border border-black-50 dark:border-gray-700 hover:opacity-80 transition-all duration-300 ease-in-out">
                            <button
                                id="notification-button"
                                type="button"
                                onClick={handleNotifications}
                                className="p-1 relative"
                            >
                                <Bell className="w-5 h-5 text-black-200 dark:text-secondary-500" />
                                {notifications.length > 0 && (
                                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-2 w-2 flex items-center justify-center" />
                                )}
                            </button>

                            {showNotifications && (
                                <NotificationBox
                                    notifications={notifications}
                                />
                            )}
                        </div>
                        {/* Profile Toggle Button */}
                        <div className="relative">
                            <button
                                onClick={toggleProfileMenu}
                                type="button"
                                className="h-10 w-10 rounded-full overflow-hidden flex items-center justify-center"
                                id="user-menu-button"
                            >
                                <span className="sr-only">Open user menu</span>
                                <ImgWithSpinner
                                    src={user?.image as string}
                                    fallbackSrc={DefaultUser}
                                    alt="user photo"
                                    isLoading={isLoading}
                                    rounded
                                />
                            </button>

                            {/* Dropdown profile */}
                            {isProfileOpen && <ProfileBox />}
                        </div>
                    </>
                ) : (
                    <div>
                        <button
                            type="button"
                            onClick={handleLoginButton}
                            className="p-2 mr-2 text-gray-600 dark:text-secondary-500 hover:opacity-80 rounded-lg cursor-pointer transition-all duration-300 ease-in-out"
                        >
                            Login
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
