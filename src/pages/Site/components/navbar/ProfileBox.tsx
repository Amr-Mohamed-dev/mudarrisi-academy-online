import { useNavigate } from "react-router-dom";
import { SITE_MAP } from "@/constants";
import { useAuthServices } from "@/services/auth";
import { useToast } from "@/hooks/useToast";
import { authStore } from "@/store";

function ProfileBox() {
    const { user } = authStore();
    const { addToast } = useToast();
    const { logout } = useAuthServices();
    const { mutateAsync: logoutMutation, isPending: isPendingLogout } =
        logout();
    const navigate = useNavigate();
    const handleLogout = () => {
        logoutMutation(undefined, {
            onSuccess: () => {
                addToast({
                    title: "تم تسجيل الخروج",
                    message: "تم تسجيل الخروج بنجاح",
                    type: "success",
                });
                navigate(SITE_MAP.site.home.href);
            },
            onError: () => {
                addToast({
                    title: "حدث خطأ",
                    message: "حدث خطأ",
                    type: "error",
                });
            },
        });
    };

    const handleNavigateDashboard = () => {
        navigate(SITE_MAP.dashboard.overview.links.main.href);
    };

    const handleNavigateProfile = () => {
        navigate(SITE_MAP.site.studentProfile.href);
    };

    const handleNavigateHome = () => {
        navigate(SITE_MAP.site.home.href);
    };

    return (
        <div
            id="user-menu-button"
            className="absolute top-10 left-0 z-50 my-4 w-56 text-base list-none bg-white  dark:bg-gray-900 border border-gray-200 dark:border-gray-500 rounded divide-y divide-gray-100 dark:divide-gray-500 shadow xl:rounded-xl"
        >
            <ul
                className="text-gray-700 dark:text-gray-200 "
                aria-labelledby="dropdown"
            >
                {window.location.pathname !== "/" && (
                    <li>
                        <button
                            type="button"
                            onClick={handleNavigateHome}
                            className="block py-2 px-4 w-full text-right text-sm border-b hover:rounded-t-xl border-gray-200 dark:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-600"
                        >
                            الرئيسية
                        </button>
                    </li>
                )}
                <li>
                    <button
                        type="button"
                        onClick={handleNavigateProfile}
                        className="block py-2 px-4 w-full text-right text-sm border-b hover:rounded-t-xl border-gray-200 dark:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                        الملف الشخصي
                    </button>
                </li>
                {user?.role === "admin" ||
                    (user?.role === "teacher" && (
                        <li>
                            <button
                                type="button"
                                onClick={handleNavigateDashboard}
                                className="block py-2 px-4 w-full text-right text-sm border-b border-gray-200 dark:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-600 "
                            >
                                لوحة التحكم
                            </button>
                        </li>
                    ))}
                <li>
                    <button
                        type="button"
                        onClick={handleLogout}
                        disabled={isPendingLogout}
                        className="block py-2 px-4 w-full text-right text-sm hover:bg-gray-100 hover:rounded-b-xl dark:hover:bg-gray-600 dark:border-gray-500"
                    >
                        {isPendingLogout
                            ? "جاري تسجيل الخروج..."
                            : "تسجيل الخروج"}
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default ProfileBox;
