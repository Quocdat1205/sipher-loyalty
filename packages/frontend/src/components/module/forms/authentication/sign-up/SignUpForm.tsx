import React, { useEffect, useState } from "react"
import { FieldValues, useForm } from "react-hook-form"
import { useMutation } from "react-query"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import AtherIdAuth from "@sipher.dev/ather-id"
import { Box, Button, chakra, Flex, Link, Stack, Text } from "@sipher.dev/sipher-ui"
import { useStore } from "@store"
import { useWalletContext } from "@web3"

import {
  ChakraModal,
  CustomInput,
  Form,
  FormControl,
  FormField,
  SocialAccountSignIn,
  WalletSignIn,
} from "@components/shared"
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

interface SignUpFormProps {
  isOpen: boolean
  onClose: () => void
}

const SignUpForm = ({ isOpen, onClose }: SignUpFormProps) => {
  const toast = useChakraToast()
  const [email, setEmail] = useState("")
  const [showVerify, setShowVerify] = useState(false)
  const [showEmailForm, setShowEmailForm] = useState(false)
  const [connectingMethod, setConnectingMethod] = useState<string | null>(null)
  const setAuthFlow = useStore(s => s.setAuthFlow)

  useEffect(() => {
    if (isOpen) {
      setConnectingMethod(null)
      setShowVerify(false)
      setShowEmailForm(false)
    }
  }, [isOpen])

  useEffect(() => {
    if (showVerify || showEmailForm) setAuthFlow(null)
  }, [showVerify, showEmailForm])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) })

  const { mutate, isLoading } = useMutation<unknown, unknown, FieldValues>(
    data => AtherIdAuth.signUp(data.email, data.password),
    {
      onSuccess: () => setShowVerify(true),
      onError: (e: any) => {
        toast({
          status: "error",
          title: "Something went wrong!",
          message: e.message || "Please try again later.",
        })
      },
    },
  )

  const wallet = useWalletContext()

  const handleConnectWallet = async (connectorId: Parameters<typeof wallet["connect"]>["0"]) => {
    setConnectingMethod(connectorId!)
    const account = await wallet.connect(connectorId)

    if (account) {
      try {
        const user = await AtherIdAuth.signIn(account)
        console.log(account, user)
        if (user)
          toast({
            status: "error",
            title: "Address is already registered!",
            message: "Please sign in to continue.",
          })
        else setShowEmailForm(true)
      } catch (e) {
        setShowEmailForm(true)
      }
    }
    setConnectingMethod(null)
  }

  // show verify form after user has signed up
  if (showVerify) return <VerifySignUpForm email={email} />

  // show email filling form after user connect wallet first
  if (showEmailForm) return <FillEmailForm />

  return (
    <ChakraModal title={"SIGN IN OR CREATE ACCOUNT"} size="lg" isOpen={isOpen} onClose={onClose}>
      <Form onSubmit={handleSubmit(d => mutate(d))}>
        <Stack px={6} spacing={4} w="full">
          <Text fontSize="sm" color="neutral.300">
            Please link crypto-wallet in order to sign in. This will only be used to link to your account. Funds will
            not be withdrawn and no minimum balance required.
          </Text>
          <FormControl>
            <FormField error={errors?.email?.message}>
              <CustomInput
                placeholder="Email address"
                {...register("email", { onChange: e => setEmail(e.target.value) })}
              />
            </FormField>
          </FormControl>
          <FormControl>
            <FormField error={errors?.password?.message}>
              <CustomInput
                pr="2.5rem"
                type={"password"}
                placeholder="Password"
                autoComplete="new-password"
                {...register("password")}
              />
            </FormField>
          </FormControl>
          <FormControl>
            <FormField error={errors?.confirmPassword?.message}>
              <CustomInput
                pr="2.5rem"
                type={"password"}
                placeholder="Password"
                autoComplete="new-password"
                {...register("confirmPassword")}
              />
            </FormField>
          </FormControl>
          <Text fontSize="sm" color="neutral.400">
            I have read and agree to the{" "}
            <Link textDecor="underline" color="cyan.600" isExternal>
              Ather Labs Privacy Policy
            </Link>
          </Text>
          <Button w="full" type="submit" fontSize="md" py={6} fontWeight={600} isLoading={isLoading}>
            SIGN UP
          </Button>
          <Flex align="center">
            <Text fontWeight={600} mr={4}>
              or Sign up with
            </Text>
            <Box bg="neutral.600" h="1px" flex={1} />
          </Flex>
          <SocialAccountSignIn />
          <WalletSignIn
            onMetamaskConnect={() => handleConnectWallet("injected")}
            onWalletConnectConnect={() => handleConnectWallet("walletConnect")}
            connectingMethod={connectingMethod}
          />
          <Text color="neutral.400" textAlign="center">
            Already have an account?{" "}
            <chakra.span textDecor="underline" cursor="pointer" color="cyan.600" onClick={() => setAuthFlow("SIGN_IN")}>
              Sign In
            </chakra.span>
          </Text>
        </Stack>
      </Form>
    </ChakraModal>
  )
}

export default SignUpForm
