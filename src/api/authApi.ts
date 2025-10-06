import { ENDPOINTS } from "@/config/endpoints";
import {
  API_BASE_URL,
  DEFAULT_HEADERS,
  getAuthHeaders,
  handleAPIError,
} from "./config";
import { APIResponse, User } from "./types";

/**
 * API للمصادقة وإدارة المستخدمين
 *
 * الوظائف المتاحة:
 * - تسجيل الدخول
 * - تسجيل مستخدم جديد
 * - تسجيل الخروج
 * - الحصول على بيانات المستخدم الحالي
 * - تحديث بيانات المستخدم
 * - تغيير كلمة المرور
 *
 * البيانات المعروضة:
 * - معلومات المستخدم (الاسم، البريد الإلكتروني، الدور، المرحلة الدراسية)
 * - حالة تسجيل الدخول
 * - توكن المصادقة
 */

// تسجيل الدخول

// تسجيل مستخدم جديد

// تسجيل الخروج

// الحصول على بيانات المستخدم الحالي
export const getCurrentUser = async (): Promise<APIResponse<User>> => {
  try {
    const response = await ENDPOINTS.auth.me();

    const data = response.data;

    if (response.data) {
      return { success: true, data };
    } else {
      return {
        success: false,
        error: data.message || "فشل في الحصول على بيانات المستخدم",
      };
    }
  } catch (error) {
    return handleAPIError(error);
  }
};

// تحديث بيانات المستخدم
export const updateUser = async (
  userId: string,
  userData: Partial<User>
): Promise<APIResponse<User>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, error: data.message || "فشل في تحديث البيانات" };
    }
  } catch (error) {
    return handleAPIError(error);
  }
};

// تغيير كلمة المرور
export const changePassword = async (
  oldPassword: string,
  newPassword: string
): Promise<APIResponse<null>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ oldPassword, newPassword }),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true };
    } else {
      return {
        success: false,
        error: data.message || "فشل في تغيير كلمة المرور",
      };
    }
  } catch (error) {
    return handleAPIError(error);
  }
};
