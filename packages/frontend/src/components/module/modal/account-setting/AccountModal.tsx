import React, { Fragment, useEffect, useState } from "react"
import { useMutation, useQueryClient } from "react-query"

import { updateProfile } from "@api"
import { useChakraToast } from "@hooks"
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

  useEffect(() => {
    if (!isOpen) {
      setIsChoosingAvatar(false)
      setIsChangingPassword(false)
    }
  }, [isOpen])

  const { bearerToken } = useAuth()
  const qc = useQueryClient()
  const toast = useChakraToast()

  const { mutate: mutateUpdateAvatar } = useMutation<unknown, unknown, string>(
    avatarImageId => updateProfile({ avatarImageId }, bearerToken),
    {
      onMutate: () => {
        setIsChoosingAvatar(false)
      },
      onSuccess: () => {
        qc.invalidateQueries("profile")
      },
      onError: (e: any) => {
        toast({
          status: "error",
          title: "Failed to update avatar!",
          message: e?.message || "Please check your internet connection and try again!",
        })
      },
    },
  )

  return (
    <Fragment>
      <SettingForm
        isOpen={isOpen && !isChoosingAvatar && !isChangingPassword}
        onClose={onClose}
        onSetAvatar={() => setIsChoosingAvatar(true)}
        onChangePassword={() => setIsChangingPassword(true)}
      />
      <ChooseAvatarForm
        isOpen={isChoosingAvatar}
        onClose={onClose}
        onBack={() => setIsChoosingAvatar(false)}
        onChangeAvatar={mutateUpdateAvatar}
      />
      <ChangePasswordModal isOpen={isChangingPassword} onClose={onClose} onBack={() => setIsChangingPassword(false)} />
    </Fragment>
  )
}
