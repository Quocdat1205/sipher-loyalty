import { Fragment, useState } from "react"
import { CognitoUser } from "@sipher.dev/ather-id"

import LoginFormUI from "./LoginFormUI"
import NewPasswordFormUI from "./NewPasswordFormUI"
import VerifyFormUI from "./VerifyFormUI"

export enum LoginStep {
  Login = "login",
  Verify = "verify",
  NewPassword = "newPassword",
}

const LoginUI = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [tempUser, setTempUser] = useState<CognitoUser | null>(null)
  const [step, setStep] = useState(LoginStep.Login)
  return (
    <Fragment>
      {step === LoginStep.Login && (
        <LoginFormUI
          setStep={setStep}
          onChangeEmail={setEmail}
          onChangePassword={setPassword}
          setTempUser={setTempUser}
        />
      )}
      {step === LoginStep.Verify && <VerifyFormUI email={email} password={password} />}
      {step === LoginStep.NewPassword && <NewPasswordFormUI tempUser={tempUser} />}
    </Fragment>
  )
}

export default LoginUI
