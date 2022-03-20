import React, { useEffect, useState } from "react"
import { FieldValues, useForm } from "react-hook-form"
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs"
import { MdInfo } from "react-icons/md"
import { useMutation } from "react-query"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import AtherIdAuth from "@sipher.dev/ather-id"
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
import { WalletCard } from "@components/module/top-navigation-bar/user-info"
import { CustomPopover, Form, FormControl, FormField } from "@components/shared"
import { useChakraToast } from "@hooks"

import FillEmailForm from "./FillEmailForm"
import VerifySignUpForm from "./VerifySignUpForm"

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Must be a valid email address"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/,
      "Must contain at least 8 characters, one uppercase, one number and one special character",
    ),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
})

const SignUpForm = () => {
  const toast = useChakraToast()
  const [email, setEmail] = useState("")
  const [showVerify, setShowVerify] = useState(false)
  const [showEmailForm, setShowEmailForm] = useState(false)
  const [show, setShow] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) })

  const { mutate, isLoading } = useMutation<unknown, unknown, FieldValues>(
    data => AtherIdAuth.signUp(data.email, data.password),
    {
      onSuccess: () => setShowVerify(true),
      onError: (e: any) =>
        toast({
          status: "error",
          title: "Error",
          message: e.message || "Something went wrong!",
        }),
    },
  )

  const wallet = useWalletContext()

  useEffect(() => {
    if (wallet.account) setShowEmailForm(true)
  }, [wallet.account])

  // show verify form after user has signed up
  if (showVerify) return <VerifySignUpForm email={email} />

  // show email filling form after user connect wallet first
  if (showEmailForm) return <FillEmailForm />

  return (
    <Stack px={6} spacing={6} w="full">
      <Text color="neutral.300">
        Please link crypto-wallet in order to sign in. This will only be used to link to your account. Funds will not be
        withdrawn and no minimum balance required.
      </Text>
      <Form onSubmit={handleSubmit(d => mutate(d))}>
        <FormControl as="fieldset">
          <FormField error={errors.email}>
            <CustomInput
              placeholder="Email address"
              {...register("email", { onChange: e => setEmail(e.target.value) })}
            />
          </FormField>
        </FormControl>
        <FormControl mb={2} as="fieldset">
          <FormField error={errors.password}>
            <InputGroup size="md">
              <CustomInput
                pr="2.5rem"
                type={show ? "text" : "password"}
                placeholder="Password"
                {...register("password")}
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
                  onClick={() => setShow(!show)}
                />
              </InputRightElement>
            </InputGroup>
          </FormField>
        </FormControl>
        <FormControl mb={2} as="fieldset">
          <FormField error={errors.passwordConfirmation}>
            <InputGroup size="md">
              <CustomInput
                pr="2.5rem"
                type={show ? "text" : "password"}
                placeholder="Password"
                {...register("passwordConfirmation")}
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
                  onClick={() => setShow(!show)}
                />
              </InputRightElement>
            </InputGroup>
          </FormField>
        </FormControl>
        <Text color="neutral.400">
          I have read and agree to the{" "}
          <Link textDecor="underline" color="cyan.600" isExternal>
            Ather Labs Privacy Policy
          </Link>
        </Text>
        <Button type="submit" fontSize="md" py={6} fontWeight={600} isLoading={isLoading}>
          SIGN UP
        </Button>
      </Form>
      <Flex align="center">
        <Text fontWeight={600} mr={4}>
          or Sign up with
        </Text>
        <Box bg="neutral.600" h="1px" flex={1} />
      </Flex>
      <Flex flexDir="column" pb={2}>
        <Box mb={4}>
          <Text pb={2} color="neutral.400" fontSize="sm">
            Social Account
          </Text>
          <HStack spacing={4}>
            <WalletCard bg="#EA4336" src="/images/icons/google.svg" />
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
            <WalletCard text="Metamask" bg="white" src="/images/icons/wallets/metamask.svg" />
            <WalletCard text="ConnectWallet" bg="white" src="/images/icons/wallets/walletconnect.svg" />
          </HStack>
        </Box>
      </Flex>
      <Text color="neutral.400" textAlign="center">
        Already have an account?{" "}
        <chakra.span textDecor="underline" cursor="pointer" color="cyan.600">
          Sign In
        </chakra.span>
      </Text>
    </Stack>
  )
}

export default SignUpForm
