import { PageData } from "@/types";
import api from "./api";
import Cookies from "js-cookie";
import { AUTH_COOKIE_NAME } from "@/constants";

type ApiResponse<T> = { data: PageData<T> | T[] };
export type SingleApiResponse<T> = { data: T };

type RequestOptions<T, TData = Partial<T>> = {
    id?: string | number;
    data?: TData;
    customPath?: string;
    headers?: Record<string, string>;
    authorized?: boolean;
    formData?: boolean;
    page?: number;
    search?: string;
    additionalParams?: Record<string, string>;
};

export const createApiHelpers = <T, TCreate = Partial<T>, TUpdate = Partial<T>>(
    basePath: string
) => {
    /**
     * Build headers based on options
     */
    const buildHeaders = (
        options?: RequestOptions<TCreate>
    ): Record<string, string> => {
        const headers: Record<string, string> = { ...(options?.headers || {}) };

        if (options?.authorized) {
            const token = Cookies.get(AUTH_COOKIE_NAME);

            headers["Authorization"] = `Bearer ${token}`;
        }

        if (options?.formData) {
            headers["Content-Type"] = "multipart/form-data";
        } else {
            headers["Content-Type"] = "application/json";
        }

        headers["Accept"] = "application/json";

        return headers;
    };

    /**
     * Get all items with optional pagination and search
     */
    const getAll = async <TCustom = T>(
        options?: RequestOptions<TCreate>
    ): Promise<PageData<TCustom> | TCustom[]> => {
        let path: string;
        const queryParts: string[] = [];

        // Add pagination and search
        if (options?.page !== undefined)
            queryParts.push(`page=${options?.page}`);
        if (options?.search)
            queryParts.push(`search=${encodeURIComponent(options?.search)}`);

        // Check if we have a custom path with serviceId in it
        const hasServiceIdInPath = options?.customPath?.includes("/service/");

        // Add additional params, excluding serviceId if it's in the path
        Object.entries(options?.additionalParams || {}).forEach(
            ([key, value]) => {
                if (value !== undefined && value !== null) {
                    if (!(hasServiceIdInPath && key === "serviceId")) {
                        // Handle arrays - append each item separately
                        if (Array.isArray(value)) {
                            value.forEach((item) => {
                                // Keep brackets and simple values unencoded, only encode complex values
                                const itemStr = String(item);
                                const encodedValue =
                                    /^[a-zA-Z0-9_\-=<>!]+$/.test(itemStr)
                                        ? itemStr
                                        : encodeURIComponent(itemStr);
                                queryParts.push(`${key}=${encodedValue}`);
                            });
                        } else {
                            // Keep brackets and simple values unencoded, only encode complex values
                            const valueStr = String(value);
                            const encodedValue = /^[a-zA-Z0-9_\-=<>!]+$/.test(
                                valueStr
                            )
                                ? valueStr
                                : encodeURIComponent(valueStr);
                            queryParts.push(`${key}=${encodedValue}`);
                        }
                    }
                }
            }
        );

        const queryString =
            queryParts.length > 0 ? `?${queryParts.join("&")}` : "";

        if (options?.customPath) {
            // Remove any trailing slash before appending query string
            const cleanPath = options.customPath.endsWith("/")
                ? options.customPath.slice(0, -1)
                : options.customPath;
            path = `${cleanPath}${queryString}`;
        } else {
            path = `${basePath}${queryString}`;
        }

        const headers = buildHeaders(options);

        const { data: result, error } = await api.get<ApiResponse<TCustom>>(
            path,
            {
                headers: headers,
            }
        );

        if (error) {
            throw error;
        }

        return result?.data ?? [];
    };

    /**
     * Get a single item by ID
     */
    const getOne = async <TCustom = T>(
        options?: RequestOptions<TCreate>
    ): Promise<TCustom> => {
        const path = options?.customPath || `${basePath}/${options?.id}`;
        const headers = buildHeaders(options);

        const { data: result, error } = await api.get<
            SingleApiResponse<TCustom>
        >(path, {
            headers: headers,
        });

        if (error) {
            throw error;
        }

        if (!result?.data) {
            throw new Error("No data returned from API");
        }

        return result.data;
    };

    /**
     * Create a new item
     */
    const post = async <TCustom = T>(
        options?: RequestOptions<TCreate>
    ): Promise<TCustom> => {
        const path =
            options?.customPath || options?.id
                ? `${basePath}/${options?.id}`
                : basePath;
        const headers = buildHeaders(options);

        const { data: result, error } = await api.post<
            SingleApiResponse<TCustom>
        >(path, options?.data || {}, { headers: headers });

        if (error) {
            throw error;
        }

        if (!result?.data) {
            throw new Error("No data returned from API");
        }

        return result.data;
    };

    /**
     * Update an existing item
     */
    const put = async <TCustom = T>(
        options?: RequestOptions<TCreate>
    ): Promise<TCustom> => {
        const path = options?.customPath || `${basePath}/${options?.id}`;
        const headers = buildHeaders(options);

        const { data: result, error } = await api.put<
            SingleApiResponse<TCustom>
        >(path, options?.data || {}, { headers: headers });

        if (error) {
            throw error;
        }

        if (!result?.data) {
            throw new Error("No data returned from API");
        }

        return result.data;
    };

    /**
     * Patch an existing item
     */
    const patch = async <TCustom = T>(
        options?: RequestOptions<TCreate>
    ): Promise<TCustom> => {
        const path = options?.customPath || `${basePath}/${options?.id}`;
        const headers = buildHeaders(options);

        const { data: result, error } = await api.patch<
            SingleApiResponse<TCustom>
        >(path, options?.data || {}, { headers: headers });

        if (error) {
            throw error;
        }

        if (!result?.data) {
            throw new Error("No data returned from API");
        }

        return result.data;
    };

    /**
     * Delete an item
     */
    const remove = async (
        options?: RequestOptions<TCreate>
    ): Promise<void> => {
        const path = options?.customPath || `${basePath}/${options?.id}`;
        const headers = buildHeaders(options);

        const { error } = await api.delete(path, {
            headers: headers,
        });

        if (error) {
            throw error;
        }
    };

    const normalMethods = () => {
        const get = async <TCustom = T>(
            options?: RequestOptions<TCreate>
        ): Promise<TCustom> => {
            const path = options?.customPath || `${basePath}`;
            const headers = buildHeaders(options);

            const { data: result, error } = await api.get<
                SingleApiResponse<TCustom>
            >(path, {
                headers: headers,
            });

            if (error) {
                throw error;
            }

            if (!result?.data) {
                throw new Error("No data returned from API");
            }

            return result.data;
        };
        const post = async <TCustom = T>(
            options?: RequestOptions<TCreate>
        ): Promise<TCustom> => {
            const path = options?.customPath || `${basePath}`;
            const headers = buildHeaders(options);

            const { data: result, error } = await api.post<
                SingleApiResponse<TCustom>
            >(path, options?.data || {}, { headers: headers });

            if (error) {
                throw error;
            }

            if (!result?.data) {
                throw new Error("No data returned from API");
            }

            return result.data;
        };
        const put = async <TCustom = T>(
            options?: RequestOptions<TCreate>
        ): Promise<TCustom> => {
            const path = options?.customPath || `${basePath}`;
            const headers = buildHeaders(options);

            const { data: result, error } = await api.put<
                SingleApiResponse<TCustom>
            >(path, options?.data || {}, { headers: headers });

            if (error) {
                throw error;
            }

            if (!result?.data) {
                throw new Error("No data returned from API");
            }

            return result.data;
        };
        const patch = async <TCustom = T>(
            options?: RequestOptions<TCreate>
        ): Promise<TCustom> => {
            const path = options?.customPath || `${basePath}`;
            const headers = buildHeaders(options);

            const { data: result, error } = await api.patch<
                SingleApiResponse<TCustom>
            >(path, options?.data || {}, { headers: headers });

            if (error) {
                throw error;
            }

            if (!result?.data) {
                throw new Error("No data returned from API");
            }

            return result.data;
        };
        const deleteMethod = async (
            options?: RequestOptions<TCreate>
        ): Promise<void> => {
            const path = options?.customPath || `${basePath}`;
            const headers = buildHeaders(options);

            const { error } = await api.delete(path, {
                headers: headers,
            });

            if (error) {
                throw error;
            }
        };
        return {
            get,
            post,
            put,
            patch,
            deleteMethod,
        };
    };

    return {
        normalMethods,
        getAll,
        getOne,
        post,
        put,
        patch,
        delete: remove,
    };
};
