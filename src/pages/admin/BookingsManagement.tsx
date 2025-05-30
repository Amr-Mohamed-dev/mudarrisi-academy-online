import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle, XCircle, Calendar, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BookingFilters from '@/components/admin/BookingFilters';
import BookingActions from '@/components/admin/BookingActions';

interface Booking {
  id: string;
  teacherId: string;
  teacherName: string;
  studentId: string;
  studentName: string;
  date: string;
  time: string;
  subject: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed' | 'cancelled';
  attended?: boolean;
  price: number;
  createdAt: string;
}

const BookingsManagement = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      navigate('/auth');
      return;
    }
    
    loadBookings();
  }, [isAuthenticated, user, navigate]);
  
  useEffect(() => {
    filterBookings();
  }, [bookings, statusFilter]);
  
  const loadBookings = () => {
    const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    setBookings(allBookings);
  };
  
  const filterBookings = () => {
    if (statusFilter === 'all') {
      setFilteredBookings(bookings);
    } else {
      setFilteredBookings(bookings.filter(booking => booking.status === statusFilter));
    }
  };
  
  const handleApproveBooking = (bookingId: string) => {
    const updatedBookings = bookings.map(booking => {
      if (booking.id === bookingId) {
        return { ...booking, status: 'approved' as const };
      }
      return booking;
    });
    
    setBookings(updatedBookings);
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    
    // إرسال إشعار للطالب والمدرس
    const booking = updatedBookings.find(b => b.id === bookingId);
    if (booking) {
      const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
      
      // إشعار للطالب
      notifications.push({
        id: `notification_${Date.now()}_student`,
        userId: booking.studentId,
        title: 'تم قبول حجزك',
        message: `تم قبول حجزك مع المدرس ${booking.teacherName} في ${booking.date} الساعة ${booking.time}`,
        read: false,
        createdAt: new Date().toISOString()
      });
      
      // إشعار للمدرس
      notifications.push({
        id: `notification_${Date.now()}_teacher`,
        userId: booking.teacherId,
        title: 'حجز جديد تم قبوله',
        message: `تم قبول حجز الطالب ${booking.studentName} معك في ${booking.date} الساعة ${booking.time}`,
        read: false,
        createdAt: new Date().toISOString()
      });
      
      localStorage.setItem('notifications', JSON.stringify(notifications));
    }
    
    toast({
      title: "تم قبول الحجز",
      description: "تم قبول الحجز وإرسال إشعارات للطالب والمدرس",
    });
  };
  
  const handleRejectBooking = (bookingId: string) => {
    const updatedBookings = bookings.map(booking => {
      if (booking.id === bookingId) {
        return { ...booking, status: 'rejected' as const };
      }
      return booking;
    });
    
    setBookings(updatedBookings);
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    
    // إرسال إشعار للطالب
    const booking = updatedBookings.find(b => b.id === bookingId);
    if (booking) {
      const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
      
      notifications.push({
        id: `notification_${Date.now()}`,
        userId: booking.studentId,
        title: 'تم رفض حجزك',
        message: `نأسف، تم رفض حجزك مع المدرس ${booking.teacherName}. يمكنك المحاولة مع مدرس آخر.`,
        read: false,
        createdAt: new Date().toISOString()
      });
      
      localStorage.setItem('notifications', JSON.stringify(notifications));
    }
    
    toast({
      title: "تم رفض الحجز",
      description: "تم رفض الحجز وإرسال إشعار للطالب",
    });
  };
  
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'قيد الانتظار', variant: 'secondary' as const },
      approved: { label: 'مقبول', variant: 'default' as const },
      rejected: { label: 'مرفوض', variant: 'destructive' as const },
      completed: { label: 'مكتمل', variant: 'default' as const },
      cancelled: { label: 'ملغي', variant: 'outline' as const }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button variant="outline" onClick={() => navigate('/admin')} className="ml-4">
            <ArrowRight className="h-4 w-4 ml-2" />
            العودة
          </Button>
          <h1 className="text-2xl font-bold">إدارة الحجوزات</h1>
        </div>
      </div>
      
      <BookingFilters 
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full mb-6">
          <TabsTrigger value="all" className="flex-1">جميع الحجوزات</TabsTrigger>
          <TabsTrigger value="pending" className="flex-1">قيد الانتظار</TabsTrigger>
          <TabsTrigger value="approved" className="flex-1">المقبولة</TabsTrigger>
          <TabsTrigger value="completed" className="flex-1">المكتملة</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBookings.map((booking) => (
              <Card key={booking.id} className="border shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{booking.subject}</CardTitle>
                    {getStatusBadge(booking.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p><strong>المدرس:</strong> {booking.teacherName}</p>
                    <p><strong>الطالب:</strong> {booking.studentName}</p>
                    <div className="flex items-center">
                      <Calendar size={16} className="ml-1" />
                      <span>{booking.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock size={16} className="ml-1" />
                      <span>{booking.time}</span>
                    </div>
                    <p><strong>السعر:</strong> {booking.price} ريال</p>
                    
                    {booking.attended && (
                      <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-md">
                        <p className="text-green-700 text-sm">حضر الطالب هذا الدرس</p>
                      </div>
                    )}
                  </div>
                  
                  <BookingActions 
                    booking={booking}
                    onApprove={handleApproveBooking}
                    onReject={handleRejectBooking}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* باقي التبويبات تستخدم نفس العرض مع فلترة مختلفة */}
        <TabsContent value="pending">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bookings.filter(b => b.status === 'pending').map((booking) => (
              <Card key={booking.id} className="border shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{booking.subject}</CardTitle>
                    {getStatusBadge(booking.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p><strong>المدرس:</strong> {booking.teacherName}</p>
                    <p><strong>الطالب:</strong> {booking.studentName}</p>
                    <div className="flex items-center">
                      <Calendar size={16} className="ml-1" />
                      <span>{booking.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock size={16} className="ml-1" />
                      <span>{booking.time}</span>
                    </div>
                    <p><strong>السعر:</strong> {booking.price} ريال</p>
                    
                    {booking.attended && (
                      <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-md">
                        <p className="text-green-700 text-sm">حضر الطالب هذا الدرس</p>
                      </div>
                    )}
                  </div>
                  
                  <BookingActions 
                    booking={booking}
                    onApprove={handleApproveBooking}
                    onReject={handleRejectBooking}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="approved">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bookings.filter(b => b.status === 'approved').map((booking) => (
              <Card key={booking.id} className="border shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{booking.subject}</CardTitle>
                    {getStatusBadge(booking.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p><strong>المدرس:</strong> {booking.teacherName}</p>
                    <p><strong>الطالب:</strong> {booking.studentName}</p>
                    <div className="flex items-center">
                      <Calendar size={16} className="ml-1" />
                      <span>{booking.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock size={16} className="ml-1" />
                      <span>{booking.time}</span>
                    </div>
                    <p><strong>السعر:</strong> {booking.price} ريال</p>
                    
                    {booking.attended && (
                      <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-md">
                        <p className="text-green-700 text-sm">حضر الطالب هذا الدرس</p>
                      </div>
                    )}
                  </div>
                  
                  <BookingActions 
                    booking={booking}
                    onApprove={handleApproveBooking}
                    onReject={handleRejectBooking}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="completed">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bookings.filter(b => b.status === 'completed').map((booking) => (
              <Card key={booking.id} className="border shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{booking.subject}</CardTitle>
                    {getStatusBadge(booking.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p><strong>المدرس:</strong> {booking.teacherName}</p>
                    <p><strong>الطالب:</strong> {booking.studentName}</p>
                    <div className="flex items-center">
                      <Calendar size={16} className="ml-1" />
                      <span>{booking.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock size={16} className="ml-1" />
                      <span>{booking.time}</span>
                    </div>
                    <p><strong>السعر:</strong> {booking.price} ريال</p>
                    
                    {booking.attended && (
                      <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-md">
                        <p className="text-green-700 text-sm">حضر الطالب هذا الدرس</p>
                      </div>
                    )}
                  </div>
                  
                  <BookingActions 
                    booking={booking}
                    onApprove={handleApproveBooking}
                    onReject={handleRejectBooking}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      {filteredBookings.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">لا توجد حجوزات متاحة</p>
        </div>
      )}
    </div>
  );
};

export default BookingsManagement;
