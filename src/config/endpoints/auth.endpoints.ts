import { LoginData, LoginResponse, RegisterData } from "@/types";
import { createApiHelpers } from "../api.helpers";
import { User } from "@/types";

const endpointsHelpers = {
    login: createApiHelpers("/auth/login"),
    createTeacher: createApiHelpers("/auth/teachers"),
    register: createApiHelpers("/auth/register"),
    profile: createApiHelpers("/auth/profile"),
    logout: createApiHelpers("/auth/logout"),
};

export const AUTH_ENDPOINTS = {
    login: (data: LoginData) =>
        endpointsHelpers.login.normalMethods().post<LoginResponse>({
            data,
        }),
    register: {
        student: (data: RegisterData) =>
            endpointsHelpers.register.normalMethods().post<LoginResponse>({
                data,
                customPath: "/auth/register/student",
            }),
        teacher: (data: RegisterData) =>
            endpointsHelpers.createTeacher.normalMethods().post<LoginResponse>({
                data,
                customPath: "/auth/register/teacher",
            }),
    },
    getProfile: () =>
        endpointsHelpers.profile.normalMethods().get<User>({
            authorized: true,
        }),
    logout: () =>
        endpointsHelpers.logout.normalMethods().post({
            authorized: true,
        }),
};
