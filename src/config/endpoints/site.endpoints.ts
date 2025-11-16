import { createApiHelpers } from "../api.helpers";
import {
  SubjectResponse,
  SubjectsResponse,
  CreateSubjectData,
  UpdateSubjectData,
} from "@/types/subjects.types";

const endpointsHelpers = {
  subjects: createApiHelpers("/subjects"),
};

export const SITE_ENDPOINTS = {
  subjects: {
    getAll: () =>
      endpointsHelpers.subjects.normalMethods().get<SubjectsResponse>({
        authorized: true,
      }),

    getOne: (id: string) =>
      endpointsHelpers.subjects.normalMethods().get<SubjectResponse>({
        customPath: `/subjects/${id}`,
        authorized: true,
      }),

    create: (data: CreateSubjectData) =>
      endpointsHelpers.subjects.normalMethods().post<SubjectResponse>({
        data,
        authorized: true,
      }),

    update: (id: string, data: UpdateSubjectData) =>
      endpointsHelpers.subjects.normalMethods().patch<SubjectResponse>({
        customPath: `/subjects/${id}`,
        data,
        authorized: true,
      }),

    delete: (id: string) =>
      endpointsHelpers.subjects.normalMethods().deleteMethod({
        customPath: `/subjects/${id}`,
        authorized: true,
      }),
  },
};

export default SITE_ENDPOINTS;
