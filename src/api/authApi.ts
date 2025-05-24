
import { API_BASE_URL, getAuthHeaders, handleAPIError } from './config';
import { APIResponse, User } from './types';

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
export const login = async (email: string, password: string): Promise<APIResponse<{ user: User; token: string }>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    
    if (response.ok) {
      // حفظ التوكن في localStorage
      if (data.token) {
        localStorage.setItem('authToken', data.token);
      }
      return { success: true, data };
    } else {
      return { success: false, error: data.message || 'فشل في تسجيل الدخول' };
    }
  } catch (error) {
    return handleAPIError(error);
  }
};

// تسجيل مستخدم جديد
export const register = async (userData: {
  name: string;
  email: string;
  phone?: string;
  password: string;
  role: 'student' | 'teacher';
  educationalStage?: string;
}): Promise<APIResponse<{ user: User; token?: string }>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    
    if (response.ok) {
      // حفظ التوكن في localStorage إذا تم تسجيل الدخول تلقائياً
      if (data.token) {
        localStorage.setItem('authToken', data.token);
      }
      return { success: true, data };
    } else {
      return { success: false, error: data.message || 'فشل في إنشاء الحساب' };
    }
  } catch (error) {
    return handleAPIError(error);
  }
};

// تسجيل الخروج
export const logout = async (): Promise<APIResponse<null>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });

    // حذف التوكن من localStorage
    localStorage.removeItem('authToken');
    
    if (response.ok) {
      return { success: true };
    } else {
      return { success: false, error: 'فشل في تسجيل الخروج' };
    }
  } catch (error) {
    localStorage.removeItem('authToken');
    return handleAPIError(error);
  }
};

// الحصول على بيانات المستخدم الحالي
export const getCurrentUser = async (): Promise<APIResponse<User>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    const data = await response.json();
    
    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, error: data.message || 'فشل في الحصول على بيانات المستخدم' };
    }
  } catch (error) {
    return handleAPIError(error);
  }
};

// تحديث بيانات المستخدم
export const updateUser = async (userId: string, userData: Partial<User>): Promise<APIResponse<User>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    
    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, error: data.message || 'فشل في تحديث البيانات' };
    }
  } catch (error) {
    return handleAPIError(error);
  }
};

// تغيير كلمة المرور
export const changePassword = async (oldPassword: string, newPassword: string): Promise<APIResponse<null>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ oldPassword, newPassword }),
    });

    const data = await response.json();
    
    if (response.ok) {
      return { success: true };
    } else {
      return { success: false, error: data.message || 'فشل في تغيير كلمة المرور' };
    }
  } catch (error) {
    return handleAPIError(error);
  }
};
