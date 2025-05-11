
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, User, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface NavbarProps {
  isLoggedIn?: boolean;
  isAdmin?: boolean;
}

const Navbar = ({ isLoggedIn = false, isAdmin = false }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 w-full">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-blue">منصة المدرسين</span>
          </Link>
          
          {/* Search Bar - Hide on mobile, move to dropdown */}
          {!isMobile && (
            <div className="relative mx-4 flex-1 max-w-md">
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                <Search className="h-4 w-4" />
              </div>
              <input
                type="text"
                placeholder="ابحث عن مدرس أو مادة..."
                className="w-full py-2 pr-10 pl-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue"
              />
            </div>
          )}
          
          {/* Desktop Navigation Links */}
          {!isMobile && (
            <div className="flex items-center space-x-4 space-x-reverse">
              <Link to="/" className="text-gray-700 hover:text-blue px-3 py-2">
                الرئيسية
              </Link>
              <Link to="/teachers" className="text-gray-700 hover:text-blue px-3 py-2">
                المدرسين
              </Link>
              <Link to="/subjects" className="text-gray-700 hover:text-blue px-3 py-2">
                المواد
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-blue px-3 py-2">
                من نحن
              </Link>
              
              {isLoggedIn ? (
                <div className="flex items-center space-x-4 space-x-reverse mr-4">
                  {isAdmin && (
                    <Link to="/admin">
                      <Button variant="outline" size="sm">لوحة التحكم</Button>
                    </Link>
                  )}
                  <Link to="/profile">
                    <Button variant="ghost" size="icon" className="rounded-full bg-blue/10">
                      <User className="h-5 w-5 text-blue" />
                    </Button>
                  </Link>
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
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-700 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
        </div>
        
        {/* Mobile Menu */}
        <div
          className={cn(
            "absolute left-0 right-0 bg-white shadow-lg transition-all duration-300 ease-in-out z-20",
            isMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 invisible"
          )}
        >
          {isMenuOpen && (
            <div className="px-4 py-6 space-y-4 animate-fade-in">
              {/* Mobile Search */}
              <div className="relative mb-6">
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                  <Search className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  placeholder="ابحث عن مدرس أو مادة..."
                  className="w-full py-2 pr-10 pl-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue"
                />
              </div>
              
              <div className="flex flex-col space-y-2">
                <Link to="/" className="text-gray-700 hover:text-blue px-3 py-2 border-b">
                  الرئيسية
                </Link>
                <Link to="/teachers" className="text-gray-700 hover:text-blue px-3 py-2 border-b">
                  المدرسين
                </Link>
                <Link to="/subjects" className="text-gray-700 hover:text-blue px-3 py-2 border-b">
                  المواد
                </Link>
                <Link to="/about" className="text-gray-700 hover:text-blue px-3 py-2 border-b">
                  من نحن
                </Link>
              </div>
              
              {isLoggedIn ? (
                <div className="pt-4 flex flex-col space-y-3">
                  <Link to="/profile" className="w-full">
                    <Button variant="outline" className="w-full justify-start">
                      <User className="h-4 w-4 ml-2" /> الملف الشخصي
                    </Button>
                  </Link>
                  {isAdmin && (
                    <Link to="/admin" className="w-full">
                      <Button variant="outline" className="w-full justify-start">
                        لوحة التحكم
                      </Button>
                    </Link>
                  )}
                  <Button variant="default" className="w-full">تسجيل الخروج</Button>
                </div>
              ) : (
                <div className="pt-4 flex flex-col space-y-3">
                  <Link to="/auth?type=login" className="w-full">
                    <Button variant="outline" className="w-full">تسجيل الدخول</Button>
                  </Link>
                  <Link to="/auth?type=register" className="w-full">
                    <Button variant="default" className="w-full">إنشاء حساب</Button>
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
