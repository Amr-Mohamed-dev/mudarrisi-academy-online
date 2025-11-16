import { Course } from "./course.types";
import { Grade } from "./level.types";

export type Subject = {
    id: string;
    name: string;
    description: string;
    courses: Course[];
    _count: {
        courses: number;
    };
    grades: Grade[];
    teachersCount: number;
};

export type CreateSubjectData = {
    name: string;
    description: string;
};

export type UpdateSubjectData = Partial<CreateSubjectData>;
