import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/useToast";
import { CheckCircle } from "lucide-react";

interface AttendanceConfirmationProps {
    bookingId: string;
    onConfirm: () => void;
}

const AttendanceConfirmation = ({
    bookingId,
    onConfirm,
}: AttendanceConfirmationProps) => {
    const { addToast } = useToast();
    const handleConfirmAttendance = () => {
        // Get all bookings
        const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");

        // Mark this booking as attended
        const updatedBookings = bookings.map((booking: any) => {
            if (booking.id === bookingId) {
                return {
                    ...booking,
                    status: "completed",
                    attended: true,
                    attendanceDate: new Date().toISOString(),
                };
            }
            return booking;
        });

        localStorage.setItem("bookings", JSON.stringify(updatedBookings));

        // Send notification
        const booking = updatedBookings.find((b: any) => b.id === bookingId);
        if (booking) {
            const notifications = JSON.parse(
                localStorage.getItem("notifications") || "[]"
            );

            // Notification for student
            notifications.push({
                id: `notification_${Date.now()}_student`,
                userId: booking.studentId,
                title: "تم تأكيد حضورك",
                message: `تم تأكيد حضورك للحصة مع المدرس ${booking.teacherName}. يرجى تقييم تجربتك.`,
                read: false,
                createdAt: new Date().toISOString(),
            });

            // Notification for teacher
            notifications.push({
                id: `notification_${Date.now()}_teacher`,
                userId: booking.teacherId,
                title: "حضر الطالب الحصة",
                message: `حضر الطالب ${booking.studentName} الحصة. يمكنك الآن تقييم الطالب.`,
                read: false,
                createdAt: new Date().toISOString(),
            });

            localStorage.setItem(
                "notifications",
                JSON.stringify(notifications)
            );
        }

        addToast({
            title: "تم تأكيد الحضور بنجاح",
            message:
                "تم تأكيد حضورك للدرس. سيتم إخطار المدرس بحضورك وسيمكنك من تقييم التجربة بعد ذلك.",
            type: "success",
        });
        onConfirm();
    };

    return (
        <Card className="border shadow-sm">
            <CardHeader>
                <CardTitle className="text-lg">تأكيد الحضور</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-gray-600">
                    الرجاء تأكيد حضورك للدرس. سيتم إخطار المدرس بحضورك وسيمكنك
                    من تقييم التجربة بعد ذلك.
                </p>
            </CardContent>
            <CardFooter>
                <Button
                    onClick={handleConfirmAttendance}
                    className="w-full flex items-center justify-center"
                >
                    <CheckCircle className="ml-2 h-4 w-4" />
                    تأكيد الحضور
                </Button>
            </CardFooter>
        </Card>
    );
};

export default AttendanceConfirmation;
