import create from "zustand"

// * FLOW: SIGN UP
// * Action: Sign up
// * Action: Verify sign up
// * Action: Fill email
// * Action: Connect to a wallet
// * Action: Connecting to a wallet

// * FLOW: SIGN IN
// * Action: Sign in
// * Action: Connect to a wallet

export enum SignUpAction {
  SignUp = "signUp",
  VerifySignUp = "verifySignUp",
  FillEmail = "fillEmail",
  ConnectWallet = "connectWallet",
  ConnectingWallet = "connectingWallet",
}

export enum SignInAction {
  SignIn = "signIn",
  ConnectWallet = "connectWallet",
  Verify = "verify",
}

export enum ForgotPasswordAction {
  FillEmail = "fillEmail",
  Verify = "verify",
}

export enum ConnectWalletAction {
  Connect = "connect",
}

export enum AuthType {
  SignUp = "signUp",
  SignIn = "signIn",
  ForgotPassword = "forgotPassword",
  ConnectWallet = "connectWallet",
}

export type SignUpFlow = {
  type: AuthType.SignUp
  action: SignUpAction
}

export type SignInFlow = {
  type: AuthType.SignIn
  action: SignInAction
}

export type ForgotPasswordFlow = {
  type: AuthType.ForgotPassword
  action: ForgotPasswordAction
}

export type ConnectWalletFlow = {
  type: AuthType.ConnectWallet
  action: ConnectWalletAction
}

export type AuthFlow = SignUpFlow | SignInFlow | ForgotPasswordFlow | ConnectWalletFlow

interface AuthFlowState {
  state: AuthFlow | null
  setState: (state: AuthFlow | null) => void
}

export const useAuthFlowStore = create<AuthFlowState>(set => ({
  state: null,
  setState: newState => set(() => ({ state: newState })),
}))
