import { token } from "@/utils";
import api from "../api";
import { LoginData, RegisterData } from "@/types";
import { createApiHelpers } from "./api.helpers";
import { User } from "@/api";

const login = createApiHelpers<User, LoginData>("/login");
const signUp = createApiHelpers<User, RegisterData>("/sign-up");

export const AUTH_ENDPOINTS = {
    auth: {
        login: login.create,
        signUp: signUp.create,

        logout: () =>
            api.post(
                "/logout",
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            ),

        profile: (token: string) =>
            api
                .get<{ data: User }>("/auth/profile", {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((res) => res.data?.data),
    },
};
