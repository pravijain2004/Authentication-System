import { create } from "zustand";
import { User } from "@/types";
import axiosInstance from "@/lib/axios";

/**
 * Caching Strategy:
 * - We store fetched pages in a cache map (pageCache).
 * - Before making an API call, we check if the page is already in cache.
 * - This prevents redundant network requests when navigating back to a page.
 * - Cache is invalidated when search query changes.
 */

interface UsersState {
  users: User[];
  total: number;
  loading: boolean;
  error: string | null;
  searchQuery: string;
  currentPage: number;
  pageCache: Record<string, User[]>; // key: "page-search"

  fetchUsers: (page: number, limit: number, search?: string) => Promise<void>;
  setSearchQuery: (query: string) => void;
  setCurrentPage: (page: number) => void;
}

export const useUsersStore = create<UsersState>((set, get) => ({
  users: [],
  total: 0,
  loading: false,
  error: null,
  searchQuery: "",
  currentPage: 0,
  pageCache: {},

  fetchUsers: async (page: number, limit: number, search?: string) => {
    const skip = page * limit;
    const cacheKey = `${page}-${search || ""}`;

    // Return cached results if available
    const cached = get().pageCache[cacheKey];
    if (cached) {
      set({ users: cached });
      return;
    }

    set({ loading: true, error: null });

    try {
      const url = search
        ? `/users/search?q=${search}&limit=${limit}&skip=${skip}`
        : `/users?limit=${limit}&skip=${skip}`;

      const res = await axiosInstance.get(url);

      // Cache the result
      set((state) => ({
        users: res.data.users,
        total: res.data.total,
        loading: false,
        pageCache: { ...state.pageCache, [cacheKey]: res.data.users },
      }));
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  setSearchQuery: (query) => set({ searchQuery: query, pageCache: {} }), // clear cache on new search
  setCurrentPage: (page) => set({ currentPage: page }),
}));