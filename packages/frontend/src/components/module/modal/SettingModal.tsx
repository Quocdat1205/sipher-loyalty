import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { BiChevronRight } from "react-icons/bi"
import { MdImage } from "react-icons/md"
import { useMutation, useQuery, useQueryClient } from "react-query"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { Avatar, Box, Button, Divider, Flex, FormControl, FormLabel, HStack, Image, Text } from "@sipher.dev/sipher-ui"

import { getAvailableAvatars, getProfile, ProfileInput, updateProfile } from "@api"
import { CustomInput, CustomTextarea, Form, FormField } from "@components/shared"
import { useChakraToast } from "@hooks"
import { useAuth } from "src/providers/auth"

interface SettingAccountModalProps {
  onClose: () => void
  setChangeForm: (v: string) => void
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  bio: Yup.string().optional(),
})

export const SettingModal = ({ onClose, setChangeForm }: SettingAccountModalProps) => {
  const [name, setName] = useState("")
  const [bio, setBio] = useState("")

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm({ resolver: yupResolver(validationSchema) })

  const { session, user } = useAuth()
  const qc = useQueryClient()
  const toast = useChakraToast()

  const { data: userProfile } = useQuery(
    ["profile", user?.email],
    () => getProfile(session?.getIdToken().getJwtToken() ?? ""),
    {
      onSuccess: data => {
        setValue("name", data.user.name)
        setValue("bio", data.user.bio)
      },
    },
  )
  const { data: availableAvatars } = useQuery(["available-avatars", user?.email], () =>
    getAvailableAvatars(session?.getIdToken().getJwtToken() ?? ""),
  )

  const { mutate: mutateUpdateProfile } = useMutation<unknown, unknown, Partial<ProfileInput>>(
    input => updateProfile(input, session?.getIdToken().getJwtToken() ?? ""),
    {
      onSuccess: () => {
        qc.invalidateQueries(["profile", user?.email])
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
    <Box px={6}>
      <Flex mb={8} align="center">
        <Avatar bg="gray" size="2xl" src={userProfile?.user.avatarImage} name={userProfile?.user.name} />
        <Box ml={8}>
          <Text mb={4}>Change your Profile picture</Text>
          <Button
            role="group"
            size="md"
            color="neutral.50"
            border="none"
            bg="neutral.600"
            onClick={() => setChangeForm("AVATAR")}
            px={2}
          >
            <Box _groupHover={{ color: "neutral.900" }} color="neutral.400" overflow={"hidden"}>
              <Image src="/images/nft/sipher5.png" h="1.3rem" />
            </Box>
            <Text ml={2} _groupHover={{ color: "neutral.900" }}>
              Choose NFT
            </Text>
          </Button>
        </Box>
      </Flex>
      <FormControl mb={4}>
        <FormLabel mb={1} fontSize="sm" color="neutral.400">
          Name
        </FormLabel>
        <FormField error={errors?.name?.message}>
          <CustomInput maxLength={20} {...register("name", { onChange: e => setName(e.target.value) })} />
        </FormField>
      </FormControl>
      <FormControl>
        <FormLabel mb={1} fontSize="sm" color="neutral.400">
          Bio
        </FormLabel>
        <CustomInput maxLength={255} h="6rem" {...register("bio", { onChange: e => setBio(e.target.value) })} />
      </FormControl>

      <Divider pt={6} orientation="horizontal" />
      <Flex
        onClick={() => setChangeForm("PASSWORD")}
        py={6}
        role="group"
        cursor="pointer"
        justify="space-between"
        align="center"
      >
        <Box>
          <Text _groupHover={{ color: "accent.500" }} mb={1}>
            Change Password
          </Text>
          <Text _groupHover={{ color: "accent.500" }} maxW="18rem" fontSize="xs" color="neutral.300">
            It’s good idea to use a strong password that you’re not using elsewhere
          </Text>
        </Box>
        <Box _groupHover={{ color: "accent.500" }} color="neutral.300">
          <BiChevronRight size="1.6rem" />
        </Box>
      </Flex>
      <Divider pt={4} orientation="horizontal" />
      <HStack pt={6} justify="center">
        <Button
          colorScheme="accent"
          fontSize={"md"}
          py={6}
          size="md"
          onClick={handleSubmit(data => {
            console.log(data)
            mutateUpdateProfile({ name: data.name, bio: data.bio })
          })}
          w="6rem"
          isDisabled={name === userProfile?.user.name && bio === userProfile?.user.bio}
        >
          Save
        </Button>
        <Button
          border="1px"
          borderColor="neutral.600"
          size="md"
          color="neutral.50"
          bg="transparent"
          onClick={onClose}
          w="6rem"
          py={6}
          fontSize="md"
        >
          Cancel
        </Button>
      </HStack>
    </Box>
  )
}
