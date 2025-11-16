import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/utils";

export interface TeacherProps {
  id: string;
  name: string;
  subject: string;
  rating: number;
  price: number;
  image: string;
  subjects: string[];
  available: boolean;
}

// صور تجريبية للمدرسين
const teacherImages = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
];

const TeacherCard = ({
  id,
  name,
  subject,
  rating,
  price,
  image,
  subjects,
  available,
}: TeacherProps) => {
  // اختيار صورة عشوائية بناءً على الاسم
  const getTeacherImage = () => {
    if (image && image !== "/placeholder.svg") return image;
    const index = parseInt(id) % teacherImages.length;
    return teacherImages[index];
  };

  return (
    <motion.div
      className="card hover:border-blue-light border-2 border-transparent shadow-md rounded-lg p-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
      }}>
      <div className="flex flex-col h-full">
        <div className="flex items-start mb-4 gap-1">
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}>
            <Avatar className="h-16 w-16">
              <AvatarImage src={getTeacherImage()} alt={name} />
              <AvatarFallback>
                {name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </motion.div>
          <div className="mr-4 flex-1">
            <motion.h3
              className="text-xl font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}>
              {name}
            </motion.h3>
            <p className=" text-sm">{subject}</p>
            {/* <motion.div
                            className="flex items-center mt-1"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            {Array.from({ length: 5 }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{
                                        delay: 0.3 + i * 0.1,
                                        type: "spring",
                                    }}
                                >
                                    <Star
                                        size={16}
                                        className={cn(
                                            "fill-current",
                                            i < Math.floor(rating)
                                                ? "text-amber-400"
                                                : "text-gray-300"
                                        )}
                                    />
                                </motion.div>
                            ))}
                            <span className="text-sm  mr-1">
                                ({rating})
                            </span>
                        </motion.div> */}
          </div>
          <motion.div
            className="text-right"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}>
            <div className="flex flex-col items-end">
              <span className="text-sm ">السعر بالساعة</span>
              <motion.span
                className="text-lg font-bold text-blue-600"
                whileHover={{ scale: 1.1 }}>
                {price} جنيه
              </motion.span>
              <Badge
                variant={available ? "default" : "outline"}
                className={cn(
                  "mt-2",
                  available
                    ? "bg-green-500 hover:bg-green-600"
                    : "text-red-500 bg-red-100 hover:bg-red-200"
                )}>
                {available ? "متاح الآن" : "غير متاح حاليًا"}
              </Badge>
            </div>
          </motion.div>
        </div>

        {/* <motion.div
                    className="mb-4 flex flex-wrap gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    {subjects.map((subj, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 + i * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <Badge
                                variant="secondary"
                                className="bg-blue-light/10 text-blue-dark hover:bg-blue-light/20"
                            >
                                {subj}
                            </Badge>
                        </motion.div>
                    ))}
                </motion.div> */}

        <motion.div
          className="mt-auto pt-4 flex gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}>
          <motion.div
            className="flex-1"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}>
            <Button variant="default" className="w-full" asChild>
              <Link to={`/teachers/${id}`}>عرض الملف الشخصي</Link>
            </Button>
          </motion.div>
          <motion.div
            className="flex-1"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}>
            <Button variant="outline" className="w-full" asChild>
              <Link to={`/booking/${id}`}>حجز موعد</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TeacherCard;
