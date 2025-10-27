import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
    User,
    Calendar,
    Settings,
    MessageSquare,
    Home,
    Menu,
    X,
    Users,
    CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useIsMobile } from "@/hooks/use-mobile";
import Footer from "@/components/Footer";
import { authStore } from "@/store";

const AdminDashboard = () => {
    // Store sidebar state in localStorage to persist across page navigation
    const [sidebarOpen, setSidebarOpen] = useState(() => {
        const savedState = localStorage.getItem("adminSidebarOpen");
        return savedState !== null ? JSON.parse(savedState) : true;
    });
    const isMobile = useIsMobile();
    const { user } = authStore();
    const navigate = useNavigate();
    const location = useLocation();

    // Save sidebar state to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("adminSidebarOpen", JSON.stringify(sidebarOpen));
    }, [sidebarOpen]);

    const [stats, setStats] = useState({
        users: 0,
        teachers: 0,
        students: 0,
        bookings: 0,
        pending: 0,
        approved: 0,
    });
    const [activities, setActivities] = useState([]);

    // Check if current route matches the given path
    const isActive = (path) => {
        return location.pathname === path;
    };

    useEffect(() => {
        // جلب الإحصائيات
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");

        const teachers = users.filter(
            (u: { role: string }) => u.role === "teacher"
        ).length;
        const students = users.filter(
            (u: { role: string }) => u.role === "student"
        ).length;
        const totalBookings = bookings.length;
        const pendingBookings = bookings.filter(
            (b: { role: string }) => b.role === "pending"
        ).length;
        const approvedBookings = bookings.filter(
            (b: { role: string }) => b.role === "approved"
        ).length;

        setStats({
            users: users.length,
            teachers,
            students,
            bookings: totalBookings,
            pending: pendingBookings,
            approved: approvedBookings,
        });

        // محاكاة البيانات للنشاطات الأخيرة
        const recentActivities = [
            {
                user: "أحمد محمد",
                action: "حجز درس جديد",
                time: "منذ 10 دقائق",
                image: "/placeholder.svg",
            },
            {
                user: "سارة أحمد",
                action: "أضافت تقييمًا للمدرس خالد العمري",
                time: "منذ 25 دقيقة",
                image: "/placeholder.svg",
            },
            {
                user: "محمد علي",
                action: "سجل حساب جديد",
                time: "منذ 45 دقيقة",
                image: "/placeholder.svg",
            },
            {
                user: "نورة عبدالله",
                action: "أكملت درسًا",
                time: "منذ ساعة واحدة",
                image: "/placeholder.svg",
            },
            {
                user: "فهد سلطان",
                action: "أرسل رسالة للدعم الفني",
                time: "منذ 3 ساعات",
                image: "/placeholder.svg",
            },
        ];

        setActivities(recentActivities);
    }, [user, navigate]);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            {/* Admin Navbar */}
            <header className="bg-blue text-white shadow-md sticky top-0 z-50">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            {isMobile && (
                                <button
                                    onClick={toggleSidebar}
                                    className="p-2 rounded-md focus:outline-none"
                                >
                                    {sidebarOpen ? (
                                        <X size={20} />
                                    ) : (
                                        <Menu size={20} />
                                    )}
                                </button>
                            )}
                            <Link to="/" className="flex items-center">
                                <span className="text-xl font-bold mx-2">
                                    لوحة التحكم
                                </span>
                            </Link>
                        </div>

                        {/* <div className="flex items-center">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate('/')}
                className="text-white border-white hover:bg-white hover:text-blue ml-4"
              >
                <Home className="h-4 w-4 ml-2" />
                الصفحة الرئيسية
              </Button>
              
              <div className="relative mx-2">
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Search className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  placeholder="بحث..."
                  className="w-full py-1 pr-10 pl-4 border border-blue-light rounded-md bg-blue-dark/20 text-white placeholder-blue-light/80"
                />
              </div>

              <div className="ml-4">
                <Avatar className="h-8 w-8 bg-blue-light">
                  <AvatarImage
                    src={user?.avatar || "/placeholder.svg"}
                    alt="المدير"
                  />
                  <AvatarFallback>{user?.name?.[0] || "م"}</AvatarFallback>
                </Avatar>
              </div>
            </div> */}
                    </div>
                </div>
            </header>

            <div className="flex flex-1">
                {/* Sidebar - Now using localStorage to persist state across page navigation */}
                <aside
                    className={`bg-card text-card-foreground border shadow-md fixed inset-y-0 right-0 pt-16 z-40 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto lg:z-auto w-64 ${
                        sidebarOpen
                            ? "translate-x-0"
                            : "translate-x-full lg:translate-x-0"
                    }`}
                >
                    <div className="h-full overflow-y-auto p-4">
                        <nav className="space-y-8">
                            <div>
                                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                                    القائمة الرئيسية
                                </h3>
                                <div className="space-y-1">
                                    <Link
                                        to="/admin"
                                        className={`flex items-center px-4 py-2 rounded-md font-medium ${
                                            isActive("/admin")
                                                ? "text-gray-900 dark:text-gray-100 bg-blue/10"
                                                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue"
                                        }`}
                                    >
                                        <Home
                                            className={`ml-3 h-5 w-5 ${
                                                isActive("/admin")
                                                    ? "text-blue"
                                                    : ""
                                            }`}
                                        />
                                        <span>لوحة التحكم</span>
                                    </Link>
                                    <Link
                                        to="/admin/teachers"
                                        className={`flex items-center px-4 py-2 rounded-md font-medium ${
                                            isActive("/admin/teachers")
                                                ? "text-gray-900 dark:text-gray-100 bg-blue/10"
                                                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue"
                                        }`}
                                    >
                                        <User
                                            className={`ml-3 h-5 w-5 ${
                                                isActive("/admin/teachers")
                                                    ? "text-blue"
                                                    : ""
                                            }`}
                                        />
                                        <span>المدرسين</span>
                                        <Badge
                                            variant="outline"
                                            className="mr-2"
                                        >
                                            {stats.teachers}
                                        </Badge>
                                    </Link>
                                    <Link
                                        to="/admin/create-teacher"
                                        className={`flex items-center px-4 py-2 rounded-md font-medium mr-4 ${
                                            isActive("/admin/create-teacher")
                                                ? "text-gray-900 dark:text-gray-100 bg-blue/10"
                                                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue"
                                        }`}
                                    >
                                        <User
                                            className={`ml-3 h-5 w-5 ${
                                                isActive(
                                                    "/admin/create-teacher"
                                                )
                                                    ? "text-blue"
                                                    : ""
                                            }`}
                                        />
                                        <span>إنشاء مدرس</span>
                                    </Link>
                                    <Link
                                        to="/admin/students"
                                        className={`flex items-center px-4 py-2 rounded-md font-medium ${
                                            isActive("/admin/students")
                                                ? "text-gray-900 dark:text-gray-100 bg-blue/10"
                                                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue"
                                        }`}
                                    >
                                        <Users
                                            className={`ml-3 h-5 w-5 ${
                                                isActive("/admin/students")
                                                    ? "text-blue"
                                                    : ""
                                            }`}
                                        />
                                        <span>الطلاب</span>
                                        <Badge
                                            variant="outline"
                                            className="mr-2"
                                        >
                                            {stats.students}
                                        </Badge>
                                    </Link>
                                    <Link
                                        to="/admin/bookings"
                                        className={`flex items-center px-4 py-2 rounded-md font-medium ${
                                            isActive("/admin/bookings")
                                                ? "text-gray-900 dark:text-gray-100 bg-blue/10"
                                                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue"
                                        }`}
                                    >
                                        <Calendar
                                            className={`ml-3 h-5 w-5 ${
                                                isActive("/admin/bookings")
                                                    ? "text-blue"
                                                    : ""
                                            }`}
                                        />
                                        <span>الحجوزات</span>
                                        {stats.pending > 0 && (
                                            <Badge
                                                variant="default"
                                                className="mr-2"
                                            >
                                                {stats.pending}
                                            </Badge>
                                        )}
                                    </Link>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                                    إدارة المحتوى
                                </h3>
                                <div className="space-y-1">
                                    <Link
                                        to="/admin/messages"
                                        className={`flex items-center px-4 py-2 rounded-md font-medium ${
                                            isActive("/admin/messages")
                                                ? "text-gray-900 dark:text-gray-100 bg-blue/10"
                                                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue"
                                        }`}
                                    >
                                        <MessageSquare
                                            className={`ml-3 h-5 w-5 ${
                                                isActive("/admin/messages")
                                                    ? "text-blue"
                                                    : ""
                                            }`}
                                        />
                                        <span>الرسائل</span>
                                        <Badge
                                            variant="outline"
                                            className="mr-2"
                                        >
                                            5
                                        </Badge>
                                    </Link>
                                    <Link
                                        to="/admin/reviews"
                                        className={`flex items-center px-4 py-2 rounded-md font-medium ${
                                            isActive("/admin/reviews")
                                                ? "text-gray-900 dark:text-gray-100 bg-blue/10"
                                                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue"
                                        }`}
                                    >
                                        <MessageSquare
                                            className={`ml-3 h-5 w-5 ${
                                                isActive("/admin/reviews")
                                                    ? "text-blue"
                                                    : ""
                                            }`}
                                        />
                                        <span>التقييمات</span>
                                    </Link>
                                    <Link
                                        to="/admin/settings"
                                        className={`flex items-center px-4 py-2 rounded-md font-medium ${
                                            isActive("/admin/settings")
                                                ? "text-gray-900 bg-blue/10"
                                                : "text-gray-600 hover:bg-gray-100 hover:text-blue"
                                        }`}
                                    >
                                        <Settings
                                            className={`ml-3 h-5 w-5 ${
                                                isActive("/admin/settings")
                                                    ? "text-blue"
                                                    : ""
                                            }`}
                                        />
                                        <span>الإعدادات</span>
                                    </Link>
                                </div>
                            </div>
                        </nav>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-6">
                    <div className="container mx-auto">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg">
                                        المستخدمون
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold">
                                        {stats.users}
                                    </div>
                                    <p className="text-sm text-gray-500">
                                        إجمالي المستخدمين
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg">
                                        المدرسون
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold">
                                        {stats.teachers}
                                    </div>
                                    <Link to="/admin/teachers">
                                        <Button
                                            variant="link"
                                            className="px-0 h-auto text-sm text-blue"
                                        >
                                            عرض جميع المدرسين
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg">
                                        الطلاب
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold">
                                        {stats.students}
                                    </div>
                                    <Link to="/admin/students">
                                        <Button
                                            variant="link"
                                            className="px-0 h-auto text-sm text-blue"
                                        >
                                            عرض جميع الطلاب
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg">
                                        الحجوزات
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold">
                                        {stats.bookings}
                                    </div>
                                    <div className="flex items-center mt-2">
                                        <div className="flex-1">
                                            <div className="flex items-center">
                                                <span className="text-xs text-amber-500 ml-1">
                                                    قيد الانتظار:
                                                </span>
                                                <span className="text-xs font-semibold">
                                                    {stats.pending}
                                                </span>
                                            </div>
                                            <div className="flex items-center">
                                                <span className="text-xs text-green-500 ml-1">
                                                    تمت الموافقة:
                                                </span>
                                                <span className="text-xs font-semibold">
                                                    {stats.approved}
                                                </span>
                                            </div>
                                        </div>
                                        <Link to="/admin/bookings">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="h-8"
                                            >
                                                <CheckCircle className="ml-1 h-4 w-4" />
                                                موافقة
                                            </Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Recent Activity & Analytics */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                            {/* Recent Activity */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>النشاط الأخير</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {activities.map((activity, i) => (
                                            <div key={i} className="flex">
                                                <Avatar className="ml-3">
                                                    <AvatarImage
                                                        src={activity.image}
                                                        alt={activity.user}
                                                    />
                                                    <AvatarFallback>
                                                        {activity.user[0]}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="text-sm font-medium">
                                                        {activity.user}{" "}
                                                        <span className="text-gray-500">
                                                            {activity.action}
                                                        </span>
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {activity.time}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Analytics */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>تحليلات الزيارات</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[250px] flex items-center justify-center border border-dashed border-gray-300 dark:border-gray-700 rounded-md">
                                        <p className="text-gray-500 dark:text-gray-400">
                                            هنا يتم عرض رسم بياني للزيارات
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Popular Subjects & Teacher Overview */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <Card className="bg-card text-card-foreground border">
                                <CardHeader>
                                    <CardTitle>المواد الأكثر طلبًا</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {[
                                            {
                                                name: "الرياضيات",
                                                percentage: 75,
                                            },
                                            {
                                                name: "اللغة الإنجليزية",
                                                percentage: 68,
                                            },
                                            {
                                                name: "الفيزياء",
                                                percentage: 52,
                                            },
                                            {
                                                name: "الكيمياء",
                                                percentage: 48,
                                            },
                                            {
                                                name: "اللغة العربية",
                                                percentage: 45,
                                            },
                                        ].map((subject, i) => (
                                            <div key={i} className="space-y-1">
                                                <div className="flex justify-between items-center">
                                                    <span className="font-medium">
                                                        {subject.name}
                                                    </span>
                                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                                        {subject.percentage}%
                                                    </span>
                                                </div>
                                                <Progress
                                                    value={subject.percentage}
                                                    className="h-2"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-card text-card-foreground border">
                                <CardHeader>
                                    <CardTitle>المدرسون المميزون</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {[
                                            {
                                                name: "أحمد محمد",
                                                subject: "الرياضيات",
                                                rating: 4.9,
                                                students: 48,
                                                image: "/placeholder.svg",
                                            },
                                            {
                                                name: "سارة علي",
                                                subject: "اللغة الإنجليزية",
                                                rating: 4.8,
                                                students: 42,
                                                image: "/placeholder.svg",
                                            },
                                            {
                                                name: "محمد خالد",
                                                subject: "الفيزياء",
                                                rating: 4.8,
                                                students: 35,
                                                image: "/placeholder.svg",
                                            },
                                            {
                                                name: "نورة عبدالله",
                                                subject: "الكيمياء",
                                                rating: 4.7,
                                                students: 31,
                                                image: "/placeholder.svg",
                                            },
                                        ].map((teacher, i) => (
                                            <div
                                                key={i}
                                                className="flex items-center justify-between"
                                            >
                                                <div className="flex items-center">
                                                    <Avatar className="ml-3">
                                                        <AvatarImage
                                                            src={teacher.image}
                                                            alt={teacher.name}
                                                        />
                                                        <AvatarFallback>
                                                            {teacher.name[0]}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className="font-medium">
                                                            {teacher.name}
                                                        </p>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                                            {teacher.subject}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="text-left">
                                                    <div className="flex items-center">
                                                        <p className="font-medium ml-1">
                                                            {teacher.rating}
                                                        </p>
                                                        <svg
                                                            className="h-4 w-4 fill-amber"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                                        </svg>
                                                    </div>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        {teacher.students} طالب
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </main>
            </div>

            <Footer />
        </div>
    );
};

export default AdminDashboard;
