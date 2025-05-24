
import { useState } from 'react';
import { 
  getAllUsers, 
  getTeachers, 
  getStudents,
  getUser,
  toggleUserStatus,
  deleteUser,
  searchUsers,
  getUserStats
} from '@/api';
import { User } from '@/api/types';

export const useUsersAPI = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // الحصول على جميع المستخدمين (للإدارة)
  const fetchAllUsers = async (filters?: {
    role?: 'student' | 'teacher' | 'admin';
    isActive?: boolean;
    search?: string;
  }) => {
    setLoading(true);
    setError(null);
    
    const result = await getAllUsers(filters);
    
    if (result.success) {
      setUsers(result.data || []);
      setLoading(false);
      return { success: true, users: result.data };
    } else {
      setError(result.error || 'فشل في الحصول على المستخدمين');
      setLoading(false);
      return { success: false, error: result.error };
    }
  };

  // الحصول على المدرسين
  const fetchTeachers = async (filters?: {
    isActive?: boolean;
    subject?: string;
    search?: string;
  }) => {
    setLoading(true);
    setError(null);
    
    const result = await getTeachers(filters);
    
    if (result.success) {
      setUsers(result.data || []);
      setLoading(false);
      return { success: true, teachers: result.data };
    } else {
      setError(result.error || 'فشل في الحصول على المدرسين');
      setLoading(false);
      return { success: false, error: result.error };
    }
  };

  // الحصول على الطلاب
  const fetchStudents = async (filters?: {
    isActive?: boolean;
    educationalStage?: string;
    search?: string;
  }) => {
    setLoading(true);
    setError(null);
    
    const result = await getStudents(filters);
    
    if (result.success) {
      setUsers(result.data || []);
      setLoading(false);
      return { success: true, students: result.data };
    } else {
      setError(result.error || 'فشل في الحصول على الطلاب');
      setLoading(false);
      return { success: false, error: result.error };
    }
  };

  // الحصول على مستخدم معين
  const fetchUser = async (userId: string) => {
    setLoading(true);
    setError(null);
    
    const result = await getUser(userId);
    
    if (result.success) {
      setLoading(false);
      return { success: true, user: result.data };
    } else {
      setError(result.error || 'فشل في الحصول على بيانات المستخدم');
      setLoading(false);
      return { success: false, error: result.error };
    }
  };

  // تفعيل/إلغاء تفعيل المستخدم
  const handleToggleUserStatus = async (userId: string, isActive: boolean) => {
    setLoading(true);
    setError(null);
    
    const result = await toggleUserStatus(userId, isActive);
    
    if (result.success) {
      // تحديث المستخدم في القائمة المحلية
      setUsers(prev => prev.map(user => 
        user.id === userId 
          ? { ...user, isActive: isActive }
          : user
      ));
      
      setLoading(false);
      return { success: true, user: result.data };
    } else {
      setError(result.error || 'فشل في تحديث حالة المستخدم');
      setLoading(false);
      return { success: false, error: result.error };
    }
  };

  // حذف المستخدم
  const handleDeleteUser = async (userId: string) => {
    setLoading(true);
    setError(null);
    
    const result = await deleteUser(userId);
    
    if (result.success) {
      // إزالة المستخدم من القائمة المحلية
      setUsers(prev => prev.filter(user => user.id !== userId));
      
      setLoading(false);
      return { success: true };
    } else {
      setError(result.error || 'فشل في حذف المستخدم');
      setLoading(false);
      return { success: false, error: result.error };
    }
  };

  // البحث عن المستخدمين
  const handleSearchUsers = async (query: string, role?: 'student' | 'teacher') => {
    setLoading(true);
    setError(null);
    
    const result = await searchUsers(query, role);
    
    if (result.success) {
      setUsers(result.data || []);
      setLoading(false);
      return { success: true, users: result.data };
    } else {
      setError(result.error || 'فشل في البحث عن المستخدمين');
      setLoading(false);
      return { success: false, error: result.error };
    }
  };

  // الحصول على إحصائيات المستخدمين
  const fetchUserStats = async () => {
    setLoading(true);
    setError(null);
    
    const result = await getUserStats();
    
    setLoading(false);
    
    if (result.success) {
      return { 
        success: true, 
        totalUsers: result.data?.totalUsers,
        totalStudents: result.data?.totalStudents,
        totalTeachers: result.data?.totalTeachers,
        activeUsers: result.data?.activeUsers,
        newUsersThisMonth: result.data?.newUsersThisMonth
      };
    } else {
      setError(result.error || 'فشل في الحصول على إحصائيات المستخدمين');
      return { success: false, error: result.error };
    }
  };

  return {
    users,
    loading,
    error,
    fetchAllUsers,
    fetchTeachers,
    fetchStudents,
    fetchUser,
    handleToggleUserStatus,
    handleDeleteUser,
    handleSearchUsers,
    fetchUserStats,
  };
};
