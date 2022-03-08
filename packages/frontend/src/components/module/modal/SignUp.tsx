import React, { useState } from "react"
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs"
import { MdInfo } from "react-icons/md"
import {
  Box,
  Button,
  chakra,
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

import { ChangeFormProps, WalletCard } from "../top-navigation-bar/user-info"

import { usePasswordValidation } from "./usePasswordValidation"

type SignUpProps = ChangeFormProps

export const SignUp = ({ changeForm, setChangeForm }: SignUpProps) => {
  const [show, setShow] = useState(false)
  const [password, setPassword] = useState("")

  const validationPassword = usePasswordValidation({
    firstPassword: password,
  })

  const handleClick = () => setShow(!show)

  const handleChange = e => {
    setPassword(e.target.value)
  }

  const signIn = () => {
    setChangeForm({ status: "SIGN_UP_EMAIL", form: "VERIFY" })
  }

  const handleChangeForm = () => {
    setChangeForm({ ...changeForm, form: "SIGN_IN" })
  }

  const handleStrengthText = () => {
    if (validationPassword.filter(i => i === true).length > 3) return { text: "Excellent", color: "cyan.400" }
    if (validationPassword.filter(i => i === true).length > 2) return { text: "Good", color: "teal.400" }
    if (validationPassword.filter(i => i === true).length > 1) return { text: "Fair", color: "orange.400" }
    if (validationPassword.filter(i => i === true).length > 0) return { text: "Poor", color: "red.400" }
    return { text: "Password Strength", color: "neutral.500" }
  }

  return (
    <Stack px={6} spacing={6} w="full">
      <Text color="neutral.300">
        Please link crypto-wallet in order to sign in. No funds are neccessary or will be withdrawn.
      </Text>
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
            <Text color={handleStrengthText().color} fontSize="xs">
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
      <Flex pb={2} align="center">
        <Box flex={1}>
          <Text pb={2} color="neutral.400" fontSize="sm">
            Social Account
          </Text>
          <HStack spacing={4}>
            <WalletCard
              bg="#1677EF"
              src="/icons/facebook.svg"
              onClick={() => {
                setChangeForm({ status: "SIGN_UP_SOCIAL", form: "WALLET_FIRST" })
              }}
            />
            <WalletCard
              bg="#EA4336"
              src="/icons/google.svg"
              onClick={() => {
                setChangeForm({ status: "SIGN_UP_SOCIAL", form: "WALLET_FIRST" })
              }}
            />
          </HStack>
        </Box>
        <Box pos="relative" mx={4}>
          <Box pos="absolute" transform="translateY(-20%)" h="3rem" w="1px" bg="neutral.500" />
        </Box>
        <Box flex={1}>
          <Flex pb={2} align="center">
            <Text mr={2} color="neutral.400" fontSize="sm">
              Crypto-Wallet
            </Text>
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
          </Flex>
          <HStack spacing={4}>
            <WalletCard
              bg="white"
              src="/icons/wallets/metamask.svg"
              onClick={() => {
                setChangeForm({ status: "SIGN_UP_WALLET", form: "CREATE_EMAIL" })
              }}
            />
            <WalletCard
              bg="white"
              src="/icons/wallets/walletconnect.svg"
              onClick={() => {
                setChangeForm({ status: "SIGN_UP_WALLET", form: "CREATE_EMAIL" })
              }}
            />
          </HStack>
        </Box>
      </Flex>
      <Button onClick={signIn} fontSize="md" py={6} fontWeight={600}>
        SIGN UP
      </Button>
      <Text color="neutral.400" textAlign="center">
        Already have an account?{" "}
        <chakra.span textDecor="underline" cursor="pointer" color="cyan.600" onClick={handleChangeForm}>
          Sign In
        </chakra.span>
      </Text>
    </Stack>
  )
}
