import React, { useState } from "react"
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs"
import { MdInfo } from "react-icons/md"
import {
  Box,
  Button,
  chakra,
  Flex,
  FormLabel,
  HStack,
  IconButton,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
} from "@sipher.dev/sipher-ui"
import { useWalletContext } from "@web3"

import { CustomInput } from "@components/module/modal"
import { CustomPopover, Form, FormControl, FormField } from "@components/shared"

import { usePasswordValidation } from "./usePasswordValidation"
import { WalletCard } from "."

interface SignUpProps {
  onClose: () => void
  setChangeForm: (changeForm: string) => void
}

export const SignUp = ({ setChangeForm, onClose }: SignUpProps) => {
  const { connect } = useWalletContext()
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
    setChangeForm("SIGN_IN")
  }

  const handleStrengthText = () => {
    if (validationPassword.filter(i => i === true).length > 3) return { text: "Excellent", color: "cyan.400" }
    if (validationPassword.filter(i => i === true).length > 2) return { text: "Good", color: "teal.400" }
    if (validationPassword.filter(i => i === true).length > 1) return { text: "Fair", color: "orange.400" }
    if (validationPassword.filter(i => i === true).length > 0) return { text: "Poor", color: "red.400" }
    return { text: "Password Strength", color: "neutral.500" }
  }

  return (
    <Stack spacing={4} w="full">
      <Text color="neutral.300">
        Please link crypto-wallet in order to sign in. No funds are neccessary or will be withdrawn.
      </Text>
      <Form>
        <FormControl as="fieldset">
          <FormLabel fontWeight={400}>Email address</FormLabel>
          <FormField>
            <CustomInput />
          </FormField>
        </FormControl>
        <FormControl as="fieldset">
          <FormLabel fontWeight={400}>Password</FormLabel>
          <FormField>
            <InputGroup size="md">
              <CustomInput
                onChange={handleChange}
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Enter password"
              />
              <InputRightElement width="4.5rem">
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
      <HStack pb={4} spacing={4}>
        <WalletCard
          bg="#1677EF"
          src="/icons/facebook.svg"
          onClick={() => {
            onClose()
          }}
        />
        <WalletCard
          bg="#EA4336"
          src="/icons/google.svg"
          onClick={() => {
            onClose()
          }}
        />
        <Box h="41px" w="1px" bg="neutral.500" />
        <WalletCard
          bg="white"
          src="/icons/wallets/metamask.svg"
          onClick={() => {
            connect("injected")
            onClose()
          }}
        />
        <WalletCard
          bg="white"
          src="/icons/wallets/walletconnect.svg"
          onClick={() => {
            connect("walletConnect")
            onClose()
          }}
        />
      </HStack>
      <Flex pb={4} align="center" justify="flex-end">
        <Text mr={2} color="neutral.400" fontSize="sm">
          What's a crypto-wallet?
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
            Wallets are used to send, receive, and store digital assets like Ether. Wallets come in many forms. For more
            infomation about wallets, see this{" "}
            <chakra.span color="cyan.500" textDecor="underline">
              explanation
            </chakra.span>
          </Text>
        </CustomPopover>
      </Flex>
      <Button fontSize="md" py={6} fontWeight={600}>
        SIGN UP
      </Button>
      <Text color="neutral.400" pt={4} textAlign="center">
        Already have an account?{" "}
        <chakra.span textDecor="underline" cursor="pointer" color="cyan.600" onClick={handleChangeForm}>
          Sign In
        </chakra.span>
      </Text>
    </Stack>
  )
}
