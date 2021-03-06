import React, { useEffect } from "react"
import { BiChevronRight } from "react-icons/bi"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { Avatar, Box, Button, Divider, Flex, HStack, Text } from "@sipher.dev/sipher-ui"

import { getProfile, updateProfile } from "@api"
import { ChakraModal, StyledInput, StyledTextArea } from "@components/shared"
import { useChakraToast, useFormCoreWithError } from "@hooks"
import { useAuth } from "src/providers/auth"

interface SettingAccountModalProps {
  isOpen: boolean
  onClose: () => void
  onSetAvatar: () => void
  onChangePassword: () => void
  tempAvatar: Record<"id" | "imageUrl", string> | null
}

const SettingForm = ({ isOpen, onClose, onSetAvatar, onChangePassword, tempAvatar }: SettingAccountModalProps) => {
  const { values, setValue, errors, initForm } = useFormCoreWithError({ name: "", bio: "" })

  const { user, bearerToken } = useAuth()
  const qc = useQueryClient()
  const toast = useChakraToast()

  const { data: userProfile, refetch } = useQuery("profile", () => getProfile(bearerToken), {
    enabled: false,
    onSuccess: data => initForm({ name: data.user.name, bio: data.user.bio }),
  })

  useEffect(() => {
    if (!!bearerToken && isOpen) {
      refetch()
    }
  }, [bearerToken])

  const { mutate: mutateUpdateProfile, isLoading } = useMutation(
    () =>
      updateProfile(
        { name: values.name, bio: values.bio, avatarImageId: tempAvatar ? tempAvatar.id : undefined },
        bearerToken,
      ),
    {
      onSuccess: () => {
        qc.invalidateQueries("profile")
        toast({
          status: "success",
          title: "Update profile successfully",
        })
        onClose()
      },
      onError: (e: any) => {
        toast({
          status: "error",
          title: "Failed to update profile!",
          message: e?.message || "Please check your internet connection and try again!",
        })
      },
    },
  )

  return (
    <ChakraModal title={"ACCOUNT SETTING"} isOpen={isOpen} onClose={onClose} size="xl">
      <Box px={6}>
        <Flex mb={8} align="center">
          <Box rounded="full" pos="relative" overflow="hidden">
            <Avatar
              bg="gray"
              size="2xl"
              src={tempAvatar?.imageUrl || userProfile?.user.avatarImage}
              name={userProfile?.user.name}
              bgGradient="linear(to-l, #FCD11F, #DF6767, #200B9F)"
            />
          </Box>
          <Box ml={8}>
            <Text mb={4}>Change your Profile picture</Text>
            <Button size="md" border="none" onClick={onSetAvatar} px={4} colorScheme="neutral" color="neutral.50">
              CHOOSE AVATAR
            </Button>
          </Box>
        </Flex>
        <HStack spacing={4} align="flex-start" mb={4}>
          <Box flex={1}>
            <StyledInput label="Email" defaultValue={user?.email} isReadOnly={true} flex={1} />
          </Box>
          <Box flex={1}>
            <StyledInput
              label="Name"
              value={values.name}
              onChange={e => setValue("name", e.target.value)}
              error={errors.name}
              flex={1}
            />
          </Box>
        </HStack>
        <StyledTextArea
          label="Bio"
          maxLength={255}
          h="6rem"
          value={values.bio}
          resize="none"
          onChange={e => setValue("bio", e.target.value)}
        />

        <Divider mt={4} orientation="horizontal" />
        <Flex py={4} cursor="pointer" justify="space-between" align="center" onClick={onChangePassword}>
          <Box>
            <Text mb={1}>Change Password</Text>
            <Text maxW="18rem" fontSize="sm" color="neutral.300">
              {`It???s good idea to use a strong password that you???re not using elsewhere`}
            </Text>
          </Box>
          <Box color="neutral.300">
            <BiChevronRight size="1.6rem" />
          </Box>
        </Flex>
        <Divider orientation="horizontal" />
        <HStack pt={6} justify="center" spacing={4}>
          <Button
            colorScheme="accent"
            fontSize={"md"}
            py={6}
            size="md"
            onClick={() => mutateUpdateProfile()}
            w="6rem"
            isDisabled={
              values.name === userProfile?.user.name &&
              values.bio === userProfile?.user.bio &&
              tempAvatar?.imageUrl === userProfile.user.avatarImage
            }
            isLoading={isLoading}
          >
            SAVE
          </Button>
          <Button
            border="1px"
            borderColor="neutral.600"
            size="md"
            onClick={onClose}
            w="6rem"
            py={6}
            fontSize="md"
            colorScheme={"neutral"}
            variant="secondary"
          >
            CANCEL
          </Button>
        </HStack>
      </Box>
    </ChakraModal>
  )
}

export default SettingForm
