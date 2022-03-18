import React, { useState } from "react"

import { ChakraModal } from "@components/shared"

import { SettingModal } from "./SettingModal"
import { ChooseAvatarModal } from "."

interface SettingAccountModalProps {
  isOpen: boolean
  onClose: () => void
}

export const AccountModal = ({ isOpen, onClose }: SettingAccountModalProps) => {
  const [changeForm, setChangeForm] = useState("SETTING")
  const [choose, setChoose] = useState("")
  return (
    <ChakraModal isCentered title={"ACCOUNT SETTINGS"} isOpen={isOpen} onClose={onClose} size="xl">
      {changeForm === "SETTING" ? (
        <SettingModal setChangeForm={setChangeForm} choose={choose} onClose={onClose} />
      ) : changeForm === "AVATAR" ? (
        <ChooseAvatarModal setChangeForm={setChangeForm} setChoose={setChoose} />
      ) : (
        ""
      )}
    </ChakraModal>
  )
}
