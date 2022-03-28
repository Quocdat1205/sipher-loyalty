import React, { useEffect } from "react"
import { BiChevronRight } from "react-icons/bi"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { Avatar, Box, Button, Divider, Flex, FormControl, FormLabel, HStack, Image, Text } from "@sipher.dev/sipher-ui"

import { getProfile, updateProfile } from "@api"
import { ChakraModal, CustomInput, CustomTextarea, FormField } from "@components/shared"
import { useChakraToast, useFormCoreWithError } from "@hooks"
import { useAuth } from "src/providers/auth"

interface SettingAccountModalProps {
  isOpen: boolean
  onClose: () => void
  onSetAvatar: () => void
  onChangePassword: () => void
}

const SettingForm = ({ isOpen, onClose, onSetAvatar, onChangePassword }: SettingAccountModalProps) => {
  const { values, setValue, errors, initForm } = useFormCoreWithError({ name: "", bio: "" })

  const { user, bearerToken } = useAuth()
  const qc = useQueryClient()
  const toast = useChakraToast()

  const { data: userProfile, refetch } = useQuery(["profile", bearerToken], () => getProfile(bearerToken), {
    enabled: isOpen && !!bearerToken,
    onSuccess: data => initForm({ name: data.user.name, bio: data.user.bio }),
  })

  useEffect(() => {
    refetch()
  }, [])

  const { mutate: mutateUpdateProfile, isLoading } = useMutation(
    () => updateProfile({ name: values.name, bio: values.bio }, bearerToken),
    {
      onSuccess: () => {
        qc.invalidateQueries(["profile", bearerToken])
        toast({
          status: "success",
          title: "Update profile successfully",
        })
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
          <Avatar
            bg="gray"
            size="2xl"
            src={userProfile?.user.avatarImage}
            name={userProfile?.user.name}
            bgGradient="linear(to-l, #FCD11F, #DF6767, #200B9F)"
          />
          <Box ml={8}>
            <Text mb={4}>Change your Profile picture</Text>
            <Button
              role="group"
              size="md"
              color="neutral.50"
              border="none"
              bg="neutral.600"
              _hover={{ bg: "neutral.500" }}
              onClick={onSetAvatar}
              px={2}
            >
              <Image src="/images/nft/sipher5.png" h="1.3rem" />
              <Text ml={2}>Choose NFT</Text>
            </Button>
          </Box>
        </Flex>
        <FormControl mb={4}>
          <FormLabel mb={1} fontSize="sm" color="neutral.400">
            Email
          </FormLabel>
          <Text>{user?.email}</Text>
        </FormControl>
        <FormControl mb={4}>
          <FormLabel mb={1} fontSize="sm" color="neutral.400">
            Name
          </FormLabel>
          <FormField error={errors.name}>
            <CustomInput maxLength={20} value={values.name} onChange={e => setValue("name", e.target.value)} />
          </FormField>
        </FormControl>
        <FormControl>
          <FormLabel mb={1} fontSize="sm" color="neutral.400">
            Bio
          </FormLabel>
          <CustomTextarea maxLength={255} h="6rem" value={values.bio} onChange={e => setValue("bio", e.target.value)} />
        </FormControl>

        <Divider mt={4} orientation="horizontal" />
        <Flex py={4} role="group" cursor="pointer" justify="space-between" align="center" onClick={onChangePassword}>
          <Box>
            <Text _groupHover={{ color: "accent.500" }} mb={1}>
              Change Password
            </Text>
            <Text _groupHover={{ color: "accent.500" }} maxW="18rem" fontSize="sm" color="neutral.300">
              {`It’s good idea to use a strong password that you’re not using elsewhere`}
            </Text>
          </Box>
          <Box _groupHover={{ color: "accent.500" }} color="neutral.300">
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
            isDisabled={values.name === userProfile?.user.name && values.bio === userProfile?.user.bio}
            isLoading={isLoading}
          >
            Save
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
            Cancel
          </Button>
        </HStack>
      </Box>
    </ChakraModal>
  )
}

export default SettingForm
