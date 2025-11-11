import { Route, Routes } from "react-router-dom";
import { SITE_MAP } from "../constants";

// Layouts
import MainLayout from "@/layouts/MainLayout";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import SiteLayout from "@/layouts/SiteLayout";
import { JSX } from "react";
import { RouteLinkDynamic, RouteSection } from "@/types";
import AuthLayout from "@/layouts/AuthLayout";

function AppRoutes() {
    const dashboardPages = Object.entries(SITE_MAP.dashboard).map(
        ([_, value]) => value
    );
    const sitePages = Object.entries(SITE_MAP.site).map(([_, value]) => value);
    const authPages = Object.entries(SITE_MAP.auth).map(([_, value]) => value);

    // Recursive renderer for dashboard + nested subRoutes
    const renderRouteSection = (section: RouteSection): JSX.Element[] => {
        const routes: JSX.Element[] = [];

        // Render CRUD links
        if (section.links) {
            Object.values(section.links).forEach(
                (link: RouteLinkDynamic<any>) => {
                    if (!link?.href || !link?.component) return;
                    routes.push(
                        <Route
                            key={link.href}
                            path={link.href}
                            element={link.component}
                        />
                    );
                }
            );
        }

        // Recursively render subRoutes
        if (section.subRoutes) {
            Object.values(section.subRoutes).forEach((sub: RouteSection) => {
                routes.push(...renderRouteSection(sub));
            });
        }

        return routes;
    };
    return (
        <Routes>
            <Route element={<MainLayout />}>
                {/* Auth Routes */}
                <Route element={<AuthLayout />}>
                    {authPages.map((page) => {
                        return (
                            <Route
                                key={page.name}
                                path={page.href}
                                element={page.component}
                            />
                        );
                    })}
                </Route>

                {/* Dashboard Routes */}
                <Route element={<DashboardLayout />}>
                    {dashboardPages.flatMap((section) =>
                        renderRouteSection(section)
                    )}
                </Route>

                {/* Site Routes */}
                <Route element={<SiteLayout />}>
                    {sitePages.map((page) => {
                        return (
                            <Route
                                key={page.name}
                                path={page.href}
                                element={page.component}
                            />
                        );
                    })}
                </Route>

                {/* Catch-All for Undefined Routes */}
                <Route
                    path={SITE_MAP.notFound.href}
                    element={SITE_MAP.notFound.component}
                />
            </Route>
        </Routes>
    );
}

export default AppRoutes;
