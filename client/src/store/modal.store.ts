import { create } from "zustand";
import type { Product } from "@/types/product.types";

interface ModalState {
    isOpen: boolean;
    editingProduct: Product | null;
    openModal: () => void;
    openModalWithProduct: (product: Product) => void;
    closeModal: () => void;
}

 export const useModalStore = create<ModalState>((set) => ({
    isOpen: false,
    editingProduct: null,
    openModal: () => set({ isOpen: true, editingProduct: null }),
    openModalWithProduct: (product: Product) => set({ isOpen: true, editingProduct: product }),
    closeModal: () => set({ isOpen: false, editingProduct: null }),
}))

