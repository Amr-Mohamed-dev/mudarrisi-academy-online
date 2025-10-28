import { ReactNode } from "react";

export * from "./toast.types";
export * from "./user.types";
export * from "./notifications.types";

export type BuildFn<T extends Record<string, string>> = (params: T) => string;

export interface RouteLinkDynamic<T extends Record<string, string>> {
    href: string;
    build: BuildFn<T>;
    name: string;
    component: ReactNode;
    roles?: string[];
}

export interface RouteLinkStatic<T extends Record<string, string>> {
    href: string;
    build?: BuildFn<T>;
    name: string;
    component: ReactNode;
    roles?: string[];
}

// ================== RECURSIVE STRUCTURE ==================

export interface RouteSection {
    title?: string;

    /** main CRUD links */
    links: {
        [key: string]: RouteLinkDynamic<any>;
    };

    /** optional nested routes */
    subRoutes?: Record<string, RouteSection>;

    /** optional icon renderer */
    icon?: (props: {
        color?: string;
        height?: number;
        width?: number;
    }) => ReactNode;
}

// ================== PATH CONFIG ==================

export type PathConfig = Record<string, RouteSection>;

export type GeneralPathConfig = { [key: string]: RouteLinkStatic<any> };

export type Paths = {
    dashboard: PathConfig;
    site: GeneralPathConfig;
    unAuthorized: RouteLinkStatic<any>;
    notFound: RouteLinkStatic<any>;
};

export type Icon = {
    className?: string;
    width?: number;
    height?: number;
    color?: string;
};
