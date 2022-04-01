import { Fragment, useState } from "react"

import ForgotPasswordFormUI from "./ForgotPasswordFormUI"
import VerifyUI from "./VerifyUI"

export enum ForgotPasswordStep {
  FillEmail = "fillEmail",
  Verify = "verify",
}

const ForgotPasswordUI = () => {
  const [step, setStep] = useState(ForgotPasswordStep.FillEmail)
  const [email, setEmail] = useState("")

  return (
    <Fragment>
      {step === ForgotPasswordStep.FillEmail && <ForgotPasswordFormUI onChangeEmail={setEmail} setStep={setStep} />}
      {step === ForgotPasswordStep.Verify && <VerifyUI email={email} />}
    </Fragment>
  )
}

export default ForgotPasswordUI
