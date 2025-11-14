import { User, UserRole } from "./user.types";

export type AuthState = {
    user: User | null;
    isAuthenticated: boolean;
    error: string | null;
    isLoading: boolean;

    setIsLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    setUser: (user: User | null) => void;
};
export type LoginData = {
    phone: string;
    password: string;
};
export type LoginResponse = {
    token: string;
    user: User;
};
export type RegisterData = {
    email: string;
    phone: string;
    password: string;
    name: string;
    role: UserRole;
    bio: string;
};
