
import { API_BASE_URL, getAuthHeaders, handleAPIError } from './config';
import { APIResponse, Rating } from './types';

/**
 * API لإدارة التقييمات
 * 
 * الوظائف المتاحة:
 * - إنشاء تقييم جديد
 * - الحصول على تقييمات المستخدم (المستلمة)
 * - الحصول على التقييمات المرسلة من المستخدم
 * - الحصول على تقييم معين
 * - تحديث التقييم
 * - حذف التقييم
 * - الحصول على متوسط تقييمات المستخدم
 * 
 * البيانات المعروضة:
 * - درجة التقييم (من 1 إلى 5 نجوم)
 * - تعليق التقييم
 * - معلومات من قام بالتقييم
 * - معلومات من تم تقييمه
 * - تاريخ التقييم
 * - متوسط التقييمات وعددها
 */

// إنشاء تقييم جديد
export const createRating = async (ratingData: {
  bookingId: string;
  targetId: string;
  rating: number;
  comment?: string;
}): Promise<APIResponse<Rating>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/ratings`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(ratingData),
    });

    const data = await response.json();
    
    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, error: data.message || 'فشل في إنشاء التقييم' };
    }
  } catch (error) {
    return handleAPIError(error);
  }
};

// الحصول على تقييمات المستخدم (المستلمة)
export const getUserRatings = async (userId: string): Promise<APIResponse<{
  ratings: Rating[];
  averageRating: number;
  totalRatings: number;
}>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/ratings`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    const data = await response.json();
    
    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, error: data.message || 'فشل في الحصول على التقييمات' };
    }
  } catch (error) {
    return handleAPIError(error);
  }
};

// الحصول على التقييمات المرسلة من المستخدم
export const getRatingsGivenByUser = async (userId: string): Promise<APIResponse<Rating[]>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/ratings-given`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    const data = await response.json();
    
    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, error: data.message || 'فشل في الحصول على التقييمات المرسلة' };
    }
  } catch (error) {
    return handleAPIError(error);
  }
};

// الحصول على تقييم معين
export const getRating = async (ratingId: string): Promise<APIResponse<Rating>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/ratings/${ratingId}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    const data = await response.json();
    
    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, error: data.message || 'فشل في الحصول على التقييم' };
    }
  } catch (error) {
    return handleAPIError(error);
  }
};

// تحديث التقييم
export const updateRating = async (ratingId: string, ratingData: {
  rating?: number;
  comment?: string;
}): Promise<APIResponse<Rating>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/ratings/${ratingId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(ratingData),
    });

    const data = await response.json();
    
    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, error: data.message || 'فشل في تحديث التقييم' };
    }
  } catch (error) {
    return handleAPIError(error);
  }
};

// حذف التقييم
export const deleteRating = async (ratingId: string): Promise<APIResponse<null>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/ratings/${ratingId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (response.ok) {
      return { success: true };
    } else {
      const data = await response.json();
      return { success: false, error: data.message || 'فشل في حذف التقييم' };
    }
  } catch (error) {
    return handleAPIError(error);
  }
};

// التحقق من وجود تقييم للحجز
export const checkRatingExists = async (bookingId: string, raterRole: 'student' | 'teacher'): Promise<APIResponse<{ exists: boolean; rating?: Rating }>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}/rating-check?raterRole=${raterRole}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    const data = await response.json();
    
    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, error: data.message || 'فشل في التحقق من التقييم' };
    }
  } catch (error) {
    return handleAPIError(error);
  }
};

// الحصول على إحصائيات التقييمات
export const getRatingStats = async (userId: string): Promise<APIResponse<{
  averageRating: number;
  totalRatings: number;
  ratingDistribution: { [key: number]: number };
}>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/rating-stats`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    const data = await response.json();
    
    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, error: data.message || 'فشل في الحصول على إحصائيات التقييمات' };
    }
  } catch (error) {
    return handleAPIError(error);
  }
};
