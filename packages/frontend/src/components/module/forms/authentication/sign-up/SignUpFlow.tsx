import ConnectingWallet from "./ConnectingWallet"
import ConnectToWallet from "./ConnectToWallet"
import FillEmailForm from "./FillEmailForm"
import SignUpForm from "./SignUpForm"
import { UseSignUpProvider } from "./useSignUp"
import VerifySignUpForm from "./VerifySignUpForm"

const SignUpFlow = () => {
  return (
    <UseSignUpProvider>
      <SignUpForm />
      <VerifySignUpForm />
      <FillEmailForm />
      <ConnectToWallet />
      <ConnectingWallet />
    </UseSignUpProvider>
  )
}

export default SignUpFlow
