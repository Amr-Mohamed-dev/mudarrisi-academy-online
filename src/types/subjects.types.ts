export type Subject = {
  id: string;
  name: string;
  description: string;
  image?: string;

  // تمت إضافتهم بناءً على صفحة UI
  categories: string[];
  level: string;
  teachersCount: number;

  createdAt?: Date;
  updatedAt?: Date;
};

export type SubjectsResponse = {
  success: boolean;
  data: Subject[];
};

export type SubjectResponse = {
  success: boolean;
  data: Subject;
};

export type CreateSubjectData = {
  name: string;
  description: string;
  image?: string;
  categories: string[];
  level: string;
};

export type UpdateSubjectData = Partial<CreateSubjectData>;
