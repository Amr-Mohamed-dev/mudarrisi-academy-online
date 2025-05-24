
import { useState, useEffect } from 'react';
import { 
  getUserNotifications, 
  createNotification, 
  markNotificationAsRead, 
  markAllNotificationsAsRead,
  deleteNotification,
  getUnreadNotificationsCount,
  sendBulkNotifications
} from '@/api';
import { Notification } from '@/api/types';

export const useNotificationsAPI = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // الحصول على إشعارات المستخدم
  const fetchUserNotifications = async (userId: string) => {
    setLoading(true);
    setError(null);
    
    const result = await getUserNotifications(userId);
    
    if (result.success) {
      setNotifications(result.data || []);
      setLoading(false);
      return { success: true, notifications: result.data };
    } else {
      setError(result.error || 'فشل في الحصول على الإشعارات');
      setLoading(false);
      return { success: false, error: result.error };
    }
  };

  // إنشاء إشعار جديد
  const handleCreateNotification = async (notificationData: {
    userId: string;
    title: string;
    message: string;
    type: 'booking' | 'rating' | 'system' | 'reminder';
  }) => {
    setLoading(true);
    setError(null);
    
    const result = await createNotification(notificationData);
    
    if (result.success) {
      setLoading(false);
      return { success: true, notification: result.data };
    } else {
      setError(result.error || 'فشل في إنشاء الإشعار');
      setLoading(false);
      return { success: false, error: result.error };
    }
  };

  // تحديد الإشعار كمقروء
  const handleMarkAsRead = async (notificationId: string) => {
    setLoading(true);
    setError(null);
    
    const result = await markNotificationAsRead(notificationId);
    
    if (result.success) {
      // تحديث الإشعار في القائمة المحلية
      setNotifications(prev => prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true }
          : notification
      ));
      
      // تحديث عدد الإشعارات غير المقروءة
      setUnreadCount(prev => Math.max(0, prev - 1));
      
      setLoading(false);
      return { success: true, notification: result.data };
    } else {
      setError(result.error || 'فشل في تحديث الإشعار');
      setLoading(false);
      return { success: false, error: result.error };
    }
  };

  // تحديد جميع الإشعارات كمقروءة
  const handleMarkAllAsRead = async (userId: string) => {
    setLoading(true);
    setError(null);
    
    const result = await markAllNotificationsAsRead(userId);
    
    if (result.success) {
      // تحديث جميع الإشعارات في القائمة المحلية
      setNotifications(prev => prev.map(notification => 
        ({ ...notification, read: true })
      ));
      
      setUnreadCount(0);
      setLoading(false);
      return { success: true };
    } else {
      setError(result.error || 'فشل في تحديث الإشعارات');
      setLoading(false);
      return { success: false, error: result.error };
    }
  };

  // حذف الإشعار
  const handleDeleteNotification = async (notificationId: string) => {
    setLoading(true);
    setError(null);
    
    const result = await deleteNotification(notificationId);
    
    if (result.success) {
      // إزالة الإشعار من القائمة المحلية
      setNotifications(prev => prev.filter(notification => 
        notification.id !== notificationId
      ));
      
      setLoading(false);
      return { success: true };
    } else {
      setError(result.error || 'فشل في حذف الإشعار');
      setLoading(false);
      return { success: false, error: result.error };
    }
  };

  // الحصول على عدد الإشعارات غير المقروءة
  const fetchUnreadCount = async (userId: string) => {
    const result = await getUnreadNotificationsCount(userId);
    
    if (result.success) {
      setUnreadCount(result.data?.count || 0);
      return { success: true, count: result.data?.count };
    } else {
      return { success: false, error: result.error };
    }
  };

  // إرسال إشعارات للمجموعة
  const handleSendBulkNotifications = async (notificationsData: {
    userIds: string[];
    title: string;
    message: string;
    type: 'booking' | 'rating' | 'system' | 'reminder';
  }) => {
    setLoading(true);
    setError(null);
    
    const result = await sendBulkNotifications(notificationsData);
    
    if (result.success) {
      setLoading(false);
      return { success: true, notifications: result.data };
    } else {
      setError(result.error || 'فشل في إرسال الإشعارات');
      setLoading(false);
      return { success: false, error: result.error };
    }
  };

  return {
    notifications,
    unreadCount,
    loading,
    error,
    fetchUserNotifications,
    handleCreateNotification,
    handleMarkAsRead,
    handleMarkAllAsRead,
    handleDeleteNotification,
    fetchUnreadCount,
    handleSendBulkNotifications,
  };
};
