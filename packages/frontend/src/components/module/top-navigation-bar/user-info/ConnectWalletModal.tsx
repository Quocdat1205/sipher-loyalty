import { useEffect, useState } from "react"
import { Box } from "@sipher.dev/sipher-ui"

import { ChakraModal } from "@components/shared"

import { ChangePassword } from "./ChangePassword"
import { ForgotPassword, SignIn, SignUp, VerifyAccount } from "."

interface ConnectWalletModalProps {
  isOpen: boolean
  onClose: () => void
}

export const ConnectWalletModal = ({ isOpen, onClose }: ConnectWalletModalProps) => {
  const [changeForm, setChangeForm] = useState("SIGN_UP")
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    setChangeForm("SIGN_UP")
    setIsComplete(false)
  }, [isOpen])

  return (
    <ChakraModal
      closeOnOverlayClick={changeForm === "SIGN_IN" || changeForm === "SIGN_UP"}
      isCentered
      title={
        isComplete
          ? "PASSWORD UPDATED"
          : changeForm === "SIGN_IN"
          ? "SIGN IN"
          : changeForm === "SIGN_UP"
          ? "SIGN IN OR CREATE ACCOUNT"
          : changeForm === "FORGOT"
          ? "FORGOT PASSWORD"
          : changeForm === "VERIFY"
          ? "VERIFY YOUR ACCOUNT"
          : changeForm === "CHANGE_PASSWORD"
          ? "CHANGE YOUR PASSWORD"
          : ""
      }
      isOpen={isOpen}
      onClose={onClose}
      size="md"
    >
      <Box pb={4}>
        {changeForm === "SIGN_UP" ? (
          <SignUp setChangeForm={setChangeForm} onClose={onClose} />
        ) : changeForm === "SIGN_IN" ? (
          <SignIn setChangeForm={setChangeForm} onClose={onClose} />
        ) : changeForm === "FORGOT" ? (
          <ForgotPassword setChangeForm={setChangeForm} />
        ) : changeForm === "VERIFY" ? (
          <VerifyAccount setChangeForm={setChangeForm} />
        ) : changeForm === "CHANGE_PASSWORD" ? (
          <ChangePassword isComplete={isComplete} setIsComplete={setIsComplete} setChangeForm={setChangeForm} />
        ) : (
          ""
        )}
      </Box>
    </ChakraModal>
  )
}
