import React, { useEffect, useState } from "react"

import { ChakraModal } from "@components/shared"

import { SettingModal } from "./SettingModal"
import { ChooseAvatarModal } from "."

interface SettingAccountModalProps {
  isOpen: boolean
  onClose: () => void
}

export const AccountModal = ({ isOpen, onClose }: SettingAccountModalProps) => {
  const [changeForm, setChangeForm] = useState("SETTING")

  useEffect(() => {
    setChangeForm("SETTING")
  }, [isOpen])

  return (
    <ChakraModal isCentered title={"ACCOUNT SETTINGS"} isOpen={isOpen} onClose={onClose} size="xl">
      {changeForm === "SETTING" ? (
        <SettingModal setChangeForm={setChangeForm} onClose={onClose} />
      ) : changeForm === "AVATAR" ? (
        <ChooseAvatarModal setChangeForm={setChangeForm} />
      ) : (
        ""
      )}
    </ChakraModal>
  )
}
