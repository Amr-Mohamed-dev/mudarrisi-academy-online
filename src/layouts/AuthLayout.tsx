import { useTitle } from "@/hooks/useTitle";
import { Outlet } from "react-router-dom";

function AuthLayout() {
    const currentPathName = window.location.pathname.split("/")[1];
    useTitle(currentPathName);

    return (
        <div className="flex items-center justify-between h-screen w-full">
            <div
                className={`relative h-full w-full flex flex-col gap-20 px-20 py-10 overflow-y-auto`}
            >
                <Outlet />
            </div>
        </div>
    );
}

export default AuthLayout;
