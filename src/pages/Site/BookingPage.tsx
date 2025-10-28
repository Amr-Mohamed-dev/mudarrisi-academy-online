import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./components/navbar";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Bell } from "lucide-react";
import { useToast } from "@/hooks/useToast";
import { authStore } from "@/store";

const BookingPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { user } = authStore();
    const { addToast } = useToast();
    const [teacher, setTeacher] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate("/auth");
            return;
        }

        // Get teacher data
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const foundTeacher = users.find(
            (u: any) => u.id === id && u.role === "teacher"
        );

        if (foundTeacher) {
            setTeacher(foundTeacher);
        } else {
            addToast({
                title: "خطأ",
                type: "error",
                message: "لم يتم العثور على المدرس",
            });
            navigate("/teachers");
        }

        setLoading(false);
    }, [id, navigate, user]);

    const handleBooking = () => {
        // Create new booking
        const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");

        const newBooking = {
            id: `booking_${Date.now()}`,
            teacherId: teacher.id,
            teacherName: teacher.name,
            studentId: user?.id,
            studentName: user?.name,
            date: new Date().toLocaleDateString("ar-SA"),
            time: "10:00 صباحًا",
            startTime: "10:00 صباحًا",
            endTime: "11:00 صباحًا",
            subject: "الرياضيات",
            status: "pending", // حالة الحجز معلقة حتى يوافق المدير
            createdAt: new Date().toISOString(),
            price: teacher.price || 150, // إضافة سعر المدرس للحجز
        };

        bookings.push(newBooking);
        localStorage.setItem("bookings", JSON.stringify(bookings));

        // إنشاء إشعار للطالب بإنشاء الحجز
        const notifications = JSON.parse(
            localStorage.getItem("notifications") || "[]"
        );
        const newNotification = {
            id: `notification_${Date.now()}`,
            userId: user?.id,
            title: "تم إنشاء حجز جديد",
            message: `تم إرسال طلب حجز مع المدرس ${teacher.name}. سيتم إعلامك عند الموافقة أو رفض الطلب.`,
            read: false,
            createdAt: new Date().toISOString(),
        };
        notifications.push(newNotification);
        localStorage.setItem("notifications", JSON.stringify(notifications));

        addToast({
            title: "تم إرسال طلب الحجز",
            type: "success",
            message: "سيتم مراجعة طلبك من قبل الإدارة وسيتم إخطارك بالنتيجة",
        });

        navigate("/student/profile");
    };

    if (loading) {
        return (
            <div className="flex flex-col min-h-screen bg-background text-foreground">
                <div className="container mx-auto px-4 py-8 flex-grow">
                    <p className="text-center">جاري التحميل...</p>
                </div>
            </div>
        );
    }

    // استخدام سعر المدرس المخزن إذا كان موجودًا
    const teacherPrice = teacher?.price || 150;

    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">

            <div className="container mx-auto px-4 py-8 flex-grow">
                <Button
                    variant="outline"
                    className="mb-6"
                    onClick={() => window.history.back()}
                >
                    <ArrowRight className="ml-2 h-4 w-4" /> العودة
                </Button>

                <h1 className="text-2xl font-bold mb-6">تأكيد الحجز</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card className="bg-card text-card-foreground border">
                        <CardHeader>
                            <CardTitle>تفاصيل المدرس</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="font-bold text-lg">{teacher?.name}</p>
                            <p className="text-gray-700 dark:text-gray-300">
                                الرياضيات
                            </p>
                            <p className="text-gray-700 dark:text-gray-300 font-bold">
                                السعر: {teacherPrice} ريال / ساعة
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-card text-card-foreground border">
                        <CardHeader>
                            <CardTitle>تفاصيل الحجز</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <p>
                                    <span className="font-bold">التاريخ:</span>{" "}
                                    {new Date().toLocaleDateString("ar-SA")}
                                </p>
                                <p>
                                    <span className="font-bold">الوقت:</span>{" "}
                                    10:00 صباحًا - 11:00 صباحًا
                                </p>
                                <p>
                                    <span className="font-bold">المادة:</span>{" "}
                                    الرياضيات
                                </p>
                                <p>
                                    <span className="font-bold">السعر:</span>{" "}
                                    {teacherPrice} ريال
                                </p>
                                <div className="flex items-center gap-2 mt-4 p-3 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-md">
                                    <Bell className="h-5 w-5 text-blue-500" />
                                    <p className="text-blue-700 dark:text-blue-300 font-medium">
                                        سيتم إشعارك عند الموافقة أو رفض الحجز من
                                        قبل الإدارة
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={handleBooking} className="w-full">
                                تأكيد طلب الحجز
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default BookingPage;
