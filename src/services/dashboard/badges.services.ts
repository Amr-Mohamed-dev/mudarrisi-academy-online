import { useSearchParams } from "react-router-dom";
import { Badge, BadgeConditions, PageData } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DASHBOARD_ENDPOINTS } from "@/config/endpoints";

export const useBadgesServices = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;

    const handlePageChange = (page: number) => {
        if (page === currentPage) return;
        const newParams = new URLSearchParams(searchParams);
        newParams.set("page", page.toString());
        setSearchParams(newParams, { replace: true }); // avoid history spam
    };

    // Badges
    const useGetAllBadges = (options?: {
        enabled?: boolean;
        paginated?: boolean;
    }) => {
        return useQuery({
            queryKey: [
                "badges",
                "list",
                options?.paginated ? currentPage : "all",
            ],
            queryFn: async () => {
                const response = await DASHBOARD_ENDPOINTS.badge.getAll(
                    options?.paginated ? currentPage : undefined
                );

                if (!response) {
                    throw new Error("No response from server");
                }

                // Type guard: check if response is PageData
                if (Array.isArray(response)) {
                    // Response is T[] (simple array)
                    return {
                        items: response,
                        hasMore: false,
                        currentPage: 1,
                        lastPage: 1,
                        totalCount: response.length,
                        perPage: response.length,
                    };
                }

                // Response is PageData<T>
                return {
                    items: response.items || [],
                    hasMore:
                        (response.currentPage || 1) < (response.lastPage || 1),
                    currentPage: response.currentPage || currentPage,
                    lastPage: response.lastPage || currentPage,
                    totalCount: response.totalCount || 0,
                    perPage: response.perPage || 10,
                };
            },
            staleTime: 5 * 60 * 1000,
            retry: 1,
            retryDelay: 1000,
            enabled: options?.enabled ?? true,
        });
    };
    const useGetBadgeById = (id: string) => {
        return useQuery<Badge, Error>({
            queryKey: ["badges", id],
            queryFn: async () => {
                const response = await DASHBOARD_ENDPOINTS.badge.getOne(id);

                if (!response) {
                    throw new Error("No response from server");
                }

                return response;
            },
            staleTime: 5 * 60 * 1000,
            retry: 1,
            retryDelay: 1000,
            enabled: !!id,
        });
    };
    const useCreateBadge = () => {
        const queryClient = useQueryClient();
        return useMutation<void, Error, FormData>({
            mutationFn: async (data) => {
                await DASHBOARD_ENDPOINTS.badge.add(data).catch((err) => {
                    throw err;
                });
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["badges"] });
            },
        });
    };
    const useUpdateBadge = () => {
        const queryClient = useQueryClient();

        return useMutation<void, Error, { id: string; data: FormData }>({
            mutationFn: async ({ id, data }) => {
                await DASHBOARD_ENDPOINTS.badge
                    .update(id, data)
                    .catch((err) => {
                        throw err;
                    });
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["badges"] });
            },
        });
    };
    const useDeleteBadge = () => {
        const queryClient = useQueryClient();
        return useMutation<void, Error, string>({
            mutationFn: async (id) => {
                await DASHBOARD_ENDPOINTS.badge.delete(id).catch((err) => {
                    throw err;
                });
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["badges"] });
            },
        });
    };

    // Badges Conditions
    const useGetAllBadgesConditions = (options?: {
        paginated?: boolean;
        enabled?: boolean;
    }) => {
        return useQuery<PageData<BadgeConditions>, Error>({
            queryKey: [
                "badges-conditions",
                "list",
                options?.paginated ? currentPage : "all",
            ],
            queryFn: async () => {
                const response =
                    await DASHBOARD_ENDPOINTS.badgesConditions.getAll(
                        options?.paginated ? currentPage : undefined
                    );

                if (!response) {
                    throw new Error("No response from server");
                }

                // If response is already PageData, return it
                if (!Array.isArray(response)) {
                    return {
                        items: response.items || [],
                        hasMore: response.currentPage < response.lastPage,
                        currentPage: response.currentPage || currentPage,
                        lastPage: response.lastPage || currentPage,
                        totalCount: response.totalCount || 0,
                        perPage: response.perPage || 10,
                    };
                }

                // If response is an array (no pagination), convert it to PageData format
                return {
                    items: response,
                    hasMore: false,
                    currentPage: 1,
                    lastPage: 1,
                    totalCount: response.length,
                    perPage: response.length,
                };
            },
            staleTime: 5 * 60 * 1000,
            retry: 1,
            retryDelay: 1000,
            enabled: options?.enabled ?? true,
        });
    };
    const useGetAllBadgeConditionsOperators = () => {
        return useQuery({
            queryKey: ["badges-conditions-operators"],
            queryFn: async () => {
                const response =
                    await DASHBOARD_ENDPOINTS.badgesConditionsOperators.getAll();

                if (!response) {
                    throw new Error("No response from server");
                }

                // Handle both PageData and array responses
                if (Array.isArray(response)) {
                    return response;
                }

                if ("items" in response) {
                    return response.items;
                }

                // Fallback
                return [];
            },
            staleTime: 5 * 60 * 1000,
            retry: 1,
            retryDelay: 1000,
            enabled: true,
        });
    };
    const useGetAllBadgesConditionsByBadgeID = (badgeId: number) => {
        return useQuery({
            queryKey: ["badges-conditions", badgeId],
            queryFn: async () => {
                const response =
                    await DASHBOARD_ENDPOINTS.badgesConditionsByBadgeID.getAll(
                        badgeId
                    );

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
    const useGetBadgeConditionById = (id: string) => {
        return useQuery<BadgeConditions, Error>({
            queryKey: ["badges-conditions", id],
            queryFn: async () => {
                const response =
                    await DASHBOARD_ENDPOINTS.badgesConditions.getOne(id);

                if (!response) {
                    throw new Error("No response from server");
                }

                return response;
            },
            staleTime: 5 * 60 * 1000,
            retry: 1,
            retryDelay: 1000,
            enabled: !!id,
        });
    };

    const useCreateBadgeCondition = () => {
        const queryClient = useQueryClient();
        return useMutation<BadgeConditions, any, FormData>({
            mutationFn: async (formData: FormData) => {
                return await DASHBOARD_ENDPOINTS.badgesConditions
                    .add(formData)
                    .catch((err) => {
                        throw err;
                    });
            },
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ["badges-conditions"],
                });
            },
        });
    };
    const useUpdateBadgeCondition = () => {
        const queryClient = useQueryClient();

        return useMutation<
            void,
            Error,
            {
                id: string;
                data: {
                    field: string;
                    operator: string;
                    value: string;
                };
            }
        >({
            mutationFn: async ({ id, data }) => {
                await DASHBOARD_ENDPOINTS.badgesConditions.update(id, data);
            },
            onSuccess: () => {
                queryClient.refetchQueries({
                    queryKey: ["badges-conditions"],
                });
            },
            onError: (error) => {
                console.error("❌ Mutation failed:", error);
            },
        });
    };
    const useDeleteBadgeCondition = () => {
        const queryClient = useQueryClient();
        return useMutation<void, Error, string>({
            mutationFn: async (id) => {
                await DASHBOARD_ENDPOINTS.badgesConditions
                    .delete(id)
                    .catch((err) => {
                        throw err;
                    });
            },
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ["badges-conditions"],
                });
            },
        });
    };

    return {
        handlePageChange,
        currentPage,
        getAllBadges: useGetAllBadges,
        getBadgeById: useGetBadgeById,
        createBadge: useCreateBadge,
        updateBadge: useUpdateBadge,
        deleteBadge: useDeleteBadge,

        getAllBadgeConditions: useGetAllBadgesConditions,
        getAllBadgeConditionsByBadgeID: useGetAllBadgesConditionsByBadgeID,
        getAllBadgeConditionsOperators: useGetAllBadgeConditionsOperators,
        getBadgeConditionById: useGetBadgeConditionById,
        createBadgeCondition: useCreateBadgeCondition,
        updateBadgeCondition: useUpdateBadgeCondition,
        deleteBadgeCondition: useDeleteBadgeCondition,
    };
};
