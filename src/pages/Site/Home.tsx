import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Users, BookOpen, Award, ChevronLeft } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import AnimatedSection from "@/components/AnimatedSection";
import TopRatedTeachers from "@/components/TopRatedTeachers";
import { useCountUp } from "@/hooks/useCountUp";

const HomePage = () => {
  // استخدام hook العد التصاعدي للإحصائيات
  const teachersCount = useCountUp(500, 2000, 1000);
  const subjectsCount = useCountUp(50, 2000, 1200);
  const rating = useCountUp(48, 2000, 1400); // 4.8 * 10 للعرض
  const studentsCount = useCountUp(10000, 2500, 1600);

  const stats = [
    {
      icon: Users,
      label: "مدرس متخصص",
      value: `${teachersCount}+`,
      rawValue: teachersCount,
    },
    {
      icon: BookOpen,
      label: "مادة دراسية",
      value: `${subjectsCount}+`,
      rawValue: subjectsCount,
    },
    {
      icon: Star,
      label: "تقييم الطلاب",
      value: `${(rating / 10).toFixed(1)}`,
      rawValue: rating,
    },
    {
      icon: Award,
      label: "نجح معنا",
      value: `${studentsCount.toLocaleString()}+`,
      rawValue: studentsCount,
    },
  ];

  const subjects = [
    "الرياضيات",
    "الفيزياء",
    "الكيمياء",
    "الأحياء",
    "اللغة العربية",
    "اللغة الإنجليزية",
    "التاريخ",
    "الجغرافيا",
  ];

  return (
    <PageTransition className="flex flex-col min-h-screen pt-10">
      <main className="flex-grow bg-background text-foreground">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 py-20 dark-transition">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <AnimatedSection delay={0.2}>
                <motion.h1
                  className="text-5xl md:text-6xl font-bold text-blue-dark mb-6"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}>
                  تعلم مع أفضل المدرسين
                </motion.h1>
              </AnimatedSection>

              <AnimatedSection delay={0.4}>
                <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                  اكتشف عالماً من التعلم مع مدرسين محترفين ومتخصصين في جميع
                  المواد الدراسية. احجز درسك الآن واحصل على تعليم شخصي يناسب
                  احتياجاتك.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.6}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}>
                    <Button
                      size="lg"
                      className="bg-blue hover:bg-blue-dark text-white px-8 py-3"
                      asChild>
                      <Link to="/teachers">
                        ابدأ التعلم الآن
                        <ChevronLeft className="mr-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-blue text-blue hover:bg-blue hover:text-white px-8 py-3"
                      asChild>
                      <Link to="/about">اعرف المزيد</Link>
                    </Button>
                  </motion.div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Stats Section with Count Up Animation */}
        <AnimatedSection delay={0.8}>
          <section className="py-16 bg-card text-card-foreground">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 1 + index * 0.1,
                      duration: 0.5,
                    }}
                    whileHover={{ scale: 1.05 }}
                    className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-light/20 dark:bg-blue/20 text-blue mb-4">
                      <stat.icon size={32} />
                    </div>
                    <motion.div
                      className="text-3xl font-bold text-blue-dark dark:text-blue-light mb-2"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: 1.2 + index * 0.1,
                        type: "spring",
                        stiffness: 200,
                      }}>
                      {stat.value}
                    </motion.div>
                    <p className="text-gray-600 dark:text-gray-300">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Top Rated Teachers Section */}
        <TopRatedTeachers />

        {/* Subjects Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900/40 dark-transition">
          <div className="container mx-auto px-4">
            <AnimatedSection delay={1.5} className="text-center mb-12">
              <h2 className="text-3xl font-bold text-blue-dark dark:text-blue-light mb-4">
                المواد المتاحة
              </h2>
              <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                نوفر دروساً في جميع المواد الدراسية مع مدرسين متخصصين ومؤهلين
              </p>
            </AnimatedSection>

            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {subjects.map((subject, index) => (
                <motion.div
                  key={subject}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 1.7 + index * 0.05,
                    duration: 0.3,
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}>
                  <Badge
                    variant="secondary"
                    className="bg-white dark:bg-gray-800 hover:bg-blue-light/10 dark:hover:bg-gray-700 text-blue-dark dark:text-blue-light border border-blue-light/20 dark:border-gray-700 px-4 py-2 text-sm cursor-pointer">
                    {subject}
                  </Badge>
                </motion.div>
              ))}
            </div>

            <AnimatedSection delay={2.2} className="text-center mt-8">
              <Button
                variant="outline"
                className="border-blue text-blue hover:bg-blue hover:text-white"
                asChild>
                <Link to="/subjects">عرض جميع المواد</Link>
              </Button>
            </AnimatedSection>
          </div>
        </section>

        {/* CTA Section */}
        <AnimatedSection delay={2.4}>
          <section className="py-20 bg-gradient-to-r from-blue to-blue-dark">
            <div className="container mx-auto px-4 text-center">
              <motion.h2
                className="text-4xl font-bold text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.6, duration: 0.5 }}>
                ابدأ رحلتك التعليمية اليوم
              </motion.h2>

              <motion.p
                className="text-xl text-blue-light mb-8 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.8, duration: 0.5 }}>
                انضم إلى آلاف الطلاب الذين حققوا أهدافهم التعليمية معنا
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 3, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-blue hover:bg-gray-100 px-8 py-3"
                  asChild>
                  <Link to="/auth">سجل الآن مجاناً</Link>
                </Button>
              </motion.div>
            </div>
          </section>
        </AnimatedSection>
      </main>
    </PageTransition>
  );
};

export default HomePage;
