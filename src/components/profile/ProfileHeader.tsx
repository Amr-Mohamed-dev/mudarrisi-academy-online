import React from "react";
import { MapPin, User } from "lucide-react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface ProfileHeaderProps {
    name: string;
    title?: string;
    location?: string;
    image?: string;
    rating?: number;
    reviewCount?: number;
    price?: number;
    studentCount?: number;
    isAvailable?: boolean;
}

// صور تجريبية عالية الجودة
const profileImages = [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&h=400&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
];

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
    name,
    title,
    location,
    image,
    rating,
    reviewCount,
    price,
    studentCount,
    isAvailable,
}) => {
    const getProfileImage = () => {
        if (image && image !== "/placeholder.svg") return image;
        const index = name.length % profileImages.length;
        return profileImages[index];
    };

    return (
        <motion.div
            className="rounded-lg shadow-md p-6 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex flex-col md:flex-row items-center gap-5">
                <motion.div
                    className="mb-4 md:mb-0 md:ml-6"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    whileHover={{ scale: 1.05 }}
                >
                    <Avatar className="h-24 w-24 md:h-32 md:w-32">
                        <AvatarImage src={getProfileImage()} alt={name} />
                        <AvatarFallback>
                            {name
                                ?.split(" ")
                                .map((part) => part[0])
                                .join("") || "مستخدم"}
                        </AvatarFallback>
                    </Avatar>
                </motion.div>

                <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <motion.h1
                                className="text-3xl font-bold"
                                whileHover={{ scale: 1.02 }}
                            >
                                {name}
                            </motion.h1>
                            {title && (
                                <p className="text-gray-600 mb-2">{title}</p>
                            )}

                            {rating && (
                                <motion.div
                                    className="flex items-center mb-2"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <div className="flex">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <motion.div
                                                key={star}
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{
                                                    delay: 0.4 + star * 0.1,
                                                    type: "spring",
                                                }}
                                            >
                                                <Star
                                                    size={18}
                                                    className={`fill-current ${
                                                        star <=
                                                        Math.floor(rating)
                                                            ? "text-amber-400"
                                                            : "text-gray-300"
                                                    }`}
                                                />
                                            </motion.div>
                                        ))}
                                    </div>
                                    <span className="font-bold mx-2">
                                        {rating}
                                    </span>
                                    <span className="text-gray-600">
                                        ({reviewCount} تقييم)
                                    </span>
                                </motion.div>
                            )}

                            {location && (
                                <motion.div
                                    className="flex flex-wrap items-center text-gray-600 mb-2"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <MapPin size={16} className="ml-1" />
                                    <span>{location}</span>
                                </motion.div>
                            )}

                            {studentCount !== undefined && (
                                <motion.div
                                    className="flex flex-wrap items-center text-gray-600"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                >
                                    <User size={16} className="ml-1" />
                                    <span>{studentCount} طالب</span>
                                </motion.div>
                            )}

                            {isAvailable !== undefined && (
                                <motion.div
                                    className="mt-2"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.7 }}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <Badge
                                        variant={
                                            isAvailable ? "default" : "outline"
                                        }
                                        className={
                                            isAvailable
                                                ? "bg-green-500 hover:bg-green-600"
                                                : "text-gray-500"
                                        }
                                    >
                                        {isAvailable
                                            ? "متاح الآن"
                                            : "غير متاح حاليًا"}
                                    </Badge>
                                </motion.div>
                            )}
                        </motion.div>

                        {price !== undefined && (
                            <motion.div
                                className="mt-4 md:mt-0"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                            >
                                <div className="text-right md:text-right">
                                    <p className="text-sm text-gray-500">
                                        السعر بالساعة
                                    </p>
                                    <motion.p
                                        className="text-2xl font-bold text-blue-600"
                                        whileHover={{ scale: 1.1 }}
                                    >
                                        {price} ريال
                                    </motion.p>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const Star = ({ size = 16, className = "" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
);

export default ProfileHeader;
