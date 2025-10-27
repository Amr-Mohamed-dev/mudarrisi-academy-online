
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import RatingForm from '@/components/RatingForm';
import { useToast } from '@/hooks/use-toast';
import { TabsContent, TabsList, TabsTrigger, Tabs } from '@/components/ui/tabs';

interface Booking {
  id: string;
  teacherId: string;
  teacherName: string;
  studentId: string;
  studentName: string;
  date: string;
  time: string;
  subject: string;
  status: string;
  attended?: boolean;
  createdAt: string;
}

const TeacherRatings = () => {
  const user = null; // TODO: Replace with actual auth
  const isAuthenticated = false; // TODO: Replace with actual auth
  const navigate = useNavigate();
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isRatingDialogOpen, setIsRatingDialogOpen] = useState(false);
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
    
    if (user?.role !== 'teacher') {
      toast({
        title: "غير مصرح",
        description: "هذه الصفحة مخصصة للمدرسين فقط",
        variant: "destructive",
      });
      navigate('/');
      return;
    }
    
    loadBookings();
  }, [isAuthenticated, user, navigate, toast]);
  
  const loadBookings = () => {
    const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const teacherBookings = allBookings.filter((booking: Booking) => 
      booking.teacherId === user?.id && 
      booking.status === 'completed' &&
      booking.attended === true
    );
    setBookings(teacherBookings);
  };
  
  const hasRated = (bookingId: string) => {
    const ratings = JSON.parse(localStorage.getItem('ratings') || '[]');
    return ratings.some(
      (rating: any) => rating.bookingId === bookingId && rating.raterRole === 'teacher'
    );
  };
  
  const handleRateStudent = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsRatingDialogOpen(true);
  };
  
  const handleRatingComplete = () => {
    setIsRatingDialogOpen(false);
    loadBookings(); // تحديث قائمة الحجوزات
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <Button variant="outline" className="mb-6" onClick={() => window.history.back()}>
          <ArrowRight className="ml-2 h-4 w-4" /> العودة
        </Button>
        
        <h1 className="text-2xl font-bold mb-6">تقييم الطلاب</h1>
        
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="w-full mb-6">
            <TabsTrigger value="pending" className="flex-1">بانتظار التقييم</TabsTrigger>
            <TabsTrigger value="rated" className="flex-1">تم تقييمهم</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bookings.filter(booking => !hasRated(booking.id)).length > 0 ? (
                bookings.filter(booking => !hasRated(booking.id)).map((booking) => (
                  <Card key={booking.id} className="border shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">
                        {booking.subject} مع {booking.studentName}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-2">
                        التاريخ: {booking.date} - {booking.time}
                      </p>
                      <div className="p-2 bg-green-50 border border-green-200 rounded-md">
                        <p className="text-green-700 text-sm">حضر الطالب هذا الدرس</p>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button 
                        variant="default" 
                        className="w-full flex items-center justify-center"
                        onClick={() => handleRateStudent(booking)}
                      >
                        <Star className="ml-2 h-4 w-4" /> 
                        تقييم الطالب
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-2 text-center py-8">
                  <p className="text-gray-500">لا يوجد طلاب بانتظار التقييم</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="rated">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bookings.filter(booking => hasRated(booking.id)).length > 0 ? (
                bookings.filter(booking => hasRated(booking.id)).map((booking) => {
                  const ratings = JSON.parse(localStorage.getItem('ratings') || '[]');
                  const rating = ratings.find(
                    (r: any) => r.bookingId === booking.id && r.raterRole === 'teacher'
                  );
                  
                  return (
                    <Card key={booking.id} className="border shadow-sm">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">
                          {booking.subject} مع {booking.studentName}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-2">
                          التاريخ: {booking.date} - {booking.time}
                        </p>
                        <div className="p-3 bg-gray-50 border border-gray-200 rounded-md">
                          <div className="flex items-center mb-2">
                            <p className="text-gray-700 ml-2">التقييم:</p>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i}
                                  className={`h-4 w-4 ${i < (rating?.rating || 0) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                                />
                              ))}
                            </div>
                          </div>
                          {rating?.comment && (
                            <p className="text-gray-600 text-sm">
                              <strong>تعليق:</strong> {rating.comment}
                            </p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              ) : (
                <div className="col-span-2 text-center py-8">
                  <p className="text-gray-500">لم تقم بتقييم أي طالب بعد</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      {/* مربع حوار تقييم الطالب */}
      <Dialog open={isRatingDialogOpen} onOpenChange={setIsRatingDialogOpen}>
        <DialogContent className="sm:max-w-md">
          {selectedBooking && (
            <RatingForm
              bookingId={selectedBooking.id}
              targetId={selectedBooking.studentId}
              targetName={selectedBooking.studentName}
              raterRole="teacher"
              onComplete={handleRatingComplete}
            />
          )}
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default TeacherRatings;
