import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthUser } from "@/types";

/**
 * Why Zustand?
 * - Minimal boilerplate compared to Redux
 * - Built-in support for async actions
 * - persist middleware handles localStorage automatically
 * - Small bundle size (~1KB)
 * - No context providers needed
 */

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  setUser: (user: AuthUser) => void;
  setToken: (token: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      clearAuth: () => set({ user: null, token: null }),
    }),
    {
      name: "auth-storage", // persists to localStorage
    }
  )
);