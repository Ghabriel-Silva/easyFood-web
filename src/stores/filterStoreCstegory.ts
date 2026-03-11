import { FilterCategoryType } from "@/app/(protected)/category/validations/filterValidations"
import { create } from "zustand"




type FilterStoreCategory = {
    filter: FilterCategoryType| null
    setFilter: (f: FilterCategoryType | null) => void
    clearFilter: () => void
}


export const useFilterStoreCategory = create<FilterStoreCategory>((set) => ({
    filter: null,
    setFilter: (f) => set({ filter: f }),
    clearFilter: () => set({ filter: null })
}))