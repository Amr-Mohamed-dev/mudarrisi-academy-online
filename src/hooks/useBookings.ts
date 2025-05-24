
import { useState, useEffect } from 'react';
import { 
  createBooking, 
  getAllBookings, 
  getUserBookings, 
  updateBookingStatus, 
  addMeetingLink, 
  recordAttendance,
  getBookingStats 
} from '@/api';
import { Booking } from '@/api/types';

export const useBookingsAPI = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // إنشاء حجز جديد
  const handleCreateBooking = async (bookingData: {
    teacherId: string;
    date: string;
    startTime: string;
    endTime: string;
    subject: string;
  }) => {
    setLoading(true);
    setError(null);
    
    const result = await createBooking(bookingData);
    
    if (result.success) {
      setLoading(false);
      return { success: true, booking: result.data };
    } else {
      setError(result.error || 'فشل في إنشاء الحجز');
      setLoading(false);
      return { success: false, error: result.error };
    }
  };

  // الحصول على جميع الحجوزات (للإدارة)
  const fetchAllBookings = async (filters?: {
    status?: string;
    teacherId?: string;
    studentId?: string;
    dateFrom?: string;
    dateTo?: string;
  }) => {
    setLoading(true);
    setError(null);
    
    const result = await getAllBookings(filters);
    
    if (result.success) {
      setBookings(result.data || []);
      setLoading(false);
      return { success: true, bookings: result.data };
    } else {
      setError(result.error || 'فشل في الحصول على الحجوزات');
      setLoading(false);
      return { success: false, error: result.error };
    }
  };

  // الحصول على حجوزات المستخدم
  const fetchUserBookings = async (userId: string) => {
    setLoading(true);
    setError(null);
    
    const result = await getUserBookings(userId);
    
    if (result.success) {
      setBookings(result.data || []);
      setLoading(false);
      return { success: true, bookings: result.data };
    } else {
      setError(result.error || 'فشل في الحصول على الحجوزات');
      setLoading(false);
      return { success: false, error: result.error };
    }
  };

  // تحديث حالة الحجز
  const handleUpdateBookingStatus = async (
    bookingId: string, 
    status: 'approved' | 'rejected' | 'completed' | 'cancelled'
  ) => {
    setLoading(true);
    setError(null);
    
    const result = await updateBookingStatus(bookingId, status);
    
    if (result.success) {
      // تحديث الحجز في القائمة المحلية
      setBookings(prev => prev.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: status }
          : booking
      ));
      setLoading(false);
      return { success: true, booking: result.data };
    } else {
      setError(result.error || 'فشل في تحديث حالة الحجز');
      setLoading(false);
      return { success: false, error: result.error };
    }
  };

  // إضافة رابط الاجتماع
  const handleAddMeetingLink = async (bookingId: string, meetingLink: string) => {
    setLoading(true);
    setError(null);
    
    const result = await addMeetingLink(bookingId, meetingLink);
    
    if (result.success) {
      // تحديث الحجز في القائمة المحلية
      setBookings(prev => prev.map(booking => 
        booking.id === bookingId 
          ? { ...booking, meetingLink: meetingLink }
          : booking
      ));
      setLoading(false);
      return { success: true, booking: result.data };
    } else {
      setError(result.error || 'فشل في إضافة رابط الاجتماع');
      setLoading(false);
      return { success: false, error: result.error };
    }
  };

  // تسجيل الحضور
  const handleRecordAttendance = async (
    bookingId: string, 
    attendanceData: {
      attended: boolean;
      joinedAt?: string;
      leftAt?: string;
    }
  ) => {
    setLoading(true);
    setError(null);
    
    const result = await recordAttendance(bookingId, attendanceData);
    
    if (result.success) {
      // تحديث الحجز في القائمة المحلية
      setBookings(prev => prev.map(booking => 
        booking.id === bookingId 
          ? { ...booking, attended: attendanceData.attended }
          : booking
      ));
      setLoading(false);
      return { success: true, booking: result.data };
    } else {
      setError(result.error || 'فشل في تسجيل الحضور');
      setLoading(false);
      return { success: false, error: result.error };
    }
  };

  // الحصول على إحصائيات الحجوزات
  const fetchBookingStats = async () => {
    setLoading(true);
    setError(null);
    
    const result = await getBookingStats();
    
    setLoading(false);
    
    if (result.success) {
      return { success: true, stats: result.data };
    } else {
      setError(result.error || 'فشل في الحصول على الإحصائيات');
      return { success: false, error: result.error };
    }
  };

  return {
    bookings,
    loading,
    error,
    handleCreateBooking,
    fetchAllBookings,
    fetchUserBookings,
    handleUpdateBookingStatus,
    handleAddMeetingLink,
    handleRecordAttendance,
    fetchBookingStats,
  };
};
