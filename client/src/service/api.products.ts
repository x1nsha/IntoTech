import type { Product } from "@/types/product.types";
import axios from "axios";
import type { AxiosRequestHeaders } from "axios";

const API_BASE_URL = "http://localhost:8080/products";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        const headers: AxiosRequestHeaders = (config.headers ?? {}) as AxiosRequestHeaders;
        headers.Authorization = `Bearer ${token}`;
        config.headers = headers;
    }
    return config;
});

const productsApi =
    {
    getProducts: async ()=>
    {
        const response = await api.get("/");
        return response.data;
    },
    getMyProducts: async (sortBy?: string)=>
    {
        const url = sortBy ? `/mine?sortBy=${encodeURIComponent(sortBy)}` : "/mine";
        const response = await api.get(url);
        return response.data;
    },
    getProductById: async (id: string)=>
    {
        const response = await api.get(`/${id}`);
        return response.data;
    },
    createProduct: async (product: Product)=>
    {
        const response = await api.post("/", product);
        return response.data;
    },
    updateProduct: async (id: string, product: Product)=>
    {
        const response = await api.patch(`/${id}`, product);
        return response.data;
    },
    deleteProduct: async (id: string)=>
    {
        const response = await api.delete(`/${id}`);
        return response.data;
    },
    sortProducts: async (sortBy: string)=>
    {
        const response = await api.get(`/sort?sortBy=${sortBy}`);
        return response.data;
    },
    searchProducts: async (search: string, categories?: string[])=>
    {
        let url = `/search?search=${search}`;
        if (categories && categories.length > 0)
        {
            url += `&categories=${categories.join(',')}`;
        }
        const response = await api.get(url);
        return response.data;
    },
}

export default productsApi;