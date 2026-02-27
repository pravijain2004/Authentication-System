import { create } from "zustand";
import { Product } from "@/types";
import axiosInstance from "@/lib/axios";

interface ProductsState {
  products: Product[];
  total: number;
  loading: boolean;
  error: string | null;
  searchQuery: string;
  selectedCategory: string;
  currentPage: number;
  categories: string[];
  pageCache: Record<string, Product[]>;

  fetchProducts: (page: number, limit: number, search?: string, category?: string) => Promise<void>;
  fetchCategories: () => Promise<void>;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  setCurrentPage: (page: number) => void;
}

export const useProductsStore = create<ProductsState>((set, get) => ({
  products: [],
  total: 0,
  loading: false,
  error: null,
  searchQuery: "",
  selectedCategory: "",
  currentPage: 0,
  categories: [],
  pageCache: {},

  fetchProducts: async (page, limit, search, category) => {
    const skip = page * limit;
    const cacheKey = `${page}-${search || ""}-${category || ""}`;

    const cached = get().pageCache[cacheKey];
    if (cached) {
      set({ products: cached });
      return;
    }

    set({ loading: true, error: null });

    try {
      let url = "";
      if (search) {
        url = `/products/search?q=${search}&limit=${limit}&skip=${skip}`;
      } else if (category) {
        url = `/products/category/${category}?limit=${limit}&skip=${skip}`;
      } else {
        url = `/products?limit=${limit}&skip=${skip}`;
      }

      const res = await axiosInstance.get(url);

      set((state) => ({
        products: res.data.products,
        total: res.data.total,
        loading: false,
        pageCache: { ...state.pageCache, [cacheKey]: res.data.products },
      }));
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  fetchCategories: async () => {
    try {
      const res = await axiosInstance.get("/products/categories");
      // dummyjson returns array of {slug, name, url}
      const cats = res.data.map((c: any) => (typeof c === "string" ? c : c.slug));
      set({ categories: cats });
    } catch {}
  },

  setSearchQuery: (query) => set({ searchQuery: query, pageCache: {} }),
  setSelectedCategory: (cat) => set({ selectedCategory: cat, pageCache: {} }),
  setCurrentPage: (page) => set({ currentPage: page }),
}));