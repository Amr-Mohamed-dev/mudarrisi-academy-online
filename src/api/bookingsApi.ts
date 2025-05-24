
import { API_BASE_URL, getAuthHeaders, handleAPIError } from './config';
import { APIResponse, Booking } from './types';

/**
 * API لإدارة الحجوزات
 * 
 * الوظائف المتاحة:
 * - إنشاء حجز جديد
 * - الحصول على جميع الحجوزات (للإدارة)
 * - الحصول على حجوزات المستخدم (طالب أو مدرس)
 * - تحديث حالة الحجز (قبول، رفض، إكمال)
 * - إلغاء الحجز
 * - إضافة رابط الاجتماع للحجز
 * - تسجيل الحضور
 * 
 * البيانات المعروضة:
 * - تفاصيل الحجز (التاريخ، الوقت، المادة، السعر)
 * - معلومات المدرس والطالب
 * - حالة الحجز (قيد الانتظار، مقبول، مرفوض، مكتمل، ملغي)
 * - رابط الاجتماع (إن وجد)
 * - سجل الحضور
 */

// إنشاء حجز جديد
export const createBooking = async (bookingData: {
  teacherId: string;
  date: string;
  startTime: string;
  endTime: string;
  subject: string;
}): Promise<APIResponse<Booking>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(bookingData),
    });

    const data = await response.json();
    
    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, error: data.message || 'فشل في إنشاء الحجز' };
    }
  } catch (error) {
    return handleAPIError(error);
  }
};

// الحصول على جميع الحجوزات (للإدارة)
export const getAllBookings = async (filters?: {
  status?: string;
  teacherId?: string;
  studentId?: string;
  dateFrom?: string;
  dateTo?: string;
}): Promise<APIResponse<Booking[]>> => {
  try {
    const queryParams = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });
    }

    const response = await fetch(`${API_BASE_URL}/bookings?${queryParams}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    const data = await response.json();
    
    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, error: data.message || 'فشل في الحصول على الحجوزات' };
    }
  } catch (error) {
    return handleAPIError(error);
  }
};

// الحصول على حجوزات المستخدم
export const getUserBookings = async (userId: string): Promise<APIResponse<Booking[]>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/bookings`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    const data = await response.json();
    
    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, error: data.message || 'فشل في الحصول على الحجوزات' };
    }
  } catch (error) {
    return handleAPIError(error);
  }
};

// تحديث حالة الحجز
export const updateBookingStatus = async (
  bookingId: string, 
  status: 'approved' | 'rejected' | 'completed' | 'cancelled'
): Promise<APIResponse<Booking>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}/status`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status }),
    });

    const data = await response.json();
    
    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, error: data.message || 'فشل في تحديث حالة الحجز' };
    }
  } catch (error) {
    return handleAPIError(error);
  }
};

// إضافة رابط الاجتماع للحجز
export const addMeetingLink = async (bookingId: string, meetingLink: string): Promise<APIResponse<Booking>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}/meeting-link`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ meetingLink }),
    });

    const data = await response.json();
    
    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, error: data.message || 'فشل في إضافة رابط الاجتماع' };
    }
  } catch (error) {
    return handleAPIError(error);
  }
};

// تسجيل الحضور
export const recordAttendance = async (
  bookingId: string, 
  attendanceData: {
    attended: boolean;
    joinedAt?: string;
    leftAt?: string;
  }
): Promise<APIResponse<Booking>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}/attendance`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(attendanceData),
    });

    const data = await response.json();
    
    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, error: data.message || 'فشل في تسجيل الحضور' };
    }
  } catch (error) {
    return handleAPIError(error);
  }
};

// الحصول على إحصائيات الحجوزات
export const getBookingStats = async (): Promise<APIResponse<{
  totalBookings: number;
  pendingBookings: number;
  approvedBookings: number;
  completedBookings: number;
  totalRevenue: number;
}>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/bookings/stats`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    const data = await response.json();
    
    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, error: data.message || 'فشل في الحصول على الإحصائيات' };
    }
  } catch (error) {
    return handleAPIError(error);
  }
};
