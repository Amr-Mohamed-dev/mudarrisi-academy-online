
import { useState, useEffect } from 'react';
import { login, register, logout, getCurrentUser, updateUser, changePassword } from '@/api';
import { User } from '@/api/types';

export const useAuthAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  // تسجيل الدخول
  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    const result = await login(email, password);
    
    if (result.success) {
      setUser(result.data?.user || null);
      setLoading(false);
      return { success: true, user: result.data?.user };
    } else {
      setError(result.error || 'فشل في تسجيل الدخول');
      setLoading(false);
      return { success: false, error: result.error };
    }
  };

  // تسجيل مستخدم جديد
  const handleRegister = async (userData: {
    name: string;
    email: string;
    phone?: string;
    password: string;
    role: 'student' | 'teacher';
    educationalStage?: string;
  }) => {
    setLoading(true);
    setError(null);
    
    const result = await register(userData);
    
    if (result.success) {
      setUser(result.data?.user || null);
      setLoading(false);
      return { success: true, user: result.data?.user };
    } else {
      setError(result.error || 'فشل في إنشاء الحساب');
      setLoading(false);
      return { success: false, error: result.error };
    }
  };

  // تسجيل الخروج
  const handleLogout = async () => {
    setLoading(true);
    await logout();
    setUser(null);
    setLoading(false);
  };

  // الحصول على بيانات المستخدم الحالي
  const fetchCurrentUser = async () => {
    setLoading(true);
    const result = await getCurrentUser();
    
    if (result.success) {
      setUser(result.data || null);
    }
    setLoading(false);
    return result;
  };

  // تحديث بيانات المستخدم
  const handleUpdateUser = async (userId: string, userData: Partial<User>) => {
    setLoading(true);
    setError(null);
    
    const result = await updateUser(userId, userData);
    
    if (result.success) {
      setUser(result.data || null);
      setLoading(false);
      return { success: true, user: result.data };
    } else {
      setError(result.error || 'فشل في تحديث البيانات');
      setLoading(false);
      return { success: false, error: result.error };
    }
  };

  // تغيير كلمة المرور
  const handleChangePassword = async (oldPassword: string, newPassword: string) => {
    setLoading(true);
    setError(null);
    
    const result = await changePassword(oldPassword, newPassword);
    
    if (result.success) {
      setLoading(false);
      return { success: true };
    } else {
      setError(result.error || 'فشل في تغيير كلمة المرور');
      setLoading(false);
      return { success: false, error: result.error };
    }
  };

  return {
    user,
    loading,
    error,
    handleLogin,
    handleRegister,
    handleLogout,
    fetchCurrentUser,
    handleUpdateUser,
    handleChangePassword,
  };
};
