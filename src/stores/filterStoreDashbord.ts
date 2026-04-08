import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { dashboardDateType } from "@/app/(protected)/dashboard/validations/dashbord"

type FilterDashbord = {
    filter: dashboardDateType | null
    setFilter: (f: dashboardDateType) => void
    clearFilter: () => void
}

export const useFilterStoreDashboard = create<FilterDashbord>()(
    persist(
        (set) => ({
            filter: null,
            setFilter: (f) => set({ filter: f }),
            clearFilter: () => set({ filter: null })
        }),
        {
            name: "dashboard-filter-storage", 
            storage: createJSONStorage(() => localStorage), 
        }
    )
)