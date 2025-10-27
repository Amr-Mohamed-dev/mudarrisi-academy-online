import { AUTH_ENDPOINTS } from "@/config/endpoints";
import { authStore } from "@/store";
import { LoginData, RegisterData, User } from "@/types";
import { getToken, removeToken, setCookie } from "@/utils";
import { PROJECT_NAME, AUTH_COOKIE_NAME } from "@/constants";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAuthServices = () => {
    const {
        isAuthenticated,
        setIsLoading,
        setError,
        setIsAuthenticated,
        setUser,
    } = authStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (
            !isAuthenticated &&
            window.location.pathname.includes("/dashboard")
        ) {
            console.log("Not Authenticated");
            navigate(PATHS.auth.login.href);
        }

        if (window.location.pathname === "/dashboard") {
            navigate(PATHS.dashboard.overview.links.main.href, {
                replace: true,
            });
        }
    }, []);

    const useLogin = () => {
        const queryClient = useQueryClient();

        return useMutation<void, Error, LoginData>({
            mutationFn: async (data) => {
                await AUTH_ENDPOINTS.auth
                    .login(data)
                    .then(async (res) => {
                        const token = res?.token as string;

                        if (token) {
                            setCookie(AUTH_COOKIE_NAME, token);

                            const user = await fetchProfile(token);
                            setUser(user);
                            setIsAuthenticated(true);
                            setError(null);
                        }
                    })
                    .catch((err) => {
                        removeToken();

                        setUser(null);
                        setIsAuthenticated(false);
                        setError(
                            err?.message ||
                                err?.response?.data?.message ||
                                "Login failed"
                        );
                        throw err;
                    });
            },
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ["auth", "profile"],
                });
            },
        });
    };

    const useSignUp = () => {
        const queryClient = useQueryClient();

        return useMutation<void, Error, RegisterData>({
            mutationFn: async (data) => {
                await AUTH_ENDPOINTS.auth
                    .signUp(data)
                    .then(async (res) => {
                        const token = res?.token as string;

                        if (token) {
                            setAuthStep(AuthSteps.SignUpComplete);
                            setCookie(AUTH_COOKIE_NAME, token);

                            const user = await fetchProfile(token);

                            setUser(user);
                            setIsAuthenticated(true);
                            setError(null);

                            /* TODO:
                             await AUTH_ENDPOINTS.auth.sendSignUpVerificationCode(
                                 {
                                     email: data.email,
                                 }
                                 );
                                 setSignupEmail(data.email);
                            */

                            setIsLoading(false);
                        }
                    })
                    .catch((err) => {
                        setError(
                            err?.response?.data?.message ||
                                "Registration failed"
                        );
                        throw err;
                    })
                    .finally(() => {
                        setIsLoading(false);
                    });
            },
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ["auth", "profile"],
                });
            },
        });
    };

    const fetchProfile = async (token: string) => {
        if (!token) throw new Error("No token found");

        try {
            const response = await AUTH_ENDPOINTS.auth.profile(token);
            return response as User;
        } catch (err: any) {
            const isAuthError =
                err?.response?.status === 401 || err?.response?.status === 403;
            if (isAuthError) removeToken();
            throw new Error(
                err?.response?.data?.message || "Failed to fetch profile"
            );
        }
    };

    const logout = async () => {
        setIsLoading(true);
        try {
            // Try to call logout endpoint if available
            // If token is invalid or expired, this will fail silently
            if (getToken()) {
                await AUTH_ENDPOINTS.auth
                    .logout()
                    .then(() => window.location.reload());
            }
            // Signal to other tabs that logout occurred
            localStorage.setItem(PROJECT_NAME + "-auth", "logged_out");

            // First remove the token to ensure cookie is cleared
            removeToken();

            // Clear persisted state in localStorage
            localStorage.removeItem(PROJECT_NAME + "-auth");

            // Clear any other auth-related data
            sessionStorage.removeItem("user-session");

            // Then update the state
            setUser(null);
            setIsAuthenticated(false);
            setError(null);
            setIsLoading(false);
        } catch (error) {
            console.error("Logout process failed:", error);
            // Ensure state is reset even if something fails
            removeToken();
            localStorage.removeItem(PROJECT_NAME + "-auth");
            setUser(null);
            setIsAuthenticated(false);
            setError(null);
            setIsLoading(false);
        }
    };

    return {
        login: useLogin,
        signUp: useSignUp,
        logout,
        fetchProfile,
    };
};
