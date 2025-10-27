import { User } from "./user.types";

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
    email: string;
    password: string;
};
export type RegisterData = {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
};
