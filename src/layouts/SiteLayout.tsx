import { ArrowLeft } from "lucide-react";
import { Outlet, useNavigate } from "react-router";
import { useTitle } from "@/hooks/useTitle";
import Footer from "@/components/Footer";
import Navbar from "@/pages/Site/components/navbar";

function SiteLayout() {
    const currentBackName = window.location.pathname.split("/")[1];
    useTitle(window.location.pathname === "/" ? "Home" : currentBackName);
    const navigate = useNavigate();

    const shouldShowNav =
        window.location.pathname === "/" ||
        window.location.pathname.includes("/matches") ||
        window.location.pathname.includes("/services") ||
        window.location.pathname === "/leads";

    return (
        <main className="antialiased w-full mx-auto h-screen flex flex-col justify-start items-center dark:bg-black-500">
            <div className="relative flex-1 w-full h-full antialiased overflow-y-auto">
                {/* Navbar */}
                {shouldShowNav ? (
                    <Navbar />
                ) : (
                    <div className="w-full px-50 pt-10 flex justify-start items-center cursor-pointer">
                        <button
                            className="relative flex justify-start items-center gap-5 z-50"
                            onClick={() => navigate(-1)}
                        >
                            <ArrowLeft className="text-secondary-50" />
                            <p className="text-secondary-50 capitalize">
                                {currentBackName}
                            </p>
                        </button>
                    </div>
                )}
                <main className="flex-1 w-full">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </main>
    );
}

export default SiteLayout;
