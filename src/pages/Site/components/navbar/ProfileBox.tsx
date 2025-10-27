import { authStore } from "@/store";
import { useAuthServices } from "@/services";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/constants";

function ProfileBox() {
    const { isLoading } = authStore();
    const { logout } = useAuthServices();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
    };

    const handleNavigateDashboard = () => {
        navigate(PATHS.dashboard.overview.links.main.href);
    };

    const handleNavigateProfile = () => {
        navigate(PATHS.site.profile.href);
    };

    const handleNavigateHome = () => {
        navigate(PATHS.site.home.href);
    };

    return (
        <div
            id="user-menu-button"
            className="absolute top-10 left-0 z-50 my-4 w-56 text-base list-none bg-white dark:bg-black-300 border border-gray-200 dark:border-gray-700 rounded divide-y divide-gray-100 dark:divide-gray-700 shadow xl:rounded-xl"
        >
            <ul
                className="text-gray-700 dark:text-secondary-500"
                aria-labelledby="dropdown"
            >
                {window.location.pathname !== "/" && (
                    <li>
                        <button
                            type="button"
                            onClick={handleNavigateHome}
                            className="block py-2 px-4 w-full text-left text-sm border-b hover:rounded-t-xl border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-secondary-800"
                        >
                            Home
                        </button>
                    </li>
                )}
                <li>
                    <button
                        type="button"
                        onClick={handleNavigateProfile}
                        className="block py-2 px-4 w-full text-left text-sm border-b hover:rounded-t-xl border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-secondary-800"
                    >
                        Profile
                    </button>
                </li>
                <li>
                    <button
                        type="button"
                        onClick={handleNavigateDashboard}
                        className="block py-2 px-4 w-full text-left text-sm border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-secondary-800 "
                    >
                        Dashboard
                    </button>
                </li>
                <li>
                    <button
                        type="button"
                        onClick={handleLogout}
                        disabled={isLoading}
                        className="block py-2 px-4 w-full text-left text-sm hover:bg-gray-100 hover:rounded-b-xl dark:hover:bg-secondary-800 "
                    >
                        {isLoading ? "Signing out..." : "Sign out"}
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default ProfileBox;
