
import { API_BASE_URL, getAuthHeaders, handleAPIError } from './config';
import { APIResponse, User } from './types';

/**
 * API لإدارة المستخدمين
 * 
 * الوظائف المتاحة:
 * - الحصول على جميع المستخدمين (للإدارة)
 * - الحصول على المدرسين
 * - الحصول على الطلاب
 * - البحث عن المستخدمين
 * - تفعيل/إلغاء تفعيل المستخدم
 * - حذف المستخدم
 * - الحصول على إحصائيات المستخدمين
 * 
 * البيانات المعروضة:
 * - معلومات المستخدم الأساسية (الاسم، البريد، الهاتف)
 * - الدور (طالب، مدرس، إدارة)
 * - المرحلة الدراسية للطلاب
 * - حالة التفعيل
 * - تاريخ التسجيل
 * - إحصائيات الحجوزات والتقييمات
 */

// الحصول على جميع المستخدمين (للإدارة)
export const getAllUsers = async (filters?: {
  role?: 'student' | 'teacher' | 'admin';
  isActive?: boolean;
  search?: string;
}): Promise<APIResponse<User[]>> => {
  try {
    const queryParams = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) queryParams.append(key, value.toString());
      });
    }

    const response = await fetch(`${API_BASE_URL}/users?${queryParams}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    const data = await response.json();
    
    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, error: data.message || 'فشل في الحصول على المستخدمين' };
    }
  } catch (error) {
    return handleAPIError(error);
  }
};

// الحصول على المدرسين
export const getTeachers = async (filters?: {
  isActive?: boolean;
  subject?: string;
  search?: string;
}): Promise<APIResponse<User[]>> => {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append('role', 'teacher');
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) queryParams.append(key, value.toString());
      });
    }

    const response = await fetch(`${API_BASE_URL}/teachers?${queryParams}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    const data = await response.json();
    
    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, error: data.message || 'فشل في الحصول على المدرسين' };
    }
  } catch (error) {
    return handleAPIError(error);
  }
};

// الحصول على الطلاب
export const getStudents = async (filters?: {
  isActive?: boolean;
  educationalStage?: string;
  search?: string;
}): Promise<APIResponse<User[]>> => {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append('role', 'student');
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) queryParams.append(key, value.toString());
      });
    }

    const response = await fetch(`${API_BASE_URL}/students?${queryParams}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    const data = await response.json();
    
    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, error: data.message || 'فشل في الحصول على الطلاب' };
    }
  } catch (error) {
    return handleAPIError(error);
  }
};

// الحصول على مستخدم معين
export const getUser = async (userId: string): Promise<APIResponse<User>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
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

// تفعيل/إلغاء تفعيل المستخدم
export const toggleUserStatus = async (userId: string, isActive: boolean): Promise<APIResponse<User>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/status`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ isActive }),
    });

    const data = await response.json();
    
    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, error: data.message || 'فشل في تحديث حالة المستخدم' };
    }
  } catch (error) {
    return handleAPIError(error);
  }
};

// حذف المستخدم
export const deleteUser = async (userId: string): Promise<APIResponse<null>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (response.ok) {
      return { success: true };
    } else {
      const data = await response.json();
      return { success: false, error: data.message || 'فشل في حذف المستخدم' };
    }
  } catch (error) {
    return handleAPIError(error);
  }
};

// البحث عن المستخدمين
export const searchUsers = async (query: string, role?: 'student' | 'teacher'): Promise<APIResponse<User[]>> => {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append('search', query);
    if (role) queryParams.append('role', role);

    const response = await fetch(`${API_BASE_URL}/users/search?${queryParams}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    const data = await response.json();
    
    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, error: data.message || 'فشل في البحث عن المستخدمين' };
    }
  } catch (error) {
    return handleAPIError(error);
  }
};

// الحصول على إحصائيات المستخدمين
export const getUserStats = async (): Promise<APIResponse<{
  totalUsers: number;
  totalStudents: number;
  totalTeachers: number;
  activeUsers: number;
  newUsersThisMonth: number;
}>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/stats`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    const data = await response.json();
    
    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, error: data.message || 'فشل في الحصول على إحصائيات المستخدمين' };
    }
  } catch (error) {
    return handleAPIError(error);
  }
};
