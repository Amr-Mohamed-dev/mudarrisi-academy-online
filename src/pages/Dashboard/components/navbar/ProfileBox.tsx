import { authStore } from "@/store";
import { useAuthServices } from "@/services";

function ProfileBox() {
    const { user, isLoading } = authStore();
    const { logout } = useAuthServices();
    const handleLogout = () => {
        logout();
    };

    return (
        <div
            className="absolute top-10 right-0 z-50 my-4 w-56 text-base list-none bg-white dark:bg-black-300 border border-gray-200 dark:border-gray-700 rounded divide-y divide-gray-100 dark:divide-gray-700 shadow xl:rounded-xl"
            id="profile-dropdown"
        >
            <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-2">
                    <div className="h-8 w-8 rounded-full bg-primary-100 dark:bg-secondary-500 flex items-center justify-center text-primary-600 dark:text-secondary-900 mr-2 flex-shrink-0">
                        <span className="text-sm font-bold">
                            {user?.name?.charAt(0).toUpperCase()}
                        </span>
                    </div>
                    <div className="min-w-0 flex-1 text-left">
                        <span className="block text-sm font-semibold text-gray-900 dark:text-secondary-500 truncate">
                            {user?.name}
                        </span>
                        <span className="block text-xs text-gray-500 dark:text-secondary-500 truncate">
                            {user?.email}
                        </span>
                    </div>
                </div>
            </div>
            <ul
                className="text-gray-700 dark:text-secondary-500"
                aria-labelledby="dropdown"
            >
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
