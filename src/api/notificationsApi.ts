
import { API_BASE_URL, getAuthHeaders, handleAPIError } from './config';
import { APIResponse, Notification } from './types';

/**
 * API لإدارة الإشعارات
 * 
 * الوظائف المتاحة:
 * - الحصول على إشعارات المستخدم
 * - إنشاء إشعار جديد
 * - تحديد الإشعار كمقروء
 * - تحديد جميع الإشعارات كمقروءة
 * - حذف الإشعار
 * - الحصول على عدد الإشعارات غير المقروءة
 * 
 * البيانات المعروضة:
 * - عنوان ومحتوى الإشعار
 * - نوع الإشعار (حجز، تقييم، نظام، تذكير)
 * - حالة القراءة
 * - تاريخ الإنشاء
 * - عدد الإشعارات غير المقروءة
 */

// الحصول على إشعارات المستخدم
export const getUserNotifications = async (userId: string): Promise<APIResponse<Notification[]>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/notifications`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    const data = await response.json();
    
    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, error: data.message || 'فشل في الحصول على الإشعارات' };
    }
  } catch (error) {
    return handleAPIError(error);
  }
};

// إنشاء إشعار جديد
export const createNotification = async (notificationData: {
  userId: string;
  title: string;
  message: string;
  type: 'booking' | 'rating' | 'system' | 'reminder';
}): Promise<APIResponse<Notification>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/notifications`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(notificationData),
    });

    const data = await response.json();
    
    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, error: data.message || 'فشل في إنشاء الإشعار' };
    }
  } catch (error) {
    return handleAPIError(error);
  }
};

// تحديد الإشعار كمقروء
export const markNotificationAsRead = async (notificationId: string): Promise<APIResponse<Notification>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/notifications/${notificationId}/read`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
    });

    const data = await response.json();
    
    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, error: data.message || 'فشل في تحديث الإشعار' };
    }
  } catch (error) {
    return handleAPIError(error);
  }
};

// تحديد جميع الإشعارات كمقروءة
export const markAllNotificationsAsRead = async (userId: string): Promise<APIResponse<null>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/notifications/read-all`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
    });

    const data = await response.json();
    
    if (response.ok) {
      return { success: true };
    } else {
      return { success: false, error: data.message || 'فشل في تحديث الإشعارات' };
    }
  } catch (error) {
    return handleAPIError(error);
  }
};

// حذف الإشعار
export const deleteNotification = async (notificationId: string): Promise<APIResponse<null>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/notifications/${notificationId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (response.ok) {
      return { success: true };
    } else {
      const data = await response.json();
      return { success: false, error: data.message || 'فشل في حذف الإشعار' };
    }
  } catch (error) {
    return handleAPIError(error);
  }
};

// الحصول على عدد الإشعارات غير المقروءة
export const getUnreadNotificationsCount = async (userId: string): Promise<APIResponse<{ count: number }>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/notifications/unread-count`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    const data = await response.json();
    
    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, error: data.message || 'فشل في الحصول على عدد الإشعارات' };
    }
  } catch (error) {
    return handleAPIError(error);
  }
};

// إرسال إشعارات للمجموعة
export const sendBulkNotifications = async (notificationsData: {
  userIds: string[];
  title: string;
  message: string;
  type: 'booking' | 'rating' | 'system' | 'reminder';
}): Promise<APIResponse<Notification[]>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/notifications/bulk`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(notificationsData),
    });

    const data = await response.json();
    
    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, error: data.message || 'فشل في إرسال الإشعارات' };
    }
  } catch (error) {
    return handleAPIError(error);
  }
};
