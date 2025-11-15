import { create } from "zustand";
import type { Product } from "@/types/product.types";
import productsApi from "@/service/api.products";

interface ProductState
{
    products: Product[];
    allProducts: Product[];
    product: Product | null;
    loading: boolean;
    error: string | null;
    sortBy: string;
    currentSort: string;
    selectedCategories: string[];
    searchQuery: string;
    isSearching: boolean;
    isMineView: boolean;
    getProducts: () => Promise<void>;
    getMyProducts: (sortBy?: string) => Promise<void>;
    getProductById: (id: string) => Promise<void>;
    createProduct: (product: Product) => Promise<void>;
    updateProduct: (id: string, product: Product) => Promise<void>;
    deleteProduct: (id: string) => Promise<void>;
    sortProducts: (sortBy: string) => Promise<void>;
    setSortBy: (sortBy: string) => void;
    setCurrentSort: (currentSort: string) => void;
    setProducts: (products: Product[]) => void;
    toggleCategory: (category: string) => void;
    setSelectedCategories: (categories: string[]) => void;
    applyFilters: () => void;
    searchProducts: (searchQuery: string) => Promise<void>;
    setSearchQuery: (searchQuery: string) => void;
    clearSearch: () => void;
}

export const useProductStore = create<ProductState>((set, get) => ({
    products: [],
    allProducts: [],
    product: null,
    loading: false,
    error: null,
    sortBy: "latest",
    currentSort: "latest",
    selectedCategories: [],
    searchQuery: "",
    isSearching: false,
    isMineView: false,

    getProducts: async () =>
    {
        try
        {
            const response = await productsApi.getProducts();
            set({ products: response.data, allProducts: response.data, isMineView: false, loading: false });
        }
        catch (error)
        {
            set({ loading: false, error: error instanceof Error ? error.message : "An unknown error occurred" });
            throw error;
        }
        finally
        {
            set({ loading: false });
        }
    },
    getMyProducts: async (sortBy?: string) =>
    {
        try
        {
            const response = await productsApi.getMyProducts(sortBy || get().currentSort);
            set({ products: response.data, allProducts: response.data, isMineView: true, loading: false });
        }
        catch (error)
        {
            set({ loading: false, error: error instanceof Error ? error.message : "An unknown error occurred" });
            throw error;
        }
        finally
        {
            set({ loading: false });
        }
    },
    getProductById: async (id: string) =>
    {
        try
        {
            const response = await productsApi.getProductById(id);
            set({ product: response.data, loading: false });
        }
        catch (error)
        {
            set({ loading: false, error: error instanceof Error ? error.message : "An unknown error occurred" });
            throw error;
        }
        finally
        {
            set({ loading: false });
        }
    },
    createProduct: async (product: Product) =>
    {
        try
        {
            const response = await productsApi.createProduct(product);
            const newProduct = response.data;
            set((state) => ({ 
                products: [...state.products, newProduct],
                allProducts: [...state.allProducts, newProduct]
            }));
        }
        catch (error)
        {
            set({ loading: false, error: error instanceof Error ? error.message : "An unknown error occurred" });
            throw error;
        }
        finally
        {
            set({ loading: false });
        }
    },
    updateProduct: async (id: string, product: Product) =>
    {
        try
        {
            const response = await productsApi.updateProduct(id, product);
            set((state) => ({ 
                products: state.products.map((p) => p._id === id ? response.data : p),
                allProducts: state.allProducts.map((p) => p._id === id ? response.data : p)
            }));
        }
        catch (error)
        {
            set({ loading: false, error: error instanceof Error ? error.message : "An unknown error occurred" });
            throw error;
        }
        finally
        {
            set({ loading: false });
        }
    },
    deleteProduct: async (id: string) =>
    {
        try
        {
            await productsApi.deleteProduct(id);
            set((state) => ({ 
                products: state.products.filter((p) => p._id !== id),
                allProducts: state.allProducts.filter((p) => p._id !== id)
            }));
        }
        catch (error)
        {
            set({ loading: false, error: error instanceof Error ? error.message : "An unknown error occurred" });
            throw error;
        }
        finally
        {
            set({ loading: false });
        }
    },
    sortProducts: async (sortBy: string) =>
    {
        try
        {
            if (get().isMineView) {
                await get().getMyProducts(sortBy);
            } else {
                const response = await productsApi.sortProducts(sortBy);
                set({ products: response.data, allProducts: response.data, loading: false });
            }
        }
        catch (error)
        {
            set({ loading: false, error: error instanceof Error ? error.message : "An unknown error occurred" });
            throw error;
        }
        finally
        {
            set({ loading: false });
        }
    },
    setSortBy: (sortBy: string) => set({ sortBy }),
    setCurrentSort: (currentSort: string) => set({ currentSort }),
    setProducts: (products: Product[]) => set({ products }),
    setSelectedCategories: (categories: string[]) => {
        const includeMine = categories.includes('my-products');
        set({ selectedCategories: categories, isMineView: includeMine });
        const { searchQuery } = get();
        if (!searchQuery.trim()) {
            get().applyFilters();
        }
    },
    toggleCategory: (category: string) =>
    {
        const { selectedCategories, searchQuery } = get();

        // Special handling for 'my-products'
        if (category === 'my-products') {
            const willSelect = !selectedCategories.includes('my-products');
            if (willSelect) {
                set({ selectedCategories: ['my-products'], isMineView: true });
                // Load user's products
                get().getMyProducts(get().currentSort).catch(() => {});
            } else {
                // Deselect my-products and go back to all
                set({ selectedCategories: [], isMineView: false });
                get().getProducts().catch(() => {});
            }
            return;
        }

        // If switching from my-products to a normal category
        if (selectedCategories.includes('my-products')) {
            set({ selectedCategories: [category], isMineView: false });
            get().getProducts().catch(() => {});
        } else {
            const newCategories = selectedCategories.includes(category)
                ? selectedCategories.filter((c) => c !== category)
                : [...selectedCategories, category];
            set({ selectedCategories: newCategories });
        }

        if (!searchQuery.trim())
        {
            get().applyFilters();
        }
    },
    applyFilters: () =>
    {
        const { allProducts, selectedCategories } = get();
        // When 'my-products' is selected, show all mine (already loaded into allProducts)
        if (selectedCategories.includes('my-products')) {
            set({ products: allProducts });
            return;
        }
        if (selectedCategories.length === 0)
        {
            set({ products: allProducts });
        }
        else
        {
            const filtered = allProducts.filter((product) => selectedCategories.includes(product.category));
            set({ products: filtered });
        }
    },
    searchProducts: async (searchQuery: string) =>
    {
        try
        {
            const { selectedCategories, isMineView, allProducts } = get();
            if (isMineView || selectedCategories.includes('my-products')) {
                const q = searchQuery.trim().toLowerCase();
                const filtered = allProducts.filter(p => p.name.toLowerCase().includes(q));
                set({ products: filtered, loading: false });
            } else {
                const response = await productsApi.searchProducts(searchQuery, selectedCategories);
                set({ products: response.data, loading: false });
            }
        }
        catch (error)
        {
            set({ loading: false, error: error instanceof Error ? error.message : "An unknown error occurred" });
            throw error;
        }
        finally
        {
            set({ loading: false });
        }
    },
    setSearchQuery: (searchQuery: string) => set({ searchQuery }),
    clearSearch: () =>
    {
        set({ searchQuery: "" });
        get().applyFilters();
    },
}))