import { authStore } from "@/store";
import { Role } from "@/types";

interface AuthorizedComponentProps {
    role: Role["name"][];
    children: React.ReactNode;
}

function AuthorizedComponent({ role, children }: AuthorizedComponentProps) {
    const { user } = authStore();

    if (!user || !user.role?.name) return null;
    
    const userRole = user.role.name.toLowerCase();
    return role.some((r) => r.toLowerCase() === userRole)
        ? children
        : null;
}
export default AuthorizedComponent;
