import { Course } from "./course.types";
import { Grade } from "./level.types";

export type UserRole = "ADMIN" | "TEACHER" | "STUDENT";

export type User = {
  avatar: string;
  id: string;
  name: string;
  email: string;
  password: string;
  subjects: string[];
  hourlyRate: number;
  experience: string;
  education: string;
  rating: number;
  totalRatings: number;
  completedLessons: number;
  isApproved: boolean;
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
  createdAt: string;
  updatedAt: string;
  educationalStages: string;
};
