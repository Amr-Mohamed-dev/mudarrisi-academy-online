import { Outlet } from "react-router-dom";

function MainLayout() {
    return (
        <div className="w-full h-full dark:bg-black-500">
            <Outlet />
        </div>
    );
}

export default MainLayout;
