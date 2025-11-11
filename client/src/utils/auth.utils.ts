import type { User, UserRole } from "../types/auth.types";

export const hasRole = (user: User | null, role: UserRole): boolean => {
    if (!user) return false;
    return user.role === role;
}

export const hasAnyRole = (user: User | null, roles: UserRole[]): boolean => {
    if (!user) return false;
    return roles.includes(user.role);
}

export const isAdmin = (user: User | null): boolean => {
    return hasAnyRole(user, ["admin", "super_admin"]);
}

export const isSuperAdmin = (user: User | null): boolean => {
    return hasRole(user, "super_admin");
}

export const isClient = (user: User | null): boolean => {
    return hasRole(user, "client");
}

export const getRoleDisplayName = (role: UserRole): string => {
    switch (role) {
        case "client":
            return "Client";
        case "admin":
            return "Admin";
        case "super_admin":
            return "Super Admin";
        default:
            return "Unknown";
    }
};

export const getAllowedRoles = (): { role: UserRole, label: string }[] => {
    return [
        { role: "client", label: "Client" },
        { role: "admin", label: "Admin" },
    ]
}