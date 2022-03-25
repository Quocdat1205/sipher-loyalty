import React from "react"
import { useForm } from "react-hook-form"
import { BiChevronRight } from "react-icons/bi"
import { MdImage } from "react-icons/md"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { Avatar, Box, Button, Divider, Flex, FormControl, FormLabel, HStack, Text } from "@sipher.dev/sipher-ui"

import { CustomInput, CustomTextarea, Form, FormField } from "@components/shared"

interface SettingAccountModalProps {
  onClose: () => void
  setChangeForm: (v: string) => void
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  bio: Yup.string().optional(),
})

export const SettingModal = ({ onClose, setChangeForm }: SettingAccountModalProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) })

  return (
    <Box px={6}>
      <Flex mb={8} align="center">
        <Avatar bg="gray" size="2xl" />
        <Box ml={8}>
          <Text mb={4}>Change your Profile picture</Text>
          <Button
            role="group"
            size="md"
            color="neutral.50"
            border="none"
            bg="neutral.600"
            onClick={() => setChangeForm("AVATAR")}
          >
            <Box _groupHover={{ color: "neutral.900" }} color="neutral.400">
              <MdImage size="1.2rem" />
            </Box>
            <Text ml={2} _groupHover={{ color: "neutral.900" }}>
              Upload Image
            </Text>
          </Button>
        </Box>
      </Flex>
      <FormControl>
        <FormLabel mb={1} fontSize="sm" color="neutral.400">
          Name
        </FormLabel>
        <FormField error={"asf"}>
          <CustomInput maxLength={20} />
        </FormField>
      </FormControl>
      <FormControl>
        <FormLabel mb={1} fontSize="sm" color="neutral.400">
          Bio
        </FormLabel>
        <CustomTextarea maxLength={255} h="6rem" />
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
      <HStack pt={6} pb={2} justify="center">
        <Button bg="accent.600" size="md">
          Save
        </Button>
        <Button border="1px" borderColor="neutral.600" size="md" color="neutral.50" bg="transparent" onClick={onClose}>
          Cancel
        </Button>
      </HStack>
    </Box>
  )
}
