import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import TeacherProfile from "./pages/TeacherProfile";
import StudentProfile from "./pages/StudentProfile";
import BookingPage from "./pages/BookingPage";
import Auth from "./pages/Auth";
import AdminDashboard from "./pages/AdminDashboard";
import TeachersManagement from "./pages/admin/TeachersManagement";
import StudentsManagement from "./pages/admin/StudentsManagement";
import BookingsManagement from "./pages/admin/BookingsManagement";
import Teachers from "./pages/Teachers";
import Subjects from "./pages/Subjects";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import AuthProvider from "./contexts/AuthContext";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <BrowserRouter>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/teachers/:id" element={<TeacherProfile />} />
            <Route path="/student/profile" element={<StudentProfile />} />
            <Route path="/booking/:id" element={<BookingPage />} />
            <Route path="/subjects" element={<Subjects />} />
            <Route path="/about" element={<About />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/teachers" element={<TeachersManagement />} />
            <Route path="/admin/students" element={<StudentsManagement />} />
            <Route path="/admin/bookings" element={<BookingsManagement />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
        <ScrollToTop />
      </BrowserRouter>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
