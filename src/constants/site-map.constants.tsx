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

const dashboardBasePath = "/dashboard";

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
                    href: `${dashboardBasePath}/admin`,
                    build: () => "",
                    component: <AdminDashboard />,
                },
                teachers: {
                    name: "المدرسين",
                    href: `${dashboardBasePath}/admin/teachers`,
                    build: () => "",
                    component: <TeachersManagement />,
                },
                createTeacher: {
                    name: "إنشاء مدرس",
                    href: `${dashboardBasePath}/admin/create-teacher`,
                    build: () => "",
                    component: <CreateTeacher />,
                },
                students: {
                    name: "الطلاب",
                    href: `${dashboardBasePath}/admin/students`,
                    build: () => "",
                    component: <StudentsManagement />,
                },
                bookings: {
                    name: "الحجوزات",
                    href: `${dashboardBasePath}/admin/bookings`,
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
