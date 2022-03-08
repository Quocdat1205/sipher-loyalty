import { useEffect, useState } from "react"
import { Box } from "@sipher.dev/sipher-ui"

import {
  ChangePassword,
  ConnectWalletFirstModal,
  CreateEmailModal,
  ForgotPassword,
  SignIn,
  SignUp,
  VerifyAccount,
} from "@components/module/modal"
import { ChakraModal } from "@components/shared"

interface ConnectWalletModalProps {
  isOpen: boolean
  onClose: () => void
}

export interface ChangeFormProps {
  changeForm: { form: string; status: string }
  setChangeForm: (changeForm: { form: string; status: string }) => void
}
interface initProps {
  form: string
  status: string
}

const initForm: initProps = { form: "SIGN_UP", status: "" }

export const ConnectWalletModal = ({ isOpen, onClose }: ConnectWalletModalProps) => {
  const [changeForm, setChangeForm] = useState(initForm)
  const [isComplete, setIsComplete] = useState(false)

  const completeText = isComplete
    ? changeForm.status === "FORGOT"
      ? "PASSWORD UPDATED"
      : changeForm.status === "SIGN_UP_WALLET"
      ? "ACCOUNT UPDATED"
      : ""
    : ""

  useEffect(() => {
    setChangeForm(initForm)
    setIsComplete(false)
  }, [isOpen])

  return (
    <ChakraModal
      closeOnOverlayClick={changeForm.form === "SIGN_IN" || changeForm.form === "SIGN_UP"}
      isHiddenClose={
        changeForm.status === "SIGN_UP" ||
        changeForm.status === "FORGOT" ||
        changeForm.status === "SIGN_UP_EMAIL" ||
        changeForm.status === "SIGN_UP_SOCIAL"
      }
      isCentered
      title={
        isComplete
          ? completeText
          : changeForm.form === "SIGN_IN"
          ? "SIGN IN"
          : changeForm.form === "SIGN_UP"
          ? "SIGN IN OR CREATE ACCOUNT"
          : changeForm.form === "FORGOT"
          ? "FORGOT PASSWORD"
          : changeForm.form === "VERIFY"
          ? "VERIFY YOUR ACCOUNT"
          : changeForm.form === "CHANGE_PASSWORD"
          ? "CHANGE YOUR PASSWORD"
          : changeForm.form === "CREATE_EMAIL"
          ? "YOU ARE ALMOST THERE"
          : changeForm.form === "WALLET_FIRST"
          ? "CONNECT TO A WALLET"
          : ""
      }
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
    >
      <Box>
        {changeForm.form === "SIGN_UP" ? (
          <SignUp changeForm={changeForm} setChangeForm={setChangeForm} />
        ) : changeForm.form === "SIGN_IN" ? (
          <SignIn changeForm={changeForm} setChangeForm={setChangeForm} onClose={onClose} />
        ) : changeForm.form === "FORGOT" ? (
          <ForgotPassword changeForm={changeForm} setChangeForm={setChangeForm} />
        ) : changeForm.form === "VERIFY" ? (
          <VerifyAccount
            isComplete={isComplete}
            setIsComplete={setIsComplete}
            setChangeForm={setChangeForm}
            changeForm={changeForm}
          />
        ) : changeForm.form === "CHANGE_PASSWORD" ? (
          <ChangePassword
            changeForm={changeForm}
            isComplete={isComplete}
            setIsComplete={setIsComplete}
            setChangeForm={setChangeForm}
          />
        ) : changeForm.form === "CREATE_EMAIL" ? (
          <CreateEmailModal changeForm={changeForm} setChangeForm={setChangeForm} />
        ) : changeForm.form === "WALLET_FIRST" ? (
          <ConnectWalletFirstModal onClose={onClose} />
        ) : (
          ""
        )}
      </Box>
    </ChakraModal>
  )
}
