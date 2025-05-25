
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import AnimatedSection from "@/components/AnimatedSection";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const quickLinks = [
    {
      to: "/teachers",
      title: "المدرسين",
      description: "تصفح قائمة المدرسين المتاحين"
    },
    {
      to: "/subjects", 
      title: "المواد الدراسية",
      description: "استكشف المواد المتاحة للتعلم"
    },
    {
      to: "/auth?type=login",
      title: "تسجيل الدخول", 
      description: "الوصول إلى حسابك"
    },
    {
      to: "/about",
      title: "من نحن",
      description: "تعرف على منصتنا ورؤيتنا"
    }
  ];

  return (
    <PageTransition className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-12">
        <AnimatedSection delay={0.2}>
          <motion.div 
            className="mb-8"
            initial={{ scale: 0.5, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 260, 
              damping: 20,
              delay: 0.3
            }}
          >
            <motion.h1 
              className="text-9xl font-bold text-blue"
              animate={{ 
                textShadow: [
                  "0 0 0 rgba(59, 130, 246, 0.5)",
                  "0 0 20px rgba(59, 130, 246, 0.5)",
                  "0 0 0 rgba(59, 130, 246, 0.5)"
                ]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 2 
              }}
            >
              404
            </motion.h1>
          </motion.div>
        </AnimatedSection>
        
        <AnimatedSection delay={0.5}>
          <motion.h2 
            className="text-3xl font-bold text-blue-dark mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            عفواً! الصفحة غير موجودة
          </motion.h2>
        </AnimatedSection>
        
        <AnimatedSection delay={0.7}>
          <motion.p 
            className="text-gray-600 text-lg mb-8 max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            يبدو أننا لا نستطيع العثور على الصفحة التي تبحث عنها. ربما تم نقلها أو حذفها أو لم تكن موجودة من البداية!
          </motion.p>
        </AnimatedSection>
        
        <AnimatedSection delay={0.9}>
          <motion.div 
            className="max-w-xs w-full mb-12"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/">
              <Button className="w-full flex items-center justify-center">
                <Home className="ml-2 h-5 w-5" /> العودة إلى الصفحة الرئيسية
              </Button>
            </Link>
          </motion.div>
        </AnimatedSection>
        
        <AnimatedSection delay={1.1}>
          <div className="w-full max-w-lg">
            <motion.h3 
              className="text-xl font-bold mb-4 text-blue-dark"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              هل تبحث عن شيء آخر؟
            </motion.h3>
            <motion.div 
              className="grid grid-cols-2 gap-4"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {quickLinks.map((link, index) => (
                <motion.div
                  key={link.to}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -5,
                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <Link 
                    to={link.to} 
                    className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors h-full"
                  >
                    <h4 className="font-bold mb-1">{link.title}</h4>
                    <p className="text-sm text-gray-600">{link.description}</p>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </AnimatedSection>
      </div>
      
      <Footer />
    </PageTransition>
  );
};

export default NotFound;
