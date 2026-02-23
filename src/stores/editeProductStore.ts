import { IProductOutput } from "@/app/(protected)/products/interfaces/products";
import { create } from "zustand";

type editeProducts = {
    IsEdite: boolean,
    setEdite: (v: boolean) => void
    product: IProductOutput,
    setProduct: (v:IProductOutput) => void
}


export const useEditeProduct = create<editeProducts>((set) => ({
    IsEdite: false,
    product: {} as IProductOutput,
    setEdite: (f) => set({ IsEdite: f }),
    setProduct: (f) => set({ product: f })
}))