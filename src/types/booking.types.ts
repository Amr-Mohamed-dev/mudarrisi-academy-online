// Booking Status Type
export type BookingStatus = "PENDING" | "APPROVED" | "REJECTED" | "COMPLETED" | "CANCELLED";

// Booking Type
export interface Booking {
  id: string;
  teacherId: string;
  teacherName: string;
  studentId: string;
  studentName: string;
  date: string;
  time: string;
  subject: string;
  status: BookingStatus;
  attended?: boolean;
  price: number;
  createdAt: string;
}

// Notification Type
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  type?: "SYSTEM" | "BOOKING" | "MESSAGE" | "RATING";
}

// Filter Options
export interface BookingFilterOptions {
  status?: BookingStatus;
  teacherId?: string;
  studentId?: string;
}