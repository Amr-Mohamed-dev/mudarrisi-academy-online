
import { API_BASE_URL, getAuthHeaders, handleAPIError } from './config';
import { APIResponse, AttendanceRecord } from './types';

/**
 * API لإدارة الحضور والغياب
 * 
 * الوظائف المتاحة:
 * - تسجيل الحضور (عند الدخول للرابط)
 * - تسجيل وقت المغادرة
 * - الحصول على سجل الحضور للحجز
 * - الحصول على سجل حضور المستخدم
 * - الحصول على إحصائيات الحضور
 * - تحديث سجل الحضور
 * 
 * البيانات المعروضة:
 * - حالة الحضور (حضر/غاب)
 * - وقت الدخول للاجتماع
 * - وقت المغادرة
 * - مدة الحضور الفعلي
 * - تفاصيل الحجز المرتبطة
 * - إحصائيات معدل الحضور
 */

// تسجيل الحضور (عند الدخول للرابط)
export const recordAttendanceJoin = async (bookingId: string): Promise<APIResponse<AttendanceRecord>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/attendance/join`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ 
        bookingId,
        joinedAt: new Date().toISOString()
      }),
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

// تسجيل وقت المغادرة
export const recordAttendanceLeave = async (attendanceId: string): Promise<APIResponse<AttendanceRecord>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/attendance/${attendanceId}/leave`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ 
        leftAt: new Date().toISOString()
      }),
    });

    const data = await response.json();
    
    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, error: data.message || 'فشل في تسجيل المغادرة' };
    }
  } catch (error) {
    return handleAPIError(error);
  }
};

// الحصول على سجل الحضور للحجز
export const getBookingAttendance = async (bookingId: string): Promise<APIResponse<AttendanceRecord[]>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}/attendance`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    const data = await response.json();
    
    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, error: data.message || 'فشل في الحصول على سجل الحضور' };
    }
  } catch (error) {
    return handleAPIError(error);
  }
};

// الحصول على سجل حضور المستخدم
export const getUserAttendance = async (userId: string, filters?: {
  dateFrom?: string;
  dateTo?: string;
  status?: 'attended' | 'absent';
}): Promise<APIResponse<AttendanceRecord[]>> => {
  try {
    const queryParams = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });
    }

    const response = await fetch(`${API_BASE_URL}/users/${userId}/attendance?${queryParams}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    const data = await response.json();
    
    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, error: data.message || 'فشل في الحصول على سجل الحضور' };
    }
  } catch (error) {
    return handleAPIError(error);
  }
};

// الحصول على إحصائيات الحضور
export const getAttendanceStats = async (userId: string): Promise<APIResponse<{
  totalSessions: number;
  attendedSessions: number;
  attendanceRate: number;
  averageSessionDuration: number;
  totalHours: number;
}>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/attendance/stats`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    const data = await response.json();
    
    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, error: data.message || 'فشل في الحصول على إحصائيات الحضور' };
    }
  } catch (error) {
    return handleAPIError(error);
  }
};

// تحديث سجل الحضور يدوياً (للإدارة)
export const updateAttendanceRecord = async (
  attendanceId: string, 
  updateData: {
    attended?: boolean;
    joinedAt?: string;
    leftAt?: string;
    duration?: number;
  }
): Promise<APIResponse<AttendanceRecord>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/attendance/${attendanceId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updateData),
    });

    const data = await response.json();
    
    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, error: data.message || 'فشل في تحديث سجل الحضور' };
    }
  } catch (error) {
    return handleAPIError(error);
  }
};

// التحقق من حالة الحضور للحجز
export const checkAttendanceStatus = async (bookingId: string, userId: string): Promise<APIResponse<{
  hasJoined: boolean;
  attendanceRecord?: AttendanceRecord;
}>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}/attendance/check?userId=${userId}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    const data = await response.json();
    
    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, error: data.message || 'فشل في التحقق من حالة الحضور' };
    }
  } catch (error) {
    return handleAPIError(error);
  }
};
