import React, { useState } from "react"
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs"
import { MdInfo } from "react-icons/md"
import {
  Box,
  Button,
  chakra,
  Divider,
  Flex,
  HStack,
  IconButton,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
} from "@sipher.dev/sipher-ui"

import { CustomInput } from "@components/module/modal"
import { CustomPopover, Form, FormControl, FormField } from "@components/shared"

import { ChangeFormProps } from "../top-navigation-bar/user-info"

import { usePasswordValidation } from "./usePasswordValidation"

type CreateEmailModalProps = ChangeFormProps

export const CreateEmailModal = ({ changeForm, setChangeForm }: CreateEmailModalProps) => {
  const [show, setShow] = useState(false)
  const [password, setPassword] = useState("")

  const validationPassword = usePasswordValidation({
    firstPassword: password,
  })

  const handleClick = () => setShow(!show)

  const handleChange = e => {
    setPassword(e.target.value)
  }

  const handleChangeForm = () => {
    setChangeForm({ ...changeForm, form: "VERIFY" })
  }

  const handleStrengthText = () => {
    if (validationPassword.filter(i => i === true).length > 3) return { text: "Excellent", color: "cyan.400" }
    if (validationPassword.filter(i => i === true).length > 2) return { text: "Good", color: "teal.400" }
    if (validationPassword.filter(i => i === true).length > 1) return { text: "Fair", color: "orange.400" }
    if (validationPassword.filter(i => i === true).length > 0) return { text: "Poor", color: "red.400" }
    return { text: "Password Strength", color: "neutral.500" }
  }

  return (
    <Stack pos="relative" px={6} spacing={6} w="full">
      <Flex display="inline-block" align="center">
        <Text mr={2} color="neutral.400" fontSize="sm">
          You will need to fill in your email and password to enable{" "}
          <chakra.span sx={{ ">div": { display: "inline-block" } }} textDecor="underline" color="cyan.600">
            Ather Account{" "}
            <CustomPopover
              placement="top"
              label="Crypto-wallet"
              icon={
                <Box color="neutral.500">
                  <MdInfo size="1.2rem" />
                </Box>
              }
            >
              <Text fontSize="sm" color="neutral.900">
                Wallets are used to send, receive, and store digital assets like Ether. Wallets come in many forms. For
                more infomation about wallets, see this{" "}
                <chakra.span color="cyan.500" textDecor="underline">
                  explanation
                </chakra.span>
              </Text>
            </CustomPopover>
          </chakra.span>
        </Text>
      </Flex>
      <Form>
        <FormControl as="fieldset">
          <FormField>
            <CustomInput placeholder="Email address" />
          </FormField>
        </FormControl>
        <FormControl mb={2} as="fieldset">
          <FormField>
            <InputGroup size="md">
              <CustomInput
                onChange={handleChange}
                pr="2.5rem"
                type={show ? "text" : "password"}
                placeholder="Password"
              />
              <InputRightElement width="2.5rem">
                <IconButton
                  variant="ghost"
                  aria-label="eye-icon"
                  color="neutral.400"
                  _hover={{ bg: "neutral.500" }}
                  _active={{ bg: "neutral.500" }}
                  icon={show ? <BsEyeSlashFill size="1rem" /> : <BsEyeFill size="1rem" />}
                  size="sm"
                  h="1.75rem"
                  onClick={handleClick}
                />
              </InputRightElement>
            </InputGroup>
          </FormField>
          <Flex align="center" justify="space-between">
            <Text color={handleStrengthText().color} fontWeight={600} fontSize="xs">
              {handleStrengthText().text}
            </Text>
            <HStack spacing={1}>
              <Box
                bg={validationPassword.filter(i => i === true).length > 0 ? "red.400" : "neutral.600"}
                w="48px"
                h="3px"
              />
              <Box
                bg={validationPassword.filter(i => i === true).length > 1 ? "orange.400" : "neutral.600"}
                w="48px"
                h="3px"
              />
              <Box
                bg={validationPassword.filter(i => i === true).length > 2 ? "teal.400" : "neutral.600"}
                w="48px"
                h="3px"
              />
              <Box
                bg={validationPassword.filter(i => i === true).length > 3 ? "cyan.400" : "neutral.600"}
                w="48px"
                h="3px"
              />
            </HStack>
          </Flex>
        </FormControl>
      </Form>
      <Box pb={2}>
        <Divider pos="absolute" left="0" w="full" borderColor="whiteAlpha.100" />
      </Box>
      <Button onClick={handleChangeForm} fontSize="md" py={6} fontWeight={600}>
        CONTINUE
      </Button>
    </Stack>
  )
}
