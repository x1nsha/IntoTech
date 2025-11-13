import { create } from "zustand";
import type { SocialLinks, User, UserRole } from "../types/auth.types";
import { authApi, userApi } from "../service/api.auth";

interface AuthState
{
    isAuthenticated: boolean;
    user: User | null;
    users: User[];
    token: string | null;
    isActive: boolean;
    error: string | null;
    loading: boolean;
    changingRole: string;
    login: (email: string, password: string) => Promise<void>;
    register: (username: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    updateUser: (data: { bio?: string, avatarUrl?: string, sosialLinks?: SocialLinks }) => Promise<void>;
    deleteUser: () => Promise<void>;
    initialize: () => Promise<void>;
    setError: (error: string) => void;
    setLoading: (loading: boolean) => void;
    setUsers: (users: User[]) => void;
    getAllUsers: () => Promise<void>;
    setChangingRole: (changingRole: string) => void;
    changeUserRole: (userId: string, role: UserRole) => Promise<void>;
}

const useAuthStore = create<AuthState>((set, get) => ({
    isAuthenticated: false,
    isActive: false,
    user: null,
    users: [],
    token: null,
    changingRole: "",
    error: null,
    loading: true,
    setError: (error: string) => set({ error }),
    setLoading: (loading: boolean) => set({ loading }),
    login: async (email: string, password: string) => {
        set({ loading: true, error: null });
        try {
            const response = await authApi.login(email, password);
            const token = response.token;
            localStorage.setItem("token", token);
            set({ isAuthenticated: true, token: token, loading: false });
            const userResponse = await userApi.getProfile();
            set({ user: userResponse.data, loading: false, error: null, isAuthenticated: true, isActive: userResponse.data.isActive });
        } catch (error) {
            set({
                loading: false,
                error: error instanceof Error ? error.message : "An unknown error occurred",
                isAuthenticated: false,
                isActive: false
            });
            throw error;
        } finally {
            set({ loading: false });
        }
    },
    register: async (username: string, email: string, password: string, ) => {
        set({ loading: true, error: null });
        try {
            await authApi.register(username, email, password);
        } catch (error) {
            set({
                loading: false,
                error: error instanceof Error ? error.message : "An unknown error occurred",
                isAuthenticated: false,
                isActive: false
            });
            throw error;
        } finally {
            set({ loading: false });
        }
    },
    logout: async () => {
        localStorage.removeItem("token");
        set({ isAuthenticated: false, user: null, token: null, isActive: false });
     },
    updateUser: async (data: { bio?: string, avatarUrl?: string, sosialLinks?: SocialLinks }) => { 
        set({ loading: true, error: null, isAuthenticated: true, isActive: true });
        try {
            const response = await userApi.updateProfile(data);
            set({user: {...get().user, ...response.data}})
        } catch (error) {
            set({
                loading: false,
                error: error instanceof Error ? error.message : "An unknown error occurred",
                isAuthenticated: false,
                isActive: false
            });
            throw error;
        } finally {
            set({ loading: false });
        }
    },
    deleteUser: async () => { 
        set({ loading: true, error: null, isAuthenticated: true, isActive: true });
        try {
            await userApi.deleteProfile();
            localStorage.removeItem("token");
            set({ isAuthenticated: false, user: null, token: null, isActive: false });
        } catch (error) {
            set({ loading: false, error: error instanceof Error ? error.message : "An unknown error occurred", isAuthenticated: false, isActive: false });
            throw error;
        } finally {
            set({ loading: false });
        }
    },
    initialize: async () => {
        set({ loading: true, error: null, isAuthenticated: false, isActive: false });
        try {
            const token = localStorage.getItem("token");
            if (token) {
                const userResponse = await userApi.getProfile();
                set({ user: userResponse.data, loading: false, error: null, isAuthenticated: true, isActive: userResponse.data.isActive });
            }
        } catch (error) {
            set({ loading: false, error: error instanceof Error ? error.message : "An unknown error occurred", isAuthenticated: false, isActive: false });
            throw error;
        } finally {
            set({ loading: false });
        }
    },
    setUsers: (users: User[])=>{
        set({ users: users });
    },
    getAllUsers: async()=>{
        set({ loading: true, error: null, isAuthenticated: true, isActive: true });
        try {
            const response = await userApi.getAllUsers();
            set({ users: response.data, loading: false, error: null, isAuthenticated: true, isActive: true });
        } catch (error) {
            set({ loading: false, error: error instanceof Error ? error.message : "An unknown error occurred", isAuthenticated: false, isActive: false });
            throw error;
        } finally {
            set({ loading: false });
        }
    },
    setChangingRole: (changingRole: string)=>{
        set({ changingRole: changingRole });
    },
    changeUserRole: async(userId: string, role: UserRole)=>{
        set({ loading: true, error: null, isAuthenticated: true, isActive: true });
        try {
            const response = await userApi.changeUserRole(userId, role);
            set({ users: response.data, loading: false, error: null, isAuthenticated: true, isActive: true });
        } catch (error) {
            set({ loading: false, error: error instanceof Error ? error.message : "An unknown error occurred", isAuthenticated: false, isActive: false });
            throw error;
        } finally {
            set({ loading: false });
        }
    }
}))

export default useAuthStore;