import { APIResponse, handleAPIError, User } from "@/api";
import { ENDPOINTS } from "@/config/endpoints";

export const authServices = () => {
  const login = async (
    email: string,
    password: string
  ): Promise<APIResponse<{ user: User; token: string }>> => {
    try {
      console.log("before res");
      const response = await ENDPOINTS.auth.login({
        email,
        password,
      });

      const data = response.data;
      console.log("after res", data);
      if (response.data) {
        // حفظ التوكن في localStorage
        if (data.token) {
          localStorage.setItem("authToken", data.token);
        }
        return { success: true, data };
      } else {
        return { success: false, error: data.message || "فشل في تسجيل الدخول" };
      }
    } catch (error) {
      return handleAPIError(error);
    }
  };
  const register = async (userData: {
    name: string;
    email: string;
    phone?: string;
    password: string;
    role: "student" | "teacher";
    educationalStage?: string;
  }): Promise<APIResponse<{ user: User; token?: string }>> => {
    try {
      const response = await ENDPOINTS.auth.register(userData);

      const data = response.data;

      if (response.data) {
        // حفظ التوكن في localStorage إذا تم تسجيل الدخول تلقائياً
        if (data.token) {
          localStorage.setItem("authToken", data.token);
        }
        return { success: true, data };
      } else {
        return { success: false, error: data.message || "فشل في إنشاء الحساب" };
      }
    } catch (error) {
      return handleAPIError(error);
    }
  };

  const logout = async (): Promise<APIResponse<null>> => {
    try {
      const response = await ENDPOINTS.auth.logout();

      localStorage.removeItem("authToken");

      if (response.data) {
        return { success: true };
      } else {
        return { success: false, error: "فشل في تسجيل الخروج" };
      }
    } catch (error) {
      localStorage.removeItem("authToken");
      return handleAPIError(error);
    }
  };

  return {
    login,
    logout,
    register,
  };
};
