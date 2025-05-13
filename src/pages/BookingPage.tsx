
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const BookingPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [teacher, setTeacher] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    // Get teacher data
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundTeacher = users.find((u: any) => u.id === id && u.role === 'teacher');
    
    if (foundTeacher) {
      setTeacher(foundTeacher);
    } else {
      toast({
        title: "خطأ",
        description: "لم يتم العثور على المدرس",
        variant: "destructive",
      });
      navigate('/teachers');
    }
    
    setLoading(false);
  }, [id, navigate, user, toast]);
  
  const handleBooking = () => {
    // Create new booking
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    
    const newBooking = {
      id: `booking_${Date.now()}`,
      teacherId: teacher.id,
      teacherName: teacher.name,
      studentId: user?.id,
      studentName: user?.name,
      date: new Date().toLocaleDateString('ar-SA'),
      time: '10:00 صباحًا',
      subject: 'الرياضيات',
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    
    bookings.push(newBooking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    
    toast({
      title: "تم الحجز بنجاح",
      description: "تم إرسال طلب الحجز بنجاح وسيتم التواصل معك قريبًا",
    });
    
    navigate('/student/profile');
  };
  
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-8 flex-grow">
          <p className="text-center">جاري التحميل...</p>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <Button variant="outline" className="mb-6" onClick={() => window.history.back()}>
          <ArrowRight className="ml-2 h-4 w-4" /> العودة
        </Button>
        
        <h1 className="text-2xl font-bold mb-6">تأكيد الحجز</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>تفاصيل المدرس</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-bold text-lg">{teacher?.name}</p>
              <p className="text-gray-600">الرياضيات</p>
              <p className="text-gray-600">السعر: 150 ريال / ساعة</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>تفاصيل الحجز</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p><span className="font-bold">التاريخ:</span> {new Date().toLocaleDateString('ar-SA')}</p>
                <p><span className="font-bold">الوقت:</span> 10:00 صباحًا</p>
                <p><span className="font-bold">المادة:</span> الرياضيات</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleBooking} className="w-full">تأكيد الحجز</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BookingPage;
