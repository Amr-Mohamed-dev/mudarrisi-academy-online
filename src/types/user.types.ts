export type User = {
    id: string;
    telegramChatId: string;
    name: string;
    phone: string;
    code: string;
    email: string;
    bio: string;
    profileImage: string;
    role?: "student" | "teacher" | "admin";
    isActive: boolean;
    isVerified: boolean;
    createdAt?: Date;
    updatedAt?: Date;
};
