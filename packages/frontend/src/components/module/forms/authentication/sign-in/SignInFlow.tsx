import ConnectToWallet from "./ConnectToWallet"
import SignInForm from "./SignInForm"
import { UseSignInProvider } from "./useSignIn"
import VerifySignInForm from "./VerifySignInForm"

const SignInFlow = () => {
  return (
    <UseSignInProvider>
      <SignInForm />
      <VerifySignInForm />
      <ConnectToWallet />
    </UseSignInProvider>
  )
}

export default SignInFlow
