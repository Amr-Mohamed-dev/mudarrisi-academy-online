import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User, Search, LogOut, Star, Moon, Sun } from "lucide-react";
import { cn } from "@/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTheme } from "@/contexts/ThemeContext";
import { toast } from "sonner";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    // TODO: Implement logout logic
    toast.success("تم تسجيل الخروج بنجاح");
    navigate("/");
    setIsMenuOpen(false);
  };

  // Temporary auth state - replace with actual auth when backend is ready
  const isAuthenticated = false;
  const user = null;
  const isAdmin = false;
  const isTeacher = false;

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-blue dark:text-blue-light">
              منصة المدرسين
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          {!isMobile && (
            <div className="flex items-center space-x-4 space-x-reverse">
              <Link
                to="/"
                className="text-gray-700 dark:text-gray-300 hover:text-blue dark:hover:text-blue-light px-3 py-2 transition-colors">
                الرئيسية
              </Link>
              <Link
                to="/teachers"
                className="text-gray-700 dark:text-gray-300 hover:text-blue dark:hover:text-blue-light px-3 py-2 transition-colors">
                المدرسين
              </Link>
              <Link
                to="/subjects"
                className="text-gray-700 dark:text-gray-300 hover:text-blue dark:hover:text-blue-light px-3 py-2 transition-colors">
                المواد
              </Link>
              <Link
                to="/about"
                className="text-gray-700 dark:text-gray-300 hover:text-blue dark:hover:text-blue-light px-3 py-2 transition-colors">
                من نحن
              </Link>

              {/* Dark Mode Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
                className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label={
                  isDarkMode ? "تفعيل الوضع الفاتح" : "تفعيل الوضع المظلم"
                }>
                {isDarkMode ? (
                  <Sun className="h-5 w-5 text-yellow-500" />
                ) : (
                  <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                )}
              </Button>

              {isAuthenticated ? (
                <div className="flex items-center space-x-4 space-x-reverse mr-4">
                  {isAdmin && (
                    <Link to="/admin">
                      <Button variant="outline" size="sm">
                        لوحة التحكم
                      </Button>
                    </Link>
                  )}

                  {isTeacher && (
                    <Link to="/teacher/ratings">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center">
                        <Star className="h-4 w-4 ml-1" />
                        تقييم الطلاب
                      </Button>
                    </Link>
                  )}

                  <Link
                    to={"/teachers/"}

                    // to={
                    //   isTeacher ? "/teachers/" + user?.id : "/student/profile"
                    // }
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full bg-blue/10 dark:bg-blue-light/10">
                      <User className="h-5 w-5 text-blue dark:text-blue-light" />
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 ml-1" />
                    تسجيل الخروج
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2 space-x-reverse mr-4">
                  <Link to="/auth?type=login">
                    <Button variant="outline">تسجيل الدخول</Button>
                  </Link>
                  <Link to="/auth?type=register">
                    <Button variant="default">إنشاء حساب</Button>
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <div className="flex items-center space-x-2 space-x-reverse">
              {/* Mobile Dark Mode Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
                className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label={
                  isDarkMode ? "تفعيل الوضع الفاتح" : "تفعيل الوضع المظلم"
                }>
                {isDarkMode ? (
                  <Sun className="h-5 w-5 text-yellow-500" />
                ) : (
                  <Moon className="h-5 w-5 text-gray-600" />
                )}
              </Button>

              <button
                onClick={toggleMenu}
                className="p-2 rounded-md text-gray-700 dark:text-gray-300 focus:outline-none">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "absolute left-0 right-0 bg-white dark:bg-gray-900 shadow-lg transition-all duration-300 ease-in-out z-20 border-t border-gray-200 dark:border-gray-700",
            isMenuOpen
              ? "max-h-[500px] opacity-100"
              : "max-h-0 opacity-0 invisible"
          )}>
          {isMenuOpen && (
            <div className="px-4 py-6 space-y-4 animate-fade-in">
              <div className="flex flex-col space-y-2">
                <Link
                  to="/"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue dark:hover:text-blue-light px-3 py-2 border-b border-gray-200 dark:border-gray-700 transition-colors">
                  الرئيسية
                </Link>
                <Link
                  to="/teachers"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue dark:hover:text-blue-light px-3 py-2 border-b border-gray-200 dark:border-gray-700 transition-colors">
                  المدرسين
                </Link>
                <Link
                  to="/subjects"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue dark:hover:text-blue-light px-3 py-2 border-b border-gray-200 dark:border-gray-700 transition-colors">
                  المواد
                </Link>
                <Link
                  to="/about"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue dark:hover:text-blue-light px-3 py-2 border-b border-gray-200 dark:border-gray-700 transition-colors">
                  من نحن
                </Link>

                {isTeacher && (
                  <Link
                    to="/teacher/ratings"
                    className="text-gray-700 dark:text-gray-300 hover:text-blue dark:hover:text-blue-light px-3 py-2 border-b border-gray-200 dark:border-gray-700 transition-colors">
                    تقييم الطلاب
                  </Link>
                )}
              </div>

              {isAuthenticated ? (
                <div className="pt-4 flex flex-col space-y-3">
                  <Link
                    to={"/teachers/"}
                    // to={
                    //   isTeacher ? "/teachers/" + user?.id : "/student/profile"
                    // }
                    className="w-full">
                    <Button variant="outline" className="w-full justify-start">
                      <User className="h-4 w-4 ml-2" /> الملف الشخصي
                    </Button>
                  </Link>
                  {isAdmin && (
                    <Link to="/admin" className="w-full">
                      <Button
                        variant="outline"
                        className="w-full justify-start">
                        لوحة التحكم
                      </Button>
                    </Link>
                  )}
                  <Button
                    variant="default"
                    className="w-full"
                    onClick={handleLogout}>
                    <LogOut className="h-4 w-4 ml-2" />
                    تسجيل الخروج
                  </Button>
                </div>
              ) : (
                <div className="pt-4 flex flex-col space-y-3">
                  <Link to="/auth?type=login" className="w-full">
                    <Button variant="outline" className="w-full">
                      تسجيل الدخول
                    </Button>
                  </Link>
                  <Link to="/auth?type=register" className="w-full">
                    <Button variant="default" className="w-full">
                      إنشاء حساب
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
