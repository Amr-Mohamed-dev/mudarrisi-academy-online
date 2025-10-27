import api from "../api";
import { getToken } from "@/utils";

type ApiResponse<T> = { data: T[] };
export type SingleApiResponse<T> = { data: T };

type RequestOptions = {
    customPath?: string;
    headers?: Record<string, string>;
    authorized?: boolean;
    formData?: boolean;
};

export const createApiHelpers = <T, TCreate = Partial<T>, TUpdate = Partial<T>>(
    basePath: string
) => {
    /**
     * Build headers based on options
     */
    const buildHeaders = (options?: RequestOptions): Record<string, string> => {
        const headers: Record<string, string> = { ...(options?.headers || {}) };

        if (options?.authorized) {
            const token = getToken();

            headers["Authorization"] = `Bearer ${token}`;
        }

        if (options?.formData) {
            headers["Content-Type"] = "multipart/form-data";
        }

        return headers;
    };

    /**
     * Get all items with optional pagination and search
     */
    const getAll = async (
        page?: number,
        search?: string,
        additionalParams: Record<string, string> = {},
        options?: RequestOptions
    ): Promise<T[]> => {
        let path: string;

        if (options?.customPath) {
            path = options.customPath;
        } else {
            const params = new URLSearchParams();
            if (page !== undefined) params.append("page", page.toString());
            if (search) params.append("search", search);

            Object.entries(additionalParams).forEach(([key, value]) => {
                if (value !== undefined && value !== null)
                    params.append(key, value);
            });

            const queryString = params.toString()
                ? `?${params.toString()}`
                : "";
            path = `${basePath}${queryString}`;
        }

        const headers = buildHeaders(options);

        const { data: result, error } = await api.get<ApiResponse<T>>(path, {
            headers: headers,
        });

        if (error) {
            throw error;
        }

        return result?.data ?? [];
    };

    /**
     * Get a single item by ID
     */
    const getOne = async (
        id: string | number,
        options?: RequestOptions
    ): Promise<T> => {
        const path = options?.customPath || `${basePath}/${id}`;
        const headers = buildHeaders(options);

        const { data: result, error } = await api.get<SingleApiResponse<T>>(
            path,
            {
                headers: headers,
            }
        );

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
    const create = async (
        data: TCreate,
        id?: string | number,
        options?: RequestOptions
    ): Promise<T> => {
        const path = options?.customPath || id ? `${basePath}/${id}` : basePath;
        const headers = buildHeaders(options);

        const { data: result, error } = await api.post<SingleApiResponse<T>>(
            path,
            data || {},
            { headers: headers }
        );

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
    const update = async (
        id: string | number,
        data: TUpdate,
        options?: RequestOptions
    ): Promise<T> => {
        const path = options?.customPath || `${basePath}/${id}`;
        const headers = buildHeaders(options);

        const { data: result, error } = await api.put<SingleApiResponse<T>>(
            path,
            data || {},
            { headers: headers }
        );

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
    const patch = async (
        id: string | number,
        data: TUpdate,
        options?: RequestOptions
    ): Promise<T> => {
        const path = options?.customPath || `${basePath}/${id}`;
        const headers = buildHeaders(options);

        const { data: result, error } = await api.patch<SingleApiResponse<T>>(
            path,
            data || {},
            { headers: headers }
        );

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
        id: string | number,
        options?: RequestOptions
    ): Promise<void> => {
        const path = options?.customPath || `${basePath}/${id}`;
        const headers = buildHeaders(options);

        const { error } = await api.delete(path, {
            headers: headers,
        });

        if (error) {
            throw error;
        }
    };

    return {
        getAll,
        getOne,
        create,
        update,
        patch,
        delete: remove,
    };
};

// Example usage:

// 1. Simple usage - no options
// const userApi = createApiHelpers<User>('/users');
// await userApi.getAll();

// 2. With authorization
// await userApi.create(
//     { name: 'John' },
//     { authorized: true }
// );

// 3. With form data
// await userApi.update(
//     '123',
//     formDataObject,
//     { formData: true, authorized: true }
// );

// 4. With custom headers
// await userApi.getOne('123', {
//     headers: { 'X-Custom-Header': 'value' },
//     authorized: true
// });

// 5. With custom path
// await badgeConditionsApi.getAll(
//     undefined,
//     undefined,
//     {},
//     { customPath: `/badges-conditions/${badgeId}/badge`, authorized: true }
// );

// 6. Everything combined
// await userApi.create(
//     { name: 'John' },
//     {
//         customPath: '/special/users',
//         headers: { 'X-Request-ID': '12345' },
//         authorized: true,
//         formData: true
//     }
// );
