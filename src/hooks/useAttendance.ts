
import { useState } from 'react';
import { 
  recordAttendanceJoin, 
  recordAttendanceLeave,
  getBookingAttendance,
  getUserAttendance,
  getAttendanceStats,
  updateAttendanceRecord,
  checkAttendanceStatus
} from '@/api';
import { AttendanceRecord } from '@/api/types';

export const useAttendanceAPI = () => {
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // تسجيل الحضور (عند الدخول للرابط)
  const handleRecordJoin = async (bookingId: string) => {
    setLoading(true);
    setError(null);
    
    const result = await recordAttendanceJoin(bookingId);
    
    if (result.success) {
      setLoading(false);
      return { success: true, attendance: result.data };
    } else {
      setError(result.error || 'فشل في تسجيل الحضور');
      setLoading(false);
      return { success: false, error: result.error };
    }
  };

  // تسجيل وقت المغادرة
  const handleRecordLeave = async (attendanceId: string) => {
    setLoading(true);
    setError(null);
    
    const result = await recordAttendanceLeave(attendanceId);
    
    if (result.success) {
      // تحديث سجل الحضور في القائمة المحلية
      setAttendanceRecords(prev => prev.map(record => 
        record.id === attendanceId 
          ? { ...record, leftAt: result.data?.leftAt }
          : record
      ));
      
      setLoading(false);
      return { success: true, attendance: result.data };
    } else {
      setError(result.error || 'فشل في تسجيل المغادرة');
      setLoading(false);
      return { success: false, error: result.error };
    }
  };

  // الحصول على سجل الحضور للحجز
  const fetchBookingAttendance = async (bookingId: string) => {
    setLoading(true);
    setError(null);
    
    const result = await getBookingAttendance(bookingId);
    
    if (result.success) {
      setAttendanceRecords(result.data || []);
      setLoading(false);
      return { success: true, attendance: result.data };
    } else {
      setError(result.error || 'فشل في الحصول على سجل الحضور');
      setLoading(false);
      return { success: false, error: result.error };
    }
  };

  // الحصول على سجل حضور المستخدم
  const fetchUserAttendance = async (userId: string, filters?: {
    dateFrom?: string;
    dateTo?: string;
    status?: 'attended' | 'absent';
  }) => {
    setLoading(true);
    setError(null);
    
    const result = await getUserAttendance(userId, filters);
    
    if (result.success) {
      setAttendanceRecords(result.data || []);
      setLoading(false);
      return { success: true, attendance: result.data };
    } else {
      setError(result.error || 'فشل في الحصول على سجل الحضور');
      setLoading(false);
      return { success: false, error: result.error };
    }
  };

  // الحصول على إحصائيات الحضور
  const fetchAttendanceStats = async (userId: string) => {
    setLoading(true);
    setError(null);
    
    const result = await getAttendanceStats(userId);
    
    setLoading(false);
    
    if (result.success) {
      return { 
        success: true, 
        totalSessions: result.data?.totalSessions,
        attendedSessions: result.data?.attendedSessions,
        attendanceRate: result.data?.attendanceRate,
        averageSessionDuration: result.data?.averageSessionDuration,
        totalHours: result.data?.totalHours
      };
    } else {
      setError(result.error || 'فشل في الحصول على إحصائيات الحضور');
      return { success: false, error: result.error };
    }
  };

  // تحديث سجل الحضور يدوياً (للإدارة)
  const handleUpdateAttendanceRecord = async (
    attendanceId: string, 
    updateData: {
      attended?: boolean;
      joinedAt?: string;
      leftAt?: string;
      duration?: number;
    }
  ) => {
    setLoading(true);
    setError(null);
    
    const result = await updateAttendanceRecord(attendanceId, updateData);
    
    if (result.success) {
      // تحديث سجل الحضور في القائمة المحلية
      setAttendanceRecords(prev => prev.map(record => 
        record.id === attendanceId 
          ? { ...record, ...updateData }
          : record
      ));
      
      setLoading(false);
      return { success: true, attendance: result.data };
    } else {
      setError(result.error || 'فشل في تحديث سجل الحضور');
      setLoading(false);
      return { success: false, error: result.error };
    }
  };

  // التحقق من حالة الحضور للحجز
  const checkAttendanceStatusForBooking = async (bookingId: string, userId: string) => {
    setLoading(true);
    setError(null);
    
    const result = await checkAttendanceStatus(bookingId, userId);
    
    setLoading(false);
    
    if (result.success) {
      return { 
        success: true, 
        hasJoined: result.data?.hasJoined,
        attendanceRecord: result.data?.attendanceRecord
      };
    } else {
      setError(result.error || 'فشل في التحقق من حالة الحضور');
      return { success: false, error: result.error };
    }
  };

  return {
    attendanceRecords,
    loading,
    error,
    handleRecordJoin,
    handleRecordLeave,
    fetchBookingAttendance,
    fetchUserAttendance,
    fetchAttendanceStats,
    handleUpdateAttendanceRecord,
    checkAttendanceStatusForBooking,
  };
};
