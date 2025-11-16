import { createApiHelpers } from "../api.helpers";
import { LevelResponse, Subject } from "@/types";

const endpointsHelpers = {
    subjects: createApiHelpers("/subjects"),
    levels: createApiHelpers("/levels"),
};

export const SITE_ENDPOINTS = {
    subjects: {
        getAll: () =>
            endpointsHelpers.subjects.normalMethods().get<Subject[]>({}),

        getOne: (id: string) =>
            endpointsHelpers.subjects.normalMethods().get<Subject>({
                customPath: `/subjects/${id}`,
            }),
    },
    levels: {
        getAll: () =>
            endpointsHelpers.levels.normalMethods().get<LevelResponse[]>({}),

        getOne: (id: string) =>
            endpointsHelpers.levels.normalMethods().get<LevelResponse>({
                customPath: `/levels/${id}`,
            }),
    },
};

export default SITE_ENDPOINTS;
