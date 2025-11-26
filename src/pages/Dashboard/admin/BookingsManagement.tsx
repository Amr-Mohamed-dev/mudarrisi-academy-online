import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookingFilters from "@/components/admin/BookingFilters";
import BookingActions from "@/components/admin/BookingActions";
import { useToast } from "@/hooks/useToast";
import { bookingsService, notificationsService } from "@/services/dataService";
import { Booking } from "@/types";

const BookingsManagement = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, []);

  useEffect(() => {
    filterBookings();
  }, [bookings, statusFilter]);

  const loadBookings = async () => {
    try {
      setIsLoading(true);
      const data = await bookingsService.getAll();
      setBookings(data);
    } catch (error) {
      console.error("Error loading bookings:", error);
      addToast({
        title: "خطأ",
        message: "حدث خطأ في تحميل الحجوزات",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filterBookings = () => {
    if (statusFilter === "all") {
      setFilteredBookings(bookings);
    } else {
      setFilteredBookings(
        bookings.filter((booking) => booking.status === statusFilter)
      );
    }
  };

  const handleApproveBooking = async (bookingId: string) => {
    try {
      const updated = await bookingsService.approve(bookingId);
      if (updated) {
        const booking = bookings.find((b) => b.id === bookingId);
        if (booking) {
          // إرسال إشعارات
          await notificationsService.create({
            userId: booking.studentId,
            title: "تم قبول حجزك",
            message: `تم قبول حجزك مع المدرس ${booking.teacherName} في ${booking.date} الساعة ${booking.time}`,
            read: false,
          });

          await notificationsService.create({
            userId: booking.teacherId,
            title: "حجز جديد تم قبوله",
            message: `تم قبول حجز الطالب ${booking.studentName} معك في ${booking.date} الساعة ${booking.time}`,
            read: false,
          });
        }

        setBookings((prev) =>
          prev.map((b) => (b.id === bookingId ? updated : b))
        );

        addToast({
          title: "تم قبول الحجز",
          message: "تم قبول الحجز وإرسال إشعارات للطالب والمدرس",
          type: "success",
        });
      }
    } catch (error) {
      console.error("Error approving booking:", error);
      addToast({
        title: "خطأ",
        message: "حدث خطأ في قبول الحجز",
        type: "error",
      });
    }
  };

  const handleRejectBooking = async (bookingId: string) => {
    try {
      const updated = await bookingsService.reject(bookingId);
      if (updated) {
        const booking = bookings.find((b) => b.id === bookingId);
        if (booking) {
          // إرسال إشعار للطالب
          await notificationsService.create({
            userId: booking.studentId,
            title: "تم رفض حجزك",
            message: `نأسف، تم رفض حجزك مع المدرس ${booking.teacherName}. يمكنك المحاولة مع مدرس آخر.`,
            read: false,
          });
        }

        setBookings((prev) =>
          prev.map((b) => (b.id === bookingId ? updated : b))
        );

        addToast({
          title: "تم رفض الحجز",
          message: "تم رفض الحجز وإرسال إشعار للطالب",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error rejecting booking:", error);
      addToast({
        title: "خطأ",
        message: "حدث خطأ في رفض الحجز",
        type: "error",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: "قيد الانتظار", variant: "secondary" as const },
      approved: { label: "مقبول", variant: "default" as const },
      rejected: { label: "مرفوض", variant: "destructive" as const },
      completed: { label: "مكتمل", variant: "default" as const },
      cancelled: { label: "ملغي", variant: "outline" as const },
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const renderBookingCards = (bookingsToRender: Booking[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {bookingsToRender.map((booking) => (
        <Card key={booking.id} className="border shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">{booking.subject}</CardTitle>
              {getStatusBadge(booking.status)}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>
                <strong>المدرس:</strong> {booking.teacherName}
              </p>
              <p>
                <strong>الطالب:</strong> {booking.studentName}
              </p>
              <div className="flex items-center">
                <Calendar size={16} className="ml-1" />
                <span>{booking.date}</span>
              </div>
              <div className="flex items-center">
                <Clock size={16} className="ml-1" />
                <span>{booking.time}</span>
              </div>
              <p>
                <strong>السعر:</strong> {booking.price} ريال
              </p>

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
  );

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center">جاري التحميل...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between w-full mb-5">
        <h1 className="text-2xl font-bold">إدارة الحجوزات</h1>
        <Button
          variant="outline"
          onClick={() => navigate("/admin")}
          className="mr-4">
          لوحة التحكم
          <ArrowLeft className="h-4 w-4 mr-2" />
        </Button>
      </div>

      <BookingFilters
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full mb-6">
          <TabsTrigger value="all" className="flex-1">
            جميع الحجوزات ({bookings.length})
          </TabsTrigger>
          <TabsTrigger value="PENDING" className="flex-1">
            قيد الانتظار (
            {bookings.filter((b) => b.status === "PENDING").length})
          </TabsTrigger>
          <TabsTrigger value="APPROVED" className="flex-1">
            المقبولة ({bookings.filter((b) => b.status === "APPROVED").length})
          </TabsTrigger>
          <TabsTrigger value="COMPLETED" className="flex-1">
            المكتملة ({bookings.filter((b) => b.status === "COMPLETED").length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {renderBookingCards(filteredBookings)}
        </TabsContent>

        <TabsContent value="PENDING">
          {renderBookingCards(bookings.filter((b) => b.status === "PENDING"))}
        </TabsContent>

        <TabsContent value="APPROVED">
          {renderBookingCards(bookings.filter((b) => b.status === "APPROVED"))}
        </TabsContent>

        <TabsContent value="COMPLETED">
          {renderBookingCards(bookings.filter((b) => b.status === "COMPLETED"))}
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
