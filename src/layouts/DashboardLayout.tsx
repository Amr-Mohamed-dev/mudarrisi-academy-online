import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useTitle } from "@/hooks/useTitle";
import Navbar from "@/pages/Site/components/navbar";

export const DashboardLayout = () => {
  const currentPathName = window.location.pathname.split("/")[2];
  useTitle(currentPathName);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      // Check if screen is large (typically desktop/laptop)
      const isLargeScreen = window.innerWidth >= 1024; // 1024px is a common breakpoint for desktop

      if (isLargeScreen) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    // Set initial state based on screen size
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="antialiased flex justify-between items-center dark:bg-black-500">
      {/* Main content area */}
      <main className="w-full mx-auto pt-[2vh] h-screen flex justify-center items-center">
        <div className="w-full h-full antialiased  flex flex-col justify-start items-center relative overflow-y-auto">
          {/* Navbar */}
          {/* <Navbar onToggleSidebar={toggleSidebar} /> */}
          <Navbar />
          <Outlet />
        </div>
      </main>
    </div>
  );
};
