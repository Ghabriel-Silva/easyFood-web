import { create } from "zustand"
import { FilterProductsType } from "@/app/(protected)/products/validations/filter-products"


type FilterStore = {
    filter: FilterProductsType | null
    setFilter: (f: FilterProductsType | null) => void
    clearFilter: () => void
}


export const useFilterStore = create<FilterStore>((set) => ({
    filter: null,
    setFilter: (f) => set({ filter: f }),
    clearFilter: () => set({ filter: null })
}))