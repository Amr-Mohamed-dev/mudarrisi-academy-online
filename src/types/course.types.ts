import { Grade } from "./level.types";
import { User } from "./user.types";

export type Course = {
    id: string;
    title: string;
    description: string;
    coverImage: string;
    price: string;
    isActive: boolean;
    teacher: User;
    grade: Grade;
    subject: {
        id: string;
        name: string;
        description: string;
    };
};
