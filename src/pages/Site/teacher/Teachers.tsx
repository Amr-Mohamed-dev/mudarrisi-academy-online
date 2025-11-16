import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import TeacherCard from "@/components/TeacherCard";
import SubjectFilter from "@/components/SubjectFilter";
import PriceFilter from "@/components/PriceFilter";
import PageTransition from "@/components/PageTransition";
import AnimatedSection from "@/components/AnimatedSection";

// Mock data for teachers
const mockTeachers = [
  {
    id: "1",
    name: "أحمد محمد علي",
    subject: "الرياضيات",
    rating: 4.8,
    price: 150,
    image: "",
    subjects: ["الرياضيات", "الفيزياء"],
    available: true,
  },
  {
    id: "2",
    name: "فاطمة أحمد السيد",
    subject: "اللغة العربية",
    rating: 4.9,
    price: 120,
    image: "",
    subjects: ["اللغة العربية", "التاريخ"],
    available: true,
  },
  {
    id: "3",
    name: "محمد عبد الرحمن",
    subject: "الفيزياء",
    rating: 4.7,
    price: 180,
    image: "",
    subjects: ["الفيزياء", "الكيمياء"],
    available: false,
  },
  {
    id: "4",
    name: "نورا حسن محمد",
    subject: "الكيمياء",
    rating: 4.6,
    price: 160,
    image: "",
    subjects: ["الكيمياء", "الأحياء"],
    available: true,
  },
  {
    id: "5",
    name: "عمر خالد أحمد",
    subject: "اللغة الإنجليزية",
    rating: 4.9,
    price: 140,
    image: "",
    subjects: ["اللغة الإنجليزية"],
    available: true,
  },
  {
    id: "6",
    name: "سارة محمود علي",
    subject: "الأحياء",
    rating: 4.8,
    price: 170,
    image: "",
    subjects: ["الأحياء", "الكيمياء"],
    available: true,
  },
];

// Mock data for subjects
const subjects = [
  "جميع المواد",
  "الرياضيات",
  "الفيزياء",
  "الكيمياء",
  "الأحياء",
  "اللغة العربية",
  "اللغة الإنجليزية",
  "التاريخ",
  "الجغرافيا",
];

const TeachersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("جميع المواد");
  const [priceRange, setPriceRange] = useState<[number, number]>([100, 200]);

  const filteredTeachers = useMemo(() => {
    return mockTeachers.filter((teacher) => {
      const matchesSearch =
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.subjects.some((subject) =>
          subject.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesSubject =
        selectedSubject === "جميع المواد" ||
        teacher.subjects.includes(selectedSubject);

      const matchesPrice =
        teacher.price >= priceRange[0] && teacher.price <= priceRange[1];

      return matchesSearch && matchesSubject && matchesPrice;
    });
  }, [searchTerm, selectedSubject, priceRange]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <PageTransition className="flex flex-col min-h-screen bg-background text-foreground pt-16">
      <main className="container mx-auto px-4 py-8 flex-grow">
        <AnimatedSection delay={0.2}>
          <div className="text-center mb-8">
            <motion.h1
              className="text-4xl font-bold text-blue-dark dark:text-blue-light mb-4"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}>
              أفضل المدرسين
            </motion.h1>
            <motion.p
              className="text-gray-700 dark:text-gray-300 text-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}>
              اختر من بين مجموعة متنوعة من المدرسين المؤهلين والمتخصصين
            </motion.p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <AnimatedSection
            delay={0.4}
            direction="right"
            className="lg:col-span-1">
            <motion.div
              className="bg-card text-card-foreground p-6 rounded-lg shadow-md border space-y-6 sticky top-4"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}>
              <div>
                <h3 className="text-lg font-bold  text-blue-dark dark:text-blue-light mb-4">
                  البحث والفلتر
                </h3>

                {/* Search */}
                {/* <div className="relative mb-4">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="ابحث عن مدرس أو مادة..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pr-10"
                  />
                </div> */}

                {/* Subject Filter */}
                <div className="mb-4">
                  <SubjectFilter
                    subjects={subjects}
                    selectedSubject={selectedSubject}
                    onSubjectChange={setSelectedSubject}
                  />
                </div>

                {/* Price Filter */}
                {/* <PriceFilter
                  minPrice={100}
                  maxPrice={200}
                  selectedRange={priceRange}
                  onChange={setPriceRange}
                /> */}
              </div>
            </motion.div>
          </AnimatedSection>

          {/* Teachers Grid */}
          <div className="lg:col-span-3">
            <AnimatedSection delay={0.6}>
              <motion.div
                className="mb-4 text-gray-700 dark:text-gray-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}>
                تم العثور على {filteredTeachers.length} مدرس
              </motion.div>
            </AnimatedSection>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredTeachers.map((teacher, index) => (
                <motion.div
                  key={teacher.id}
                  variants={itemVariants}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ y: -5 }}>
                  <TeacherCard {...teacher} />
                </motion.div>
              ))}
            </motion.div>

            {filteredTeachers.length === 0 && (
              <AnimatedSection delay={1} className="text-center py-12">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                  }}>
                  <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
                    لم يتم العثور على مدرسين يطابقون البحث
                  </p>
                  <p className="text-gray-400 dark:text-gray-500">
                    جرب تغيير معايير البحث أو الفلتر
                  </p>
                </motion.div>
              </AnimatedSection>
            )}
          </div>
        </div>
      </main>
    </PageTransition>
  );
};

export default TeachersPage;
