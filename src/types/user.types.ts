// User types - to be replaced with actual API types when backend is integrated

export type UserRole = "student" | "teacher" | "admin";

export type EducationalStage =
  | "أولى ابتدائي"
  | "ثانية ابتدائي"
  | "ثالثة ابتدائي"
  | "رابعة ابتدائي"
  | "خامسة ابتدائي"
  | "سادسة ابتدائي"
  | "أولى إعدادي"
  | "ثانية إعدادي"
  | "ثالثة إعدادي"
  | "أولى ثانوي"
  | "ثانية ثانوي"
  | "ثالثة ثانوي";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
  isActive?: boolean;
  isApproved?: boolean;
  educationalStage?: EducationalStage;
}
