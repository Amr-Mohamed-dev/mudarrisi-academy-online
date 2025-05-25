
import React from 'react';
import { motion } from 'framer-motion';
import { Star, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const topTeachers = [
  {
    id: "2",
    name: "فاطمة أحمد السيد",
    subject: "اللغة العربية",
    rating: 4.9,
    price: 120,
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
    subjects: ["اللغة العربية", "التاريخ"],
    studentsCount: 250
  },
  {
    id: "5",
    name: "عمر خالد أحمد",
    subject: "اللغة الإنجليزية",
    rating: 4.9,
    price: 140,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    subjects: ["اللغة الإنجليزية"],
    studentsCount: 180
  },
  {
    id: "6",
    name: "سارة محمود علي",
    subject: "الأحياء",
    rating: 4.8,
    price: 170,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    subjects: ["الأحياء", "الكيمياء"],
    studentsCount: 200
  }
];

const TopRatedTeachers = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="bg-gradient-to-br from-blue-50 to-blue-100 py-16"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-blue-dark mb-4">
            المدرسين الأعلى تقييماً
          </h2>
          <p className="text-gray-600 text-lg">
            تعرف على أفضل المدرسين المتاحين واحجز معهم الآن
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topTeachers.map((teacher, index) => (
            <motion.div
              key={teacher.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="text-center pb-4">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="mx-auto mb-4"
                  >
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={teacher.image} alt={teacher.name} />
                      <AvatarFallback>
                        {teacher.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                  </motion.div>
                  <CardTitle className="text-lg">{teacher.name}</CardTitle>
                  <p className="text-blue-600 font-medium">{teacher.subject}</p>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={`${
                          i < Math.floor(teacher.rating)
                            ? "text-amber-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-600 mr-2">
                      ({teacher.rating})
                    </span>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <BookOpen size={16} />
                    <span>{teacher.studentsCount} طالب</span>
                  </div>

                  <div className="flex flex-wrap justify-center gap-1">
                    {teacher.subjects.map((subject, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="text-xs bg-blue-light/10 text-blue-dark"
                      >
                        {subject}
                      </Badge>
                    ))}
                  </div>

                  <div className="text-center">
                    <span className="text-lg font-bold text-blue-600">
                      {teacher.price} ريال/ساعة
                    </span>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button className="w-full" asChild>
                      <Link to={`/teachers/${teacher.id}`}>
                        عرض الملف الشخصي
                      </Link>
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center mt-8"
        >
          <Button variant="outline" className="border-blue text-blue hover:bg-blue hover:text-white" asChild>
            <Link to="/teachers">عرض جميع المدرسين</Link>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TopRatedTeachers;
