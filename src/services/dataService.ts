// Mock Data Service - Replace with API calls when ready
import { User, Booking, Notification } from "@/types";

// ==================== DATA STORAGE ====================
// Store data in memory (will be lost on page refresh)
let users: User[] = [];
let bookings: Booking[] = [];
let notifications: Notification[] = [];

// Initialize with mock data
const initializeMockData = () => {
  if (users.length === 0) {
    users = [
      {
        id: "teacher_1",
        name: "محمد أحمد",
        email: "teacher1@example.com",
        phone: "0501234567",
        role: "TEACHER",
        avatar: "/placeholder.svg",
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        gender: "ذكر",
        code: "TEACHER_001",
        profileImage: "/placeholder.svg",
        isVerified: true,
        bio: "معلم ذو خبرة طويلة في الرياضيات",
        password: "",
        subjects: [],
        hourlyRate: 0,
        experience: "",
        education: "",
        rating: 0,
        totalRatings: 0,
        completedLessons: 0,
        isApproved: false,
        educationalStages: "",
      },
      {
        id: "teacher_2",
        name: "سارة علي",
        email: "teacher2@example.com",
        phone: "0559876543",
        role: "TEACHER",
        avatar: "/placeholder.svg",
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        gender: "أنثى",
        code: "TEACHER_002",
        profileImage: "/placeholder.svg",
        isVerified: true,
        bio: "متخصصة في اللغة الإنجليزية",
        password: "",
        subjects: [],
        hourlyRate: 0,
        experience: "",
        education: "",
        rating: 0,
        totalRatings: 0,
        completedLessons: 0,
        isApproved: false,
        educationalStages: "",
      },
      {
        id: "student_1",
        name: "علي محمود",
        email: "student1@example.com",
        phone: "0559876543",
        role: "STUDENT",
        profileImage: "/placeholder.svg",
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        gender: "ذكر",
        code: "STUDENT_001",
        isVerified: false,
        avatar: "",
        password: "",
        subjects: [],
        hourlyRate: 0,
        experience: "",
        education: "",
        rating: 0,
        totalRatings: 0,
        completedLessons: 0,
        isApproved: false,
        bio: "",
        educationalStages: "",
      },
      {
        id: "student_2",
        name: "نور أحمد",
        email: "student2@example.com",
        phone: "0505555555",
        role: "STUDENT",
        profileImage: "/placeholder.svg",
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        gender: "أنثى",
        code: "STUDENT_002",
        isVerified: false,
        avatar: "",
        password: "",
        subjects: [],
        hourlyRate: 0,
        experience: "",
        education: "",
        rating: 0,
        totalRatings: 0,
        completedLessons: 0,
        isApproved: false,
        bio: "",
        educationalStages: "",
      },
    ];

    bookings = [
      {
        id: "booking_1",
        teacherId: "teacher_1",
        teacherName: "محمد أحمد",
        studentId: "student_1",
        studentName: "علي محمود",
        date: "2024-12-15",
        time: "15:00",
        subject: "الرياضيات",
        status: "PENDING",
        attended: false,
        price: 50,
        createdAt: new Date().toISOString(),
      },
      {
        id: "booking_2",
        teacherId: "teacher_2",
        teacherName: "سارة علي",
        studentId: "student_2",
        studentName: "نور أحمد",
        date: "2024-12-16",
        time: "16:00",
        subject: "اللغة الإنجليزية",
        status: "APPROVED",
        attended: false,
        price: 60,
        createdAt: new Date().toISOString(),
      },
    ];
  }
};

// Initialize on first load
initializeMockData();

// ==================== USERS SERVICE ====================

export const usersService = {
  /**
   * Get all users
   * Future: return fetch('/api/users').then(r => r.json());
   */
  getAll: async (): Promise<User[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300)); // Simulate API delay
    return Promise.resolve([...users]);
  },

  /**
   * Get user by ID
   * Future: return fetch(`/api/users/${id}`).then(r => r.json());
   */
  getById: async (id: string): Promise<User | null> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return Promise.resolve(users.find((u) => u.id === id) || null);
  },

  /**
   * Get users by role
   * Future: return fetch(`/api/users?role=${role}`).then(r => r.json());
   */
  getByRole: async (role: "TEACHER" | "STUDENT" | "ADMIN"): Promise<User[]> => {
    await new Promise((resolve) => setTimeout(resolve, 250));
    return Promise.resolve(users.filter((u) => u.role === role));
  },

  /**
   * Search users by name or email
   */
  search: async (query: string): Promise<User[]> => {
    await new Promise((resolve) => setTimeout(resolve, 250));
    const lowerQuery = query.toLowerCase();
    return Promise.resolve(
      users.filter(
        (u) =>
          u.name.toLowerCase().includes(lowerQuery) ||
          u.email.toLowerCase().includes(lowerQuery)
      )
    );
  },

  /**
   * Create new user
   * Future: return fetch('/api/users', { method: 'POST', body: JSON.stringify(userData) }).then(r => r.json());
   */
  create: async (userData: Partial<User>): Promise<User> => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const newUser = {
      id: `${userData.role}_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`,
      name: userData.name || "",
      email: userData.email || "",
      phone: userData.phone || "",
      password: userData.password || "",
      role: userData.role || "STUDENT",
      avatar: userData.avatar || "/placeholder.svg",
      isActive: userData.isActive ?? true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      gender: userData.gender || "",
      code: userData.code || `${userData.role}_${Date.now()}`,
      profileImage: userData.profileImage || "/placeholder.svg",
      isVerified: userData.isVerified ?? false,
      bio: userData.bio || "",
      subjects: userData.subjects || [],
      hourlyRate: userData.hourlyRate || 0,
      experience: userData.experience || "",
      education: userData.education || "",
      rating: userData.rating || 0,
      totalRatings: userData.totalRatings || 0,
      completedLessons: userData.completedLessons || 0,
      isApproved: userData.isApproved ?? false,
      taughtCourses: userData.taughtCourses || [],
      enrolledCourses: userData.enrolledCourses || [],
      educationalStages: userData.educationalStages || "",
    } as User;

    users.push(newUser);
    return Promise.resolve(newUser);
  },

  /**
   * Update user
   * Future: return fetch(`/api/users/${id}`, { method: 'PUT', body: JSON.stringify(updates) }).then(r => r.json());
   */
  update: async (id: string, updates: Partial<User>): Promise<User | null> => {
    await new Promise((resolve) => setTimeout(resolve, 250));

    const index = users.findIndex((u) => u.id === id);
    if (index === -1) return Promise.resolve(null);

    users[index] = {
      ...users[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    } as User;

    return Promise.resolve(users[index]);
  },

  /**
   * Delete user
   * Future: return fetch(`/api/users/${id}`, { method: 'DELETE' }).then(() => true);
   */
  delete: async (id: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 250));
    users = users.filter((u) => u.id !== id);
    return Promise.resolve(true);
  },

  /**
   * Get user count
   */
  getCount: async (): Promise<number> => {
    return Promise.resolve(users.length);
  },

  /**
   * Get users by role count
   */
  getCountByRole: async (
    role: "TEACHER" | "STUDENT" | "ADMIN"
  ): Promise<number> => {
    return Promise.resolve(users.filter((u) => u.role === role).length);
  },
};

// ==================== BOOKINGS SERVICE ====================

export const bookingsService = {
  /**
   * Get all bookings
   * Future: return fetch('/api/bookings').then(r => r.json());
   */
  getAll: async (): Promise<Booking[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return Promise.resolve([...bookings]);
  },

  /**
   * Get bookings with filters
   * Future: const params = new URLSearchParams(filter).toString();
   * return fetch(`/api/bookings?${params}`).then(r => r.json());
   */
  getFiltered: async (filter: {
    status?: string;
    teacherId?: string;
    studentId?: string;
  }): Promise<Booking[]> => {
    await new Promise((resolve) => setTimeout(resolve, 250));

    let filtered = [...bookings];

    if (filter.status) {
      filtered = filtered.filter((b) => b.status === filter.status);
    }
    if (filter.teacherId) {
      filtered = filtered.filter((b) => b.teacherId === filter.teacherId);
    }
    if (filter.studentId) {
      filtered = filtered.filter((b) => b.studentId === filter.studentId);
    }

    return Promise.resolve(filtered);
  },

  /**
   * Get booking by ID
   */
  getById: async (id: string): Promise<Booking | null> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return Promise.resolve(bookings.find((b) => b.id === id) || null);
  },

  /**
   * Create new booking
   * Future: return fetch('/api/bookings', { method: 'POST', body: JSON.stringify(bookingData) }).then(r => r.json());
   */
  create: async (bookingData: Partial<Booking>): Promise<Booking> => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const newBooking: Booking = {
      id: `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      teacherId: bookingData.teacherId || "",
      teacherName: bookingData.teacherName || "",
      studentId: bookingData.studentId || "",
      studentName: bookingData.studentName || "",
      date: bookingData.date || "",
      time: bookingData.time || "",
      subject: bookingData.subject || "",
      status: "PENDING",
      attended: false,
      price: bookingData.price || 0,
      createdAt: new Date().toISOString(),
      ...bookingData,
    };

    bookings.push(newBooking);
    return Promise.resolve(newBooking);
  },

  /**
   * Update booking
   * Future: return fetch(`/api/bookings/${id}`, { method: 'PUT', body: JSON.stringify(updates) }).then(r => r.json());
   */
  update: async (
    id: string,
    updates: Partial<Booking>
  ): Promise<Booking | null> => {
    await new Promise((resolve) => setTimeout(resolve, 250));

    const index = bookings.findIndex((b) => b.id === id);
    if (index === -1) return Promise.resolve(null);

    bookings[index] = {
      ...bookings[index],
      ...updates,
    };

    return Promise.resolve(bookings[index]);
  },

  /**
   * Delete booking
   * Future: return fetch(`/api/bookings/${id}`, { method: 'DELETE' }).then(() => true);
   */
  delete: async (id: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 250));
    bookings = bookings.filter((b) => b.id !== id);
    return Promise.resolve(true);
  },

  /**
   * Approve booking
   */
  approve: async (id: string): Promise<Booking | null> => {
    return bookingsService.update(id, { status: "APPROVED" });
  },

  /**
   * Reject booking
   */
  reject: async (id: string): Promise<Booking | null> => {
    return bookingsService.update(id, { status: "REJECTED" });
  },

  /**
   * Get booking count
   */
  getCount: async (): Promise<number> => {
    return Promise.resolve(bookings.length);
  },

  /**
   * Get pending bookings count
   */
  getPendingCount: async (): Promise<number> => {
    return Promise.resolve(
      bookings.filter((b) => b.status === "PENDING").length
    );
  },

  /**
   * Get approved bookings count
   */
  getApprovedCount: async (): Promise<number> => {
    return Promise.resolve(
      bookings.filter((b) => b.status === "APPROVED").length
    );
  },
};

// ==================== NOTIFICATIONS SERVICE ====================

export const notificationsService = {
  /**
   * Get all notifications
   * Future: return fetch('/api/notifications').then(r => r.json());
   */
  getAll: async (): Promise<Notification[]> => {
    await new Promise((resolve) => setTimeout(resolve, 250));
    return Promise.resolve([...notifications]);
  },

  /**
   * Get notifications for user
   */
  getByUserId: async (userId: string): Promise<Notification[]> => {
    await new Promise((resolve) => setTimeout(resolve, 250));
    return Promise.resolve(notifications.filter((n) => n.userId === userId));
  },

  /**
   * Get unread notifications count
   */
  getUnreadCount: async (userId?: string): Promise<number> => {
    const notifs = userId
      ? notifications.filter((n) => n.userId === userId && !n.read)
      : notifications.filter((n) => !n.read);
    return Promise.resolve(notifs.length);
  },

  /**
   * Create notification
   * Future: return fetch('/api/notifications', { method: 'POST', body: JSON.stringify(notifData) }).then(r => r.json());
   */
  create: async (notifData: Partial<Notification>): Promise<Notification> => {
    await new Promise((resolve) => setTimeout(resolve, 250));

    const newNotif: Notification = {
      id: `notification_${Date.now()}`,
      userId: notifData.userId || "",
      title: notifData.title || "",
      message: notifData.message || "",
      read: false,
      createdAt: new Date().toISOString(),
      type: notifData.type || "SYSTEM",
      ...notifData,
    };

    notifications.push(newNotif);
    return Promise.resolve(newNotif);
  },

  /**
   * Mark notification as read
   * Future: return fetch(`/api/notifications/${id}`, { method: 'PATCH', body: JSON.stringify({ read: true }) }).then(r => r.json());
   */
  markAsRead: async (id: string): Promise<Notification | null> => {
    await new Promise((resolve) => setTimeout(resolve, 200));

    const index = notifications.findIndex((n) => n.id === id);
    if (index === -1) return Promise.resolve(null);

    notifications[index].read = true;
    return Promise.resolve(notifications[index]);
  },

  /**
   * Mark all user notifications as read
   */
  markAllAsRead: async (userId: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 250));

    notifications
      .filter((n) => n.userId === userId)
      .forEach((n) => (n.read = true));

    return Promise.resolve(true);
  },

  /**
   * Delete notification
   */
  delete: async (id: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    notifications = notifications.filter((n) => n.id !== id);
    return Promise.resolve(true);
  },
};

// ==================== EXPORT ALL SERVICES ====================

export const dataService = {
  users: usersService,
  bookings: bookingsService,
  notifications: notificationsService,
};

export default dataService;
