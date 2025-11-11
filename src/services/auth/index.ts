import { AUTH_ENDPOINTS } from "@/config/endpoints";
import { User } from "@/types";
import { LoginData, LoginResponse, RegisterData } from "@/types/auth.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authStore } from "@/store/auth.store";
import { setCookie } from "@/utils";
import { AUTH_COOKIE_NAME } from "@/constants";

export const useAuthServices = () => {
    const queryClient = useQueryClient();
    const { setUser, setIsAuthenticated } = authStore();

    const useGetProfile = () => {
        return useQuery<User, Error>({
            queryKey: ["auth", "profile"],
            queryFn: async () => {
                const response = await AUTH_ENDPOINTS.getProfile();

                if (!response) {
                    throw new Error("No response from server");
                }

                return response;
            },
            staleTime: 5 * 60 * 1000,
            retry: 1,
            retryDelay: 1000,
            enabled: true,
        });
    };
    const useLogin = () => {
        return useMutation<LoginResponse, Error, LoginData>({
            mutationFn: async (data) => {
                return await AUTH_ENDPOINTS.login(data).catch((err) => {
                    throw err;
                });
            },
            onSuccess: (data) => {
                queryClient.invalidateQueries({ queryKey: ["auth"] });
                setCookie(AUTH_COOKIE_NAME, data.token);
                setUser(data.user);
                setIsAuthenticated(true);
            },
        });
    };
    const useRegister = () => {
        return useMutation<User, Error, RegisterData>({
            mutationFn: async (data) => {
                return await AUTH_ENDPOINTS.register(data).catch((err) => {
                    throw err;
                });
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["auth"] });
                setCookie(AUTH_COOKIE_NAME, "");
                setUser(null);
                setIsAuthenticated(false);
            },
        });
    };
    const useLogout = () => {
        return useMutation<void, Error>({
            mutationFn: async () => {
                await AUTH_ENDPOINTS.logout().catch((err) => {
                    throw err;
                });
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["auth"] });
                setCookie(AUTH_COOKIE_NAME, "");
                setUser(null);
                setIsAuthenticated(false);
            },
        });
    };

    return {
        login: useLogin,
        logout: useLogout,
        getProfile: useGetProfile,
        register: useRegister,
    };
};
