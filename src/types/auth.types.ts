export type LoginData = { email: string; password: string }; // LoginData

export type RegisterData = {
    name: string;
    email: string;
    phone?: string;
    password: string;
    role: "student" | "teacher";
    educationalStage?: string;
};
