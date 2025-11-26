import { SITE_MAP } from "@/constants";
import React from "react";
import { useLocation, matchPath } from "react-router-dom";

export const useTitle = (currentPathName: string) => {
    const location = useLocation();
    const documentDefined = typeof document !== "undefined";
    const originalTitle = React.useRef(documentDefined ? document.title : null);

    const findRouteTitle = (pathname: string): string | null => {
        // Helper function to recursively search through SITE_MAP
        const searchRoutes = (routes: any): string | null => {
            for (const key in routes) {
                const route = routes[key];

                // Check if this is a route object with href and name
                if (route.href && route.name) {
                    // Use matchPath to handle dynamic routes like /teachers/:id
                    const match = matchPath(route.href, pathname);
                    if (match) {
                        return route.name;
                    }
                }

                // Check if this has a links property (dashboard routes)
                if (route.links) {
                    const result = searchRoutes(route.links);
                    if (result) return result;
                }

                // Recursively search nested objects
                if (typeof route === "object" && !route.component) {
                    const result = searchRoutes(route);
                    if (result) return result;
                }
            }
            return null;
        };

        return searchRoutes(SITE_MAP);
    };

    React.useEffect(() => {
        if (!documentDefined) return;

        const routeTitle = findRouteTitle(location.pathname);
        const newTitle = routeTitle
            ? `${SITE_MAP.siteName} | ${routeTitle}`
            : SITE_MAP.siteName;

        if (document.title !== newTitle) {
            document.title = newTitle;
        }

        return () => {
            if (originalTitle.current) {
                document.title = originalTitle.current;
            }
        };
    }, [location.pathname]);
};
