import { Button } from "@/components/ui/button";
import { PATHS } from "@/constants";
import { useNavigate } from "react-router-dom";

function UnauthorizedPage() {
    const navigate = useNavigate();

    return (
        <div className="w-full h-full flex flex-col items-center justify-center dark:bg-gray-800 bg-white px-4">
            <div className="text-center max-w-md mx-auto p-8 rounded-lg shadow-md">
                <div className="mb-6">
                    <svg
                        className="w-16 h-16 mx-auto text-red-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2 dark:text-white">
                    Unauthorized Access
                </h1>
                <p className="text-gray-600 mb-6 dark:text-white">
                    You don't have permission to access this page. Please
                    contact your administrator if you believe this is an error.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center dark:text-white">
                    <Button
                        onClick={() => navigate(PATHS.site.home.href)}
                        variant="outline"
                        className="w-full sm:w-auto"
                    >
                        Go Home
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default UnauthorizedPage;
