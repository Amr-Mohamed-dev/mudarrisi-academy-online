export const PROJECT_NAME = import.meta.env.VITE_PROJECT_NAME || "teachers";
export const SITE_NAME = import.meta.env.VITE_SITE_NAME || "teachers";
export const AUTH_COOKIE_NAME =
    import.meta.env.VITE_AUTH_COOKIE_NAME || `${PROJECT_NAME}_auth_token`;
export const AUTH_COOKIE_EXPIRES_DAYS = parseInt(
    import.meta.env.VITE_AUTH_COOKIE_EXPIRES_DAYS || "7",
    10
);
export const USER_KEY = import.meta.env.VITE_USER_KEY || `${PROJECT_NAME}_user`;
export const BASE_URL = import.meta.env.VITE_API_BASE_URL;
