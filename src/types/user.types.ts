import { Course } from "./course.types";
import { Grade } from "./level.types";

export type UserRole = "ADMIN" | "TEACHER" | "STUDENT";

export type User = {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    gender: string;
    phone: string;
    code: string;
    bio: string;
    profileImage: string;
    isActive: boolean;
    isVerified: boolean;
    taughtCourses?: Course[];
    enrolledCourses?: Course[];
    grade?: Grade;
    createdAt: string;
    updatedAt: string;
};
