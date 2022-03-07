import create from "zustand"

type State = {
    isSidebarOpen: boolean
    toggleSidebar: () => void
    isFilterDrawerOpen: boolean
    toggleFilterDrawer: () => void
    gridSize: "small" | "medium"
    setGridSize: (value: "small" | "medium") => void
    layoutType: "explorer" | "stats"
    setLayoutType: (value: "explorer" | "stats") => void
}

export const useStore = create<State>((set) => ({
    isSidebarOpen: true,
    toggleSidebar: () =>
        set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
    isFilterDrawerOpen: false,
    toggleFilterDrawer: () =>
        set((state) => ({ isFilterDrawerOpen: !state.isFilterDrawerOpen })),
    gridSize: "medium",
    setGridSize: (value) => set(() => ({ gridSize: value })),
    layoutType: "explorer",
    setLayoutType: (value) => set(() => ({ layoutType: value })),
}))
