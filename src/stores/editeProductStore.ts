import { IProductOutput } from "@/app/(protected)/products/interfaces/products";
import { create } from "zustand";

type editeProducts = {
    IsEdite: boolean
    setEdite: (v: boolean) => void
    product: IProductOutput | null
    setProduct: (v: IProductOutput | null) => void

    clearProduct: () => void
}


export const useEditeProduct = create<editeProducts>((set) => ({
    IsEdite: false,
    product: null,
    setEdite: (f) => set({ IsEdite: f }),
    setProduct: (f) => set({ product: f }),
    clearProduct: () => set({ product: null })
}))