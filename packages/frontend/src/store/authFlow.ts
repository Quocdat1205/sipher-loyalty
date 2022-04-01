import create from "zustand"

interface AuthFlowState {
  state: "changeWallet" | "connectWallet" | null
  setState: (state: "changeWallet" | "connectWallet" | null) => void
}

export const useAuthFlowStore = create<AuthFlowState>(set => ({
  state: null,
  setState: newState => set(() => ({ state: newState })),
}))
