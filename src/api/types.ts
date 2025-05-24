
// تعريف الأنواع المشتركة لجميع API calls

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'student' | 'teacher' | 'admin';
  avatar?: string;
  educationalStage?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: string;
  teacherId: string;
  teacherName: string;
  studentId: string;
  studentName: string;
  date: string;
  time: string;
  startTime: string;
  endTime: string;
  subject: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed' | 'cancelled';
  attended?: boolean;
  price: number;
  meetingLink?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'booking' | 'rating' | 'system' | 'reminder';
  read: boolean;
  createdAt: string;
}

export interface Rating {
  id: string;
  bookingId: string;
  raterId: string;
  raterName: string;
  raterRole: 'student' | 'teacher';
  targetId: string;
  targetName: string;
  rating: number;
  comment?: string;
  createdAt: string;
}

export interface AttendanceRecord {
  id: string;
  bookingId: string;
  studentId: string;
  teacherId: string;
  attended: boolean;
  joinedAt?: string;
  leftAt?: string;
  duration?: number;
  createdAt: string;
}
