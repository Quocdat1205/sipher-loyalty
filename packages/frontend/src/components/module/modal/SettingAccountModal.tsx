import React, { useState } from "react"
import { Avatar, Box, Button, Divider, Flex, FormControl, FormLabel, HStack, Text } from "@sipher.dev/sipher-ui"

import { ChakraModal } from "@components/shared"

import { ChooseAvatarModal, CustomInput, CustomTextarea } from "."

interface SettingAccountModalProps {
  isOpen: boolean
  onClose: () => void
}

type FormValueType = {
  userName: string
  email: string
  bio: string
}

const initialValues: FormValueType = {
  userName: "",
  email: "",
  bio: "",
}

export const SettingAccountModal = ({ isOpen, onClose }: SettingAccountModalProps) => {
  const [open, setOpen] = useState(false)
  const [choose, setChoose] = useState("")

  return (
    <ChakraModal isCentered title={"ACCOUNT SETTINGS"} isOpen={isOpen} onClose={onClose} size="xl">
      <Box>
        <Flex mb={8} align="center">
          <Avatar bg="gray" size="2xl" src={choose} />
          <Box ml={8}>
            <Text mb={4}>Change your Profile picture</Text>
            <Button size="md" color="neutral.50" border="none" onClick={() => setOpen(true)} bg="neutral.600">
              <Flex align="center">
                <Avatar mr={2} borderRadius="base" src="/icons/avatar.png" size="xs" />
                Choose NFT
              </Flex>
            </Button>
          </Box>
          <ChooseAvatarModal choose={choose} setChoose={setChoose} isOpen={open} onClose={() => setOpen(false)} />
        </Flex>
        <Flex align="flex-start" mb="6">
          <FormControl as="fieldset">
            <FormLabel fontWeight={400}>Username</FormLabel>
            <CustomInput />
          </FormControl>
          <FormControl ml={8} as="fieldset">
            <FormLabel fontWeight={400}>Email address</FormLabel>
            <CustomInput />
          </FormControl>
        </Flex>
        <FormControl as="fieldset" mb="6">
          <FormLabel fontWeight={400}>Bio</FormLabel>
          <CustomTextarea />
        </FormControl>
      </Box>
      <Divider orientation="horizontal" />
      <HStack pt={6} pb={2} justify="center">
        <Button bg="accent.600" size="md">
          Save
        </Button>
        <Button border="1px" borderColor="neutral.600" size="md" color="neutral.50" bg="transparent" onClick={onClose}>
          Cancel
        </Button>
      </HStack>
    </ChakraModal>
  )
}
