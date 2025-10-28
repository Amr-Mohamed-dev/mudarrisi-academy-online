import Cookies from "js-cookie";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { FieldValues, FormState } from "react-hook-form";
import { AUTH_COOKIE_EXPIRES_DAYS, AUTH_COOKIE_NAME } from "@/constants";
import { NavigateFunction } from "react-router-dom";

// Tailwind
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Cookies
const getToken = () => Cookies.get(AUTH_COOKIE_NAME);
const token = getToken();
const isAuthenticated = () => Boolean(Cookies.get(AUTH_COOKIE_NAME));
const removeToken = () => Cookies.remove(AUTH_COOKIE_NAME);
const setCookie = (key: string, value: string) =>
  Cookies.set(key, value, {
    expires: AUTH_COOKIE_EXPIRES_DAYS,
    secure: import.meta.env.PROD,
    sameSite: "strict",
    path: "/",
  });

export const formatPhone = (phoneNumber: string) => {
  return phoneNumber.startsWith("20")
    ? phoneNumber
    : phoneNumber.startsWith("0")
    ? `2${phoneNumber}`
    : `20${phoneNumber}`;
};

// FormData
const logFormData = (apiFormData: FormData, message?: string) => {
  console.log(message + ":" || "FormData contents:");
  for (const pair of apiFormData.entries()) {
    console.log(
      pair[0] +
        ": " +
        (pair[1] instanceof File
          ? `File: ${(pair[1] as File).name}, ${(pair[1] as File).size} bytes`
          : pair[1])
    );
  }
};

// React Hook Form
const dirtyFields = <T extends FieldValues>(formState: FormState<T>) =>
  Object.keys(formState.dirtyFields || {});

function safeNavigate(
  navigate: NavigateFunction,
  to?: string,
  options?: { replace?: boolean }
) {
  if (!to) return; // gracefully skip if undefined
  navigate(to, options);
}

export {
  getToken,
  isAuthenticated,
  removeToken,
  setCookie,
  token,
  logFormData,
  dirtyFields,
  safeNavigate,
};
