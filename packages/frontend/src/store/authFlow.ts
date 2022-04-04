import create from "zustand"

type AuthFlow = "changeWallet" | "connectWallet" | "forgotPassword" | "verifyForgotPassword"

interface AuthFlowState {
  state: AuthFlow | null
  setState: (state: AuthFlow | null) => void
}

export const useAuthFlowStore = create<AuthFlowState>(set => ({
  state: null,
  setState: newState => set(() => ({ state: newState })),
}))
