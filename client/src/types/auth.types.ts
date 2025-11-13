export type UserRole = "client" | "admin" | "super_admin"

export interface SocialLinks
{
    twitter: string;
    facebook: string;
    instagram: string;
}

export interface User
{
    _id: string;
    username: string;
    email: string;
    password: string;
    bio?: string;
    role: UserRole;
    avatarUrl?: string;
    isActive: boolean;
    sosialLinks?: SocialLinks;
    createdAt?: Date;
    updatedAt?: Date;
    __v?: number;
}