
// ملف تصدير جميع APIs للاستخدام السهل في المكونات

// Auth API
export * from './authApi';

// Users API  
export * from './usersApi';

// Bookings API
export * from './bookingsApi';

// Notifications API
export * from './notificationsApi';

// Ratings API
export * from './ratingsApi';

// Attendance API
export * from './attendanceApi';

// Types
export * from './types';

// Config
export * from './config';

// مثال على كيفية الاستخدام في المكونات:
/*
import { login, getAllBookings, createNotification } from '@/api';

// في دالة المكون
const handleLogin = async () => {
  const result = await login(email, password);
  if (result.success) {
    // تم تسجيل الدخول بنجاح
    console.log('User:', result.data?.user);
  } else {
    // خطأ في تسجيل الدخول
    console.error('Error:', result.error);
  }
};
*/
