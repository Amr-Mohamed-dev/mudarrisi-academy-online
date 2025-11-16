import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Book, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

import { Subject } from "@/types/subjects.types";
import { SITE_ENDPOINTS } from "@/config/endpoints";

const SubjectsPage = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [filteredSubjects, setFilteredSubjects] = useState<Subject[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await SITE_ENDPOINTS.subjects.getAll();

        const data = res.data.map((subject: Subject) => ({
          ...subject,
          categories: subject.categories ?? [],
          level: subject.level ?? "غير محدد",
          teachersCount: subject.teachersCount ?? 0,
        }));

        setSubjects(data);
        setFilteredSubjects(data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  useEffect(() => {
    let filtered = subjects;

    if (searchTerm) {
      filtered = filtered.filter(
        (subject) =>
          subject.name.includes(searchTerm) ||
          subject.description.includes(searchTerm) ||
          subject.categories.some((cat) => cat.includes(searchTerm))
      );
    }

    if (selectedLevel !== "all") {
      filtered = filtered.filter((subject) =>
        subject.level.includes(selectedLevel)
      );
    }

    setFilteredSubjects(filtered);
  }, [searchTerm, selectedLevel, subjects]);

  const levels = [
    { id: "all", name: "جميع المستويات" },
    { id: "primary", name: "ابتدائي" },
    { id: "middle", name: "متوسط" },
    { id: "secondary", name: "ثانوي" },
    { id: "university", name: "جامعي" },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        جاري تحميل المواد...
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen pt-16">
      <main className="container mx-auto px-4 py-8 flex-grow">
        <motion.div
          className="max-w-screen-xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}>
          <div className="mb-8 text-center">
            <motion.h1
              className="text-4xl font-bold text-blue-dark dark:text-blue-light mb-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}>
              المواد الدراسية
            </motion.h1>
            <motion.p
              className="text-gray-700 dark:text-gray-300 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}>
              استكشف جميع المواد الدراسية المتوفرة وابحث عن المدرسين المناسبين
              لك
            </motion.p>
          </div>

          <div className="flex flex-col md:flex-row gap-6 mb-8">
            {/* Sidebar filter */}
            <motion.div
              className="md:w-1/4"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}>
              <div className="bg-gray-300 dark:bg-gray-700 shadow-md rounded-lg p-4">
                <h2 className="font-bold text-lg mb-4">تصفية البحث</h2>

                <div className="mb-4">
                  <label className="block mb-2">المستوى التعليمي</label>
                  <div className="space-y-2">
                    {levels.map((level) => (
                      <div key={level.id} className="flex items-center">
                        <input
                          type="radio"
                          id={level.id}
                          name="level"
                          checked={selectedLevel === level.id}
                          onChange={() => setSelectedLevel(level.id)}
                          className="mr-2"
                        />
                        <label htmlFor={level.id}>{level.name}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setSelectedLevel("all")}>
                  إعادة ضبط التصفية
                </Button>
              </div>
            </motion.div>

            {/* Cards Section */}
            <div className="md:w-3/4">
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                  {filteredSubjects.length > 0 ? (
                    filteredSubjects.map((subject, index) => (
                      <motion.div
                        key={subject.id}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 40 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}>
                        <Card className="hover:border-blue-light hover:shadow-md transition-all">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-xl flex items-center">
                              <Book className="ml-2 text-blue" size={20} />
                              {subject.name}
                            </CardTitle>
                          </CardHeader>

                          <CardContent>
                            <p className="text-gray-600 mb-4 text-sm h-12 overflow-hidden">
                              {subject.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-4">
                              {subject.categories.map((category, index) => (
                                <Badge
                                  key={index}
                                  variant="secondary"
                                  className="bg-blue-light/10 text-blue-dark">
                                  {category}
                                </Badge>
                              ))}
                            </div>

                            <div className="flex justify-between items-center">
                              <div className="flex items-center text-gray-600 text-sm">
                                <User size={14} className="ml-1" />
                                <span>{subject.teachersCount} مدرس</span>
                              </div>

                              <div className="text-sm text-gray-600">
                                <span>{subject.level}</span>
                              </div>
                            </div>

                            <div className="mt-4">
                              <Button className="w-full" asChild>
                                <Link to={`/subjects/${subject.id}`}>
                                  عرض المدرسين
                                </Link>
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))
                  ) : (
                    <motion.div
                      className="col-span-full text-center py-12"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}>
                      <p className="text-xl text-gray-500">
                        لم يتم العثور على مواد مطابقة
                      </p>
                      <Button
                        variant="link"
                        onClick={() => setSelectedLevel("all")}>
                        إعادة ضبط البحث
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default SubjectsPage;
