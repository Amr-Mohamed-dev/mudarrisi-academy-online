import { Navigate, useLocation } from "react-router-dom";
import { authStore } from "@/store";
import { PATHS } from "@/constants";
import { Role } from "@/types";
import UnauthorizedPage from "@/pages/UnauthorizedPage";

interface AuthorizedRouteProps {
    role: Role["name"][];
    children: React.ReactNode;
}

export function AuthorizedRoute({ role, children }: AuthorizedRouteProps) {
    const { user } = authStore();
    const { isAuthenticated } = authStore();
    const loc = useLocation();
    if (!isAuthenticated) {
        return (
            <Navigate
                to={PATHS.auth.login.href}
                replace
                state={{ from: loc }}
            />
        );
    }

    if (!user || !user.role?.name) {
        return <UnauthorizedPage />;
    }

    const userRole = user.role.name.toLowerCase();
    return role.some((r) => r.toLowerCase() === userRole) ? (
        children
    ) : (
        <UnauthorizedPage />
    );
}
