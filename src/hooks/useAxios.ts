import { useEffect, useState } from "react";
import api from "@/config/api";
import { useToast } from "@/hooks/useToast";

const useAxios = () => {
    const [isLoadingApi, setIsLoadingApi] = useState(false);
    const { addToast } = useToast();

    useEffect(() => {
        // Request interceptor for loading state
        const requestInterceptor = api.axiosInstance.interceptors.request.use(
            (config) => {
                setIsLoadingApi(true);
                return config;
            },
            (error) => {
                setIsLoadingApi(false);
                return Promise.reject(error);
            }
        );

        // Response interceptor for loading state and error handling
        const responseInterceptor = api.axiosInstance.interceptors.response.use(
            (response) => {
                setIsLoadingApi(false);
                return response;
            },
            (error) => {
                // Handle response errors here
                console.log("Axios interceptor error:", error);

                // Skip handling for network status checks to prevent loops
                const message =
                    error?.data?.message ||
                    error?.response?.data?.error ||
                    error?.response?.data?.message ||
                    `برجاء المحاولة في وقت اخر`;

                // Only show popup for non-auth errors (auth errors are handled in api.ts)
                if (error.response && error.response.status !== 401) {
                    addToast({
                        type: "error",
                        message,
                        title: "Error",
                    });
                }

                setIsLoadingApi(false);
                return Promise.reject(error);
            }
        );

        // Cleanup function to eject interceptors when component unmounts
        return () => {
            api.axiosInstance.interceptors.request.eject(requestInterceptor);
            api.axiosInstance.interceptors.response.eject(responseInterceptor);
        };
    }, [setIsLoadingApi]);

    return { api, isLoadingApi };
};

export default useAxios;
