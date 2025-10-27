import AuthPage from "@/pages/Auth/Auth";
import BookingsManagement from "@/pages/Dashboard/admin/BookingsManagement";
import CreateTeacher from "@/pages/Dashboard/admin/CreateTeacher";
import StudentsManagement from "@/pages/Dashboard/admin/StudentsManagement";
import TeachersManagement from "@/pages/Dashboard/admin/TeachersManagement";
import AdminDashboard from "@/pages/Dashboard/AdminDashboard";
import NotFoundPage from "@/pages/NotFound";
import AboutPage from "@/pages/Site/About";
import BookingPage from "@/pages/Site/BookingPage";
import HomePage from "@/pages/Site/Home";
import StudentProfilePage from "@/pages/Site/StudentProfile";
import SubjectsPage from "@/pages/Site/Subjects";
import TeacherDetailsPage from "@/pages/Site/TeacherProfile";
import TeacherRatingsPage from "@/pages/Site/TeacherRatings";
import TeachersPage from "@/pages/Site/Teachers";
import UnauthorizedPage from "@/pages/UnauthorizedPage";
import { Paths } from "@/types";

const dashboardBasePath = "/dashboard";

export const PATHS: Paths = {
    auth: {
        auth: {
            name: "auth",
            href: `/auth`,
            component: <AuthPage />,
        },
    },
    dashboard: {
        admin: {
            title: "admin",
            links: {
                main: {
                    name: "admin",
                    href: `${dashboardBasePath}/admin`,
                    build: () => "",
                    component: <AdminDashboard />,
                },
                teachers: {
                    name: "teachers",
                    href: `${dashboardBasePath}/admin/teachers`,
                    build: () => "",
                    component: <TeachersManagement />,
                },
                createTeacher: {
                    name: "createTeacher",
                    href: `${dashboardBasePath}/admin/create-teacher`,
                    build: () => "",
                    component: <CreateTeacher />,
                },
                students: {
                    name: "students",
                    href: `${dashboardBasePath}/admin/students`,
                    build: () => "",
                    component: <StudentsManagement />,
                },
                bookings: {
                    name: "bookings",
                    href: `${dashboardBasePath}/admin/bookings`,
                    build: () => "",
                    component: <BookingsManagement />,
                },
            },
        },
    },
    site: {
        home: {
            name: "home",
            href: `/`,
            component: <HomePage />,
        },
        teachers: {
            name: "teachers",
            href: `/teachers`,
            component: <TeachersPage />,
        },
        teacherDetails: {
            name: "teacherDetails",
            href: `/teachers/:id`,
            build: ({ id }: { id: string }) => `/teachers/${id}`,
            component: <TeacherDetailsPage />,
        },
        teacherRatings: {
            name: "teacherRatings",
            href: `/teacher/ratings`,
            component: <TeacherRatingsPage />,
        },
        subjects: {
            name: "subjects",
            href: `/subjects`,
            component: <SubjectsPage />,
        },
        studentProfile: {
            name: "studentProfile",
            href: `/student/profile`,
            component: <StudentProfilePage />,
        },
        booking: {
            name: "booking",
            href: `/booking/:id`,
            build: ({ id }: { id: string }) => `/booking/${id}`,
            component: <BookingPage />,
        },
        about: {
            name: "about",
            href: `/about`,
            component: <AboutPage />,
        },
    },
    unAuthorized: {
        name: "unAuthorized",
        href: "/unauthorized",
        component: <UnauthorizedPage />,
    },
    notFound: {
        name: "notFound",
        href: "*",
        component: <NotFoundPage />,
    },
} as const;
