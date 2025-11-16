import { SITE_ENDPOINTS } from "@/config/endpoints";
import { LevelResponse, Subject } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { subjectsStore } from "@/store";

export const useSiteServices = () => {
    const { setSubjects } = subjectsStore();

    const useGetAllSubjects = () => {
        return useQuery<Subject[], Error>({
            queryKey: ["subjects", "all"],
            queryFn: async () => {
                const response = await SITE_ENDPOINTS.subjects.getAll();

                if (!response) {
                    throw new Error("No response from server");
                }

                setSubjects(response);
                return response;
            },
            staleTime: 5 * 60 * 1000,
            retry: 1,
            retryDelay: 1000,
            enabled: true,
        });
    };

    const useGetOneSubject = (id: string) => {
        return useQuery<Subject, Error>({
            queryKey: ["subjects", id],
            queryFn: async () => {
                const response = await SITE_ENDPOINTS.subjects.getOne(id);

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

    const useGetAllLevels = () => {
        return useQuery<LevelResponse[], Error>({
            queryKey: ["levels", "all"],
            queryFn: async () => {
                const response = await SITE_ENDPOINTS.levels.getAll();

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

    const useGetOneLevel = (id: string) => {
        return useQuery<LevelResponse, Error>({
            queryKey: ["levels", id],
            queryFn: async () => {
                const response = await SITE_ENDPOINTS.levels.getOne(id);

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

    return {
        getAllSubjects: useGetAllSubjects,
        getOneSubject: useGetOneSubject,
        getAllLevels: useGetAllLevels,
        getOneLevel: useGetOneLevel,
    };
};
