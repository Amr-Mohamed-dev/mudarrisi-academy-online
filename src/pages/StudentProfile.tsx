import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { MessageSquare, Calendar, ArrowRight, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProfileHeader from "@/components/profile/ProfileHeader";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import AttendanceConfirmation from "@/components/AttendanceConfirmation";
import RatingForm from "@/components/RatingForm";

interface Booking {
  id: string;
  teacherId: string;
  teacherName: string;
  studentId: string;
  studentName: string;
  date: string;
  time: string;
  subject: string;
  status: "pending" | "approved" | "rejected" | "completed" | "cancelled";
  attended?: boolean;
  rated?: boolean;
  createdAt: string;
}

const StudentProfile = () => {
  const user = null; // TODO: Replace with actual auth
  const isAuthenticated = false; // TODO: Replace with actual auth
  const navigate = useNavigate();
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isAttendanceDialogOpen, setIsAttendanceDialogOpen] = useState(false);
  const [isRatingDialogOpen, setIsRatingDialogOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
      return;
    }

    if (user?.role !== "student") {
      toast({
        title: "غير مصرح",
        description: "هذه الصفحة مخصصة للطلاب فقط",
        variant: "destructive",
      });
      navigate("/");
      return;
    }

    // Load bookings from localStorage
    loadBookings();
  }, [isAuthenticated, user, navigate, toast]);

  const loadBookings = () => {
    const allBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    const studentBookings = allBookings.filter(
      (booking: Booking) => booking.studentId === user?.id
    );
    setBookings(studentBookings);
  };

  const handleCancelBooking = (bookingId: string) => {
    const allBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    const updatedBookings = allBookings.map((booking: Booking) => {
      if (booking.id === bookingId) {
        return { ...booking, status: "cancelled" };
      }
      return booking;
    });

    localStorage.setItem("bookings", JSON.stringify(updatedBookings));

    // Update the local state
    loadBookings();

    toast({
      title: "تم إلغاء الحجز",
      description: "تم إلغاء الحجز بنجاح",
    });
  };

  const handleConfirmAttendance = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsAttendanceDialogOpen(true);
  };

  const handleRateTeacher = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsRatingDialogOpen(true);
  };

  const handleAttendanceConfirmed = () => {
    setIsAttendanceDialogOpen(false);
    loadBookings(); // تحديث قائمة الحجوزات
  };

  const handleRatingComplete = () => {
    // تحديث حالة التقييم في الحجز
    const allBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    const updatedBookings = allBookings.map((booking: Booking) => {
      if (booking.id === selectedBooking?.id) {
        return { ...booking, rated: true };
      }
      return booking;
    });

    localStorage.setItem("bookings", JSON.stringify(updatedBookings));

    setIsRatingDialogOpen(false);
    loadBookings(); // تحديث قائمة الحجوزات
  };

  const hasRated = (bookingId: string) => {
    const ratings = JSON.parse(localStorage.getItem("ratings") || "[]");
    return ratings.some(
      (rating: any) =>
        rating.bookingId === bookingId && rating.raterRole === "student"
    );
  };

  const getBookingStatusText = (status: string) => {
    switch (status) {
      case "approved":
        return "مؤكد";
      case "pending":
        return "قيد الانتظار";
      case "completed":
        return "مكتمل";
      case "rejected":
        return "مرفوض";
      case "cancelled":
        return "ملغي";
      default:
        return status;
    }
  };

  const getBookingStatusClass = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "rejected":
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (!isAuthenticated || !user) {
    return null; // Redirecting in useEffect
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="container mx-auto px-4 py-8 flex-grow">
        <Button
          variant="outline"
          className="mb-6"
          onClick={() => window.history.back()}>
          <ArrowRight className="ml-2 h-4 w-4" /> العودة
        </Button>

        <ProfileHeader
          name={user.name}
          image={user.avatar}
          location="المملكة العربية السعودية"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs
              defaultValue="bookings"
              className="bg-card text-card-foreground rounded-lg shadow-md border">
              <TabsList className="w-full border-b">
                <TabsTrigger value="bookings" className="flex-1 py-3">
                  الحجوزات
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex-1 py-3">
                  إعدادات الحساب
                </TabsTrigger>
              </TabsList>

              <TabsContent value="bookings" className="p-6 focus:outline-none">
                {bookings.length > 0 ? (
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <Card
                        key={booking.id}
                        className="border shadow-sm bg-card text-card-foreground">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">
                            {booking.subject} مع {booking.teacherName}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <Calendar size={16} className="ml-2" />
                              <span>
                                {booking.date} - {booking.time}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                الحالة:
                              </span>
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${getBookingStatusClass(
                                  booking.status
                                )}`}>
                                {getBookingStatusText(booking.status)}
                              </span>
                            </div>

                            {booking.attended && (
                              <div className="mt-2 p-2 bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800 rounded-md">
                                <p className="text-green-700 dark:text-green-400 text-sm">
                                  تم تأكيد حضورك لهذا الدرس
                                </p>
                              </div>
                            )}
                          </div>
                        </CardContent>
                        <CardFooter className="pt-0 flex flex-col gap-2">
                          {booking.status === "pending" && (
                            <Button
                              variant="outline"
                              className="w-full text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40"
                              onClick={() => handleCancelBooking(booking.id)}>
                              إلغاء الحجز
                            </Button>
                          )}

                          {booking.status === "approved" && (
                            <Button
                              variant="outline"
                              className="w-full"
                              onClick={() => handleConfirmAttendance(booking)}>
                              تأكيد الحضور
                            </Button>
                          )}

                          {booking.status === "completed" &&
                            booking.attended &&
                            !hasRated(booking.id) && (
                              <Button
                                variant="default"
                                className="w-full flex items-center justify-center"
                                onClick={() => handleRateTeacher(booking)}>
                                <Star className="ml-2 h-4 w-4" />
                                تقييم المدرس
                              </Button>
                            )}

                          {booking.status === "completed" &&
                            booking.attended &&
                            hasRated(booking.id) && (
                              <div className="text-center text-sm text-green-700 dark:text-green-400 w-full p-2 bg-green-50 dark:bg-green-950/40 rounded-md">
                                تم تقييم المدرس بنجاح
                              </div>
                            )}

                          {booking.status === "cancelled" && (
                            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                              تم إلغاء هذا الحجز
                            </div>
                          )}
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-lg text-gray-500 dark:text-gray-400">
                      ليس لديك أي حجوزات حالية
                    </p>
                    <Button
                      variant="link"
                      onClick={() => navigate("/teachers")}>
                      البحث عن مدرسين
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="settings" className="p-6 focus:outline-none">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold mb-4">إعدادات الحساب</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    يمكنك تعديل بيانات حسابك من هنا.
                  </p>
                  <Button variant="outline">تعديل البيانات الشخصية</Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <div className="sticky top-24">
              <div className="bg-card text-card-foreground border rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4">التواصل مع الدعم</h3>
                <Button
                  className="w-full flex items-center justify-center"
                  variant="outline">
                  <MessageSquare className="ml-2 h-5 w-5" /> مراسلة الدعم
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* مربع حوار تأكيد الحضور */}
      <Dialog
        open={isAttendanceDialogOpen}
        onOpenChange={setIsAttendanceDialogOpen}>
        <DialogContent className="sm:max-w-md">
          {selectedBooking && (
            <AttendanceConfirmation
              bookingId={selectedBooking.id}
              onConfirm={handleAttendanceConfirmed}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* مربع حوار تقييم المدرس */}
      <Dialog open={isRatingDialogOpen} onOpenChange={setIsRatingDialogOpen}>
        <DialogContent className="sm:max-w-md">
          {selectedBooking && (
            <RatingForm
              bookingId={selectedBooking.id}
              targetId={selectedBooking.teacherId}
              targetName={selectedBooking.teacherName}
              raterRole="student"
              onComplete={handleRatingComplete}
            />
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default StudentProfile;
