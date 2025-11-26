import AuthPage from "@/pages/auth";
import BookingsManagement from "@/pages/Dashboard/admin/BookingsManagement";
import CreateTeacher from "@/pages/Dashboard/admin/CreateTeacher";
import StudentsManagement from "@/pages/Dashboard/admin/StudentsManagement";
import TeachersManagement from "@/pages/Dashboard/admin/TeachersManagement";
import AdminDashboard from "@/pages/Dashboard/AdminDashboard";
import NotFoundPage from "@/pages/NotFound";
import AboutPage from "@/pages/Site/About";
import BookingPage from "@/pages/Site/student/BookingPage";
import HomePage from "@/pages/Site/Home";
import StudentProfilePage from "@/pages/Site/student/StudentProfile";
import SubjectsPage from "@/pages/Site/Subjects";
import TeacherDetailsPage from "@/pages/Site/teacher/TeacherProfile";
import TeacherRatingsPage from "@/pages/Site/teacher/TeacherRatings";
import TeachersPage from "@/pages/Site/teacher/Teachers";
import UnauthorizedPage from "@/pages/UnauthorizedPage";
import { Paths } from "@/types";
import { SITE_NAME } from "./env-variables.constants";

// ✅ تغيرنا من /dashboard إلى مباشرة
const adminBasePath = "/admin";

export const SITE_MAP: Paths = {
    siteName: SITE_NAME,
    auth: {
        login: {
            name: "التسجيل",
            href: "/login",
            component: <AuthPage />,
        },
    },
    dashboard: {
        admin: {
            links: {
                main: {
                    name: "الرئيسية",
                    href: `${adminBasePath}`,
                    build: () => "",
                    component: <AdminDashboard />,
                },
                teachers: {
                    name: "المدرسين",
                    href: `${adminBasePath}/teachers`,
                    build: () => "",
                    component: <TeachersManagement />,
                },
                createTeacher: {
                    name: "إنشاء مدرس",
                    href: `${adminBasePath}/create-teacher`,
                    build: () => "",
                    component: <CreateTeacher />,
                },
                students: {
                    name: "الطلاب",
                    href: `${adminBasePath}/students`,
                    build: () => "",
                    component: <StudentsManagement />,
                },
                bookings: {
                    name: "الحجوزات",
                    href: `${adminBasePath}/bookings`,
                    build: () => "",
                    component: <BookingsManagement />,
                },
            },
        },
    },
    site: {
        home: {
            name: "الرئيسية",
            href: `/`,
            component: <HomePage />,
        },
        teachers: {
            name: "المدرسين",
            href: `/teachers`,
            component: <TeachersPage />,
        },
        teacherDetails: {
            name: "تفاصيل المدرس",
            href: `/teachers/:id`,
            build: ({ id }: { id: string }) => `/teachers/${id}`,
            component: <TeacherDetailsPage />,
        },
        teacherRatings: {
            name: "تقييمات المدرس",
            href: `/teacher/ratings`,
            component: <TeacherRatingsPage />,
        },
        subjects: {
            name: "المواد",
            href: `/subjects`,
            component: <SubjectsPage />,
        },
        studentProfile: {
            name: "الملف الشخصي",
            href: `/student/profile`,
            component: <StudentProfilePage />,
        },
        booking: {
            name: "الحجز",
            href: `/booking/:id`,
            build: ({ id }: { id: string }) => `/booking/${id}`,
            component: <BookingPage />,
        },
        about: {
            name: "من نحن",
            href: `/about`,
            component: <AboutPage />,
        },
    },
    unAuthorized: {
        name: "غير مصرح",
        href: "/unauthorized",
        component: <UnauthorizedPage />,
    },
    notFound: {
        name: "غير موجود",
        href: "*",
        component: <NotFoundPage />,
    },
} as const;