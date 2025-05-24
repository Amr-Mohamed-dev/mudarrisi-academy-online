
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bell, Check, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

const NotificationManager = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  
  useEffect(() => {
    if (user) {
      loadNotifications();
    }
  }, [user]);
  
  const loadNotifications = () => {
    const allNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    const userNotifications = allNotifications
      .filter((notification: Notification) => notification.userId === user?.id)
      .sort((a: Notification, b: Notification) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    setNotifications(userNotifications);
    setUnreadCount(userNotifications.filter((n: Notification) => !n.read).length);
  };
  
  const markAsRead = (notificationId: string) => {
    const allNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    const updatedNotifications = allNotifications.map((notification: Notification) => {
      if (notification.id === notificationId) {
        return { ...notification, read: true };
      }
      return notification;
    });
    
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
    loadNotifications();
  };
  
  const deleteNotification = (notificationId: string) => {
    const allNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    const filteredNotifications = allNotifications.filter((notification: Notification) => notification.id !== notificationId);
    
    localStorage.setItem('notifications', JSON.stringify(filteredNotifications));
    loadNotifications();
  };
  
  const markAllAsRead = () => {
    const allNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    const updatedNotifications = allNotifications.map((notification: Notification) => {
      if (notification.userId === user?.id) {
        return { ...notification, read: true };
      }
      return notification;
    });
    
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
    loadNotifications();
  };
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>الإشعارات</span>
            {unreadCount > 0 && (
              <Button size="sm" variant="outline" onClick={markAllAsRead}>
                تعيين الكل كمقروء
              </Button>
            )}
          </DialogTitle>
        </DialogHeader>
        <div className="max-h-96 overflow-y-auto space-y-2">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <Card key={notification.id} className={`${notification.read ? 'opacity-60' : ''}`}>
                <CardContent className="p-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{notification.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-400 mt-2">
                        {new Date(notification.createdAt).toLocaleDateString('ar-SA')}
                      </p>
                    </div>
                    <div className="flex gap-1 ml-2">
                      {!notification.read && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <Check className="h-3 w-3" />
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteNotification(notification.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-4 text-gray-500">
              لا توجد إشعارات
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationManager;
