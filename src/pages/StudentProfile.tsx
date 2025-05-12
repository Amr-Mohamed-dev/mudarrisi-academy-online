
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { MessageSquare, Calendar, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProfileHeader from '@/components/profile/ProfileHeader';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';

interface Booking {
  id: string;
  teacherId: string;
  teacherName: string;
  studentId: string;
  studentName: string;
  date: string;
  time: string;
  subject: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

const StudentProfile = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  
  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'student') {
      navigate('/auth');
      return;
    }
    
    // Load bookings from localStorage
    const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const studentBookings = allBookings.filter((booking: Booking) => booking.studentId === user?.id);
    setBookings(studentBookings);
  }, [isAuthenticated, user, navigate]);
  
  if (!isAuthenticated || !user) {
    return null; // Redirecting in useEffect
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <Button variant="outline" className="mb-6" onClick={() => window.history.back()}>
          <ArrowRight className="ml-2 h-4 w-4" /> العودة
        </Button>
        
        <ProfileHeader
          name={user.name}
          image={user.avatar}
          location="المملكة العربية السعودية"
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="bookings" className="bg-white rounded-lg shadow-md">
              <TabsList className="w-full border-b">
                <TabsTrigger value="bookings" className="flex-1 py-3">الحجوزات</TabsTrigger>
                <TabsTrigger value="settings" className="flex-1 py-3">إعدادات الحساب</TabsTrigger>
              </TabsList>
              
              <TabsContent value="bookings" className="p-6 focus:outline-none">
                {bookings.length > 0 ? (
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <Card key={booking.id} className="border shadow-sm">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">{booking.subject} مع {booking.teacherName}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <Calendar size={16} className="ml-2" />
                              <span>{booking.date} - {booking.time}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-500">الحالة:</span>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                booking.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {booking.status === 'confirmed' ? 'مؤكد' :
                                 booking.status === 'pending' ? 'قيد الانتظار' :
                                 booking.status === 'completed' ? 'مكتمل' : 'ملغي'}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="pt-0">
                          <Button variant="outline" className="w-full" disabled={booking.status === 'cancelled' || booking.status === 'completed'}>
                            {booking.status === 'pending' ? 'إلغاء الحجز' : 
                             booking.status === 'confirmed' ? 'تأكيد الحضور' :
                             booking.status === 'completed' ? 'تم الحضور' : 'تم الإلغاء'}
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-lg text-gray-500">ليس لديك أي حجوزات حالية</p>
                    <Button variant="link" onClick={() => navigate('/teachers')}>
                      البحث عن مدرسين
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="settings" className="p-6 focus:outline-none">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold mb-4">إعدادات الحساب</h3>
                  {/* إعدادات الحساب هنا */}
                  <p className="text-gray-600 mb-4">يمكنك تعديل بيانات حسابك من هنا.</p>
                  <Button variant="outline">تعديل البيانات الشخصية</Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div>
            <div className="sticky top-24">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4">التواصل مع الدعم</h3>
                <Button className="w-full flex items-center justify-center" variant="outline">
                  <MessageSquare className="ml-2 h-5 w-5" /> مراسلة الدعم
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default StudentProfile;
