import React from "react"
import { BiChevronRight } from "react-icons/bi"
import { MdImage } from "react-icons/md"
import { Avatar, Box, Button, Divider, Flex, FormControl, FormLabel, HStack, Text } from "@sipher.dev/sipher-ui"

import { CustomInput } from "."

interface SettingAccountModalProps {
  onClose: () => void
  setChangeForm: (v: string) => void
}

export const SettingModal = ({ onClose, setChangeForm }: SettingAccountModalProps) => {
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
      <Flex align="flex-start" mb="6">
        <FormControl as="fieldset">
          <Box bg="neutral.600" rounded="base" p={2} mb={1}>
            <FormLabel mb={0} fontSize="xs" color="neutral.400" fontWeight={400}>
              Username
            </FormLabel>
            <CustomInput
              maxLength={20}
              p={0}
              _hover={{ bg: "transparent" }}
              _focus={{ bg: "transparent" }}
              bg="transparent"
            />
          </Box>
          <Text color="neutral.500" fontSize="xs" textAlign="right">
            0/20
          </Text>
        </FormControl>
        <FormControl ml={8} bg="neutral.600" rounded="base" p={2} as="fieldset">
          <FormLabel mb={0} fontSize="xs" color="neutral.400" fontWeight={400}>
            Email address
          </FormLabel>
          <CustomInput p={0} _hover={{ bg: "transparent" }} _focus={{ bg: "transparent" }} bg="transparent" />
        </FormControl>
      </Flex>
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
