import React, { useState } from "react"
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs"
import {
  Box,
  Button,
  chakra,
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
import { Form, FormControl, FormField } from "@components/shared"

import { WalletCard } from "."

interface SignInProps {
  onClose: () => void
  setChangeForm: (changeForm: string) => void
}

export const SignIn = ({ setChangeForm, onClose }: SignInProps) => {
  const { connect } = useWalletContext()
  const [show, setShow] = useState(false)

  const handleClick = () => setShow(!show)

  const handleChangeForm = name => {
    if (name === "signup") {
      setChangeForm("SIGN_UP")
    } else if (name === "forgot") {
      setChangeForm("FORGOT")
    }
  }

  return (
    <Stack spacing={4} w="full">
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
              <CustomInput pr="4.5rem" type={show ? "text" : "password"} placeholder="Enter password" />
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
        </FormControl>
      </Form>
      <Text cursor="pointer" color="cyan.600" onClick={() => handleChangeForm("forgot")}>
        Forgot password?
      </Text>
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
      <Button fontSize="md" py={6} fontWeight={600}>
        SIGN IN
      </Button>
      <Text color="neutral.400" pt={4} textAlign="center">
        Don't have an account?{" "}
        <chakra.span textDecor="underline" cursor="pointer" color="cyan.600" onClick={() => handleChangeForm("signup")}>
          Sign Up
        </chakra.span>
      </Text>
    </Stack>
  )
}
