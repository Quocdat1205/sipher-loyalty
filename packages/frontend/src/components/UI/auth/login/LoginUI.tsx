import { Fragment, useState } from "react"

import LoginFormUI from "./LoginFormUI"
import VerifyFormUI from "./VerifyFormUI"

export enum LoginStep {
  Login = "login",
  Verify = "verify",
}

const LoginUI = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [step, setStep] = useState(LoginStep.Login)
  return (
    <Fragment>
      {step === LoginStep.Login && (
        <LoginFormUI setStep={setStep} onChangeEmail={setEmail} onChangePassword={setPassword} />
      )}
      {step === LoginStep.Verify && <VerifyFormUI email={email} password={password} />}
    </Fragment>
  )
}

export default LoginUI
