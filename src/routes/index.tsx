import { Route, Routes } from "react-router-dom";
import { PATHS } from "../constants";

// Layouts
import MainLayout from "@/layouts/MainLayout";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import SiteLayout from "@/layouts/SiteLayout";
import { JSX } from "react";
import { RouteLinkDynamic, RouteSection } from "@/types";

function AppRoutes() {
    const dashboardPages = Object.entries(PATHS.dashboard).map(
        ([_, value]) => value
    );
    const sitePages = Object.entries(PATHS.site).map(([_, value]) => value);

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
                    path={PATHS.notFound.href}
                    element={PATHS.notFound.component}
                />
            </Route>
        </Routes>
    );
}

export default AppRoutes;
