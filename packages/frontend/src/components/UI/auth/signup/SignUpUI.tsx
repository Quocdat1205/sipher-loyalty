import { Fragment, useState } from "react"

import ConnectWalletUI from "./ConnectWalletUI"
import SignUpFormUI from "./SignUpFormUI"
import VerifyForm from "./VerifyForm"
import WalletInUseUI from "./WalletInUse"

export enum SignUpStep {
  SignUp = "signUp",
  Verify = "verify",
  ConnectWallet = "connectWallet",
  WalletInUse = "walletInUse",
}

const SignUpUI = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [currentAddress, setCurrentAddress] = useState("")
  const [step, setStep] = useState(SignUpStep.SignUp)

  return (
    <Fragment>
      {step === SignUpStep.SignUp && (
        <SignUpFormUI setStep={setStep} onChangeEmail={setEmail} onChangePassword={setPassword} />
      )}
      {step === SignUpStep.Verify && <VerifyForm email={email} password={password} setStep={setStep} />}
      {step === SignUpStep.ConnectWallet && <ConnectWalletUI setStep={setStep} setCurrentAddress={setCurrentAddress} />}
      {step === SignUpStep.WalletInUse && <WalletInUseUI address={currentAddress} />}
    </Fragment>
  )
}

export default SignUpUI
