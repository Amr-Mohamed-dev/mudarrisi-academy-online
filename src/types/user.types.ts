export type Role = {
    id: string;
    name: string;
    caption: string;
    createdAt: string;
    updatedAt: string;
};

export type User = {
    id: string;
    name: string;
    email: string;
    token: string;
    image?: string;
    role?: Role;
    permissions?: string[];
    createdAt?: Date;
};
