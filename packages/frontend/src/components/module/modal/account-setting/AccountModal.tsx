import React, { Fragment, useEffect, useState } from "react"

import { useAuth } from "src/providers/auth"

import ChangePasswordModal from "./ChangePasswordModal"
import ChooseAvatarForm from "./ChooseAvatarForm"
import SettingForm from "./SettingForm"

interface SettingAccountModalProps {
  isOpen: boolean
  onClose: () => void
}

export const AccountModal = ({ isOpen, onClose }: SettingAccountModalProps) => {
  const [isChoosingAvatar, setIsChoosingAvatar] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)

  const [tempAvatar, setTempAvatar] = useState<Record<"id" | "imageUrl", string> | null>(null)

  useEffect(() => {
    if (isOpen) {
      setTempAvatar(null)
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) {
      setIsChoosingAvatar(false)
      setIsChangingPassword(false)
    }
  }, [isOpen])

  return (
    <Fragment>
      <SettingForm
        isOpen={isOpen && !isChoosingAvatar && !isChangingPassword}
        onClose={onClose}
        onSetAvatar={() => setIsChoosingAvatar(true)}
        onChangePassword={() => setIsChangingPassword(true)}
        tempAvatar={tempAvatar}
      />
      <ChooseAvatarForm
        isOpen={isChoosingAvatar}
        onClose={onClose}
        onBack={() => setIsChoosingAvatar(false)}
        onChangeAvatar={setTempAvatar}
      />
      <ChangePasswordModal isOpen={isChangingPassword} onClose={onClose} onBack={() => setIsChangingPassword(false)} />
    </Fragment>
  )
}
