
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-12">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-blue">404</h1>
        </div>
        
        <h2 className="text-3xl font-bold text-blue-dark mb-4">عفواً! الصفحة غير موجودة</h2>
        
        <p className="text-gray-600 text-lg mb-8 max-w-md">
          يبدو أننا لا نستطيع العثور على الصفحة التي تبحث عنها. ربما تم نقلها أو حذفها أو لم تكن موجودة من البداية!
        </p>
        
        <div className="max-w-xs w-full">
          <Link to="/">
            <Button className="w-full flex items-center justify-center">
              <Home className="ml-2 h-5 w-5" /> العودة إلى الصفحة الرئيسية
            </Button>
          </Link>
        </div>
        
        <div className="mt-12 w-full max-w-lg">
          <h3 className="text-xl font-bold mb-4 text-blue-dark">هل تبحث عن شيء آخر؟</h3>
          <div className="grid grid-cols-2 gap-4">
            <Link to="/teachers" className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <h4 className="font-bold mb-1">المدرسين</h4>
              <p className="text-sm text-gray-600">تصفح قائمة المدرسين المتاحين</p>
            </Link>
            <Link to="/subjects" className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <h4 className="font-bold mb-1">المواد الدراسية</h4>
              <p className="text-sm text-gray-600">استكشف المواد المتاحة للتعلم</p>
            </Link>
            <Link to="/auth?type=login" className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <h4 className="font-bold mb-1">تسجيل الدخول</h4>
              <p className="text-sm text-gray-600">الوصول إلى حسابك</p>
            </Link>
            <Link to="/contact" className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <h4 className="font-bold mb-1">اتصل بنا</h4>
              <p className="text-sm text-gray-600">احصل على المساعدة من فريقنا</p>
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
