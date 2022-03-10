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
  Link,
  Stack,
  Text,
} from "@sipher.dev/sipher-ui"
import { useWalletContext } from "@web3"

import { CustomInput } from "@components/module/modal"
import { CustomPopover, Form, FormControl, FormField } from "@components/shared"

import { ChangeFormProps, WalletCard } from "../top-navigation-bar/user-info"

interface SignInProps extends ChangeFormProps {
  onClose: () => void
}

export const SignIn = ({ changeForm, setChangeForm, onClose }: SignInProps) => {
  const { connect } = useWalletContext()
  const [show, setShow] = useState(false)

  const handleClick = () => setShow(!show)

  const handleChangeForm = name => {
    if (name === "signup") {
      setChangeForm({ ...changeForm, form: "SIGN_UP" })
    } else if (name === "forgot") {
      setChangeForm({ status: "FORGOT", form: "FORGOT" })
    }
  }

  return (
    <Stack px={6} spacing={6} w="full">
      <Form>
        <FormControl as="fieldset">
          <FormField>
            <CustomInput placeholder="Username or Email address" />
          </FormField>
        </FormControl>
        <FormControl mb={0} as="fieldset">
          <FormField>
            <InputGroup size="md">
              <CustomInput pr="2.5rem" type={show ? "text" : "password"} placeholder="Password" />
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
        </FormControl>
      </Form>
      <Text cursor="pointer" color="cyan.600" onClick={() => handleChangeForm("forgot")}>
        Forgot password?
      </Text>
      <Flex flexDir="column" pb={2}>
        <Box mb={4}>
          <Text pb={2} color="neutral.400" fontSize="sm">
            Social Account
          </Text>
          <HStack spacing={4}>
            <WalletCard
              bg="#1677EF"
              src="/images/icons/facebook.svg"
              onClick={() => {
                onClose()
              }}
            />
            <WalletCard
              bg="#EA4336"
              src="/images/icons/google.svg"
              onClick={() => {
                onClose()
              }}
            />
            <WalletCard
              bg="#4053E4"
              src="/images/icons/discord.svg"
              onClick={() => {
                onClose()
              }}
            />
            <WalletCard
              bg="#479BE9"
              src="/images/icons/twitter.svg"
              onClick={() => {
                onClose()
              }}
            />
          </HStack>
        </Box>
        <Box>
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
                <Link
                  isExternal
                  href="https://docs.ethhub.io/using-ethereum/wallets/intro-to-ethereum-wallets/"
                  color="cyan.500"
                  textDecor="underline"
                >
                  explanation
                </Link>
              </Text>
            </CustomPopover>
          </Flex>
          <HStack spacing={4}>
            <WalletCard
              text="Metamask"
              bg="white"
              src="/images/icons/wallets/metamask.svg"
              onClick={() => {
                connect("injected")
                onClose()
              }}
            />
            <WalletCard
              text="ConnectWallet"
              bg="white"
              src="/images/icons/wallets/walletconnect.svg"
              onClick={() => {
                connect("walletConnect")
              }}
            />
          </HStack>
        </Box>
      </Flex>
      <Button fontSize="md" py={6} fontWeight={600}>
        SIGN IN
      </Button>
      <Text color="neutral.400" textAlign="center">
        Don't have an account?{" "}
        <chakra.span textDecor="underline" cursor="pointer" color="cyan.600" onClick={() => handleChangeForm("signup")}>
          Sign Up
        </chakra.span>
      </Text>
    </Stack>
  )
}
