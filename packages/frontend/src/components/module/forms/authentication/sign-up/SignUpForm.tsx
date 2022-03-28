import React, { useEffect, useState } from "react"
import { FieldValues, useForm } from "react-hook-form"
import { useMutation } from "react-query"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import AtherIdAuth from "@sipher.dev/ather-id"
import { Box, Button, chakra, Flex, Link, Stack, Text } from "@sipher.dev/sipher-ui"
import { AuthType, SignInAction, SignUpAction } from "@store"

import { ChakraModal, CustomInput, Form, FormControl, FormField, WalletSignIn } from "@components/shared"
import { useChakraToast } from "@hooks"
import { shortenAddress } from "@utils"

import { useSignUpContext } from "./useSignUp"

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

  const [connectingMethod, setConnectingMethod] = useState<string | null>(null)
  // const setAuthFlow = useStore(s => s.setAuthFlow)
  const { flowState, setFlowState, wallet, setEmail, setPassword, setIsConnectWalletFirst } = useSignUpContext()

  useEffect(() => {
    if (flowState?.type === AuthType.SignUp && flowState.action === SignUpAction.SignUp) {
      setConnectingMethod(null)
    }
  }, [flowState])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(validationSchema) })

  useEffect(() => {
    if (flowState?.type === AuthType.SignUp && flowState?.action === SignUpAction.SignUp) reset()
  }, [flowState])

  const { mutate: mutateSignUp, isLoading } = useMutation<unknown, unknown, FieldValues>(
    data => AtherIdAuth.signUp(data.email, data.password),
    {
      // Go to verify page after sign up
      onSuccess: () => setFlowState({ type: AuthType.SignUp, action: SignUpAction.VerifySignUp }),
      onError: (e: any) => {
        toast({
          status: "error",
          title: "Something went wrong!",
          message: e.message || "Please try again later.",
        })
      },
    },
  )

  const handleConnectWallet = async (connectorId: Parameters<typeof wallet["connect"]>["0"]) => {
    // Try to connect wallet
    setIsConnectWalletFirst(true)
    setConnectingMethod(connectorId!)
    const account = await wallet.connect(connectorId)

    if (account) {
      try {
        // Check if this address is already registered, if so, throw error, else navigate to fill email page
        const user = await AtherIdAuth.signIn(account)
        if (user) {
          await AtherIdAuth.signOut()
          wallet.reset()
          toast({
            status: "error",
            title: "Address is already registered!",
            message: "Please sign in to continue.",
          })
        } else setFlowState({ type: AuthType.SignUp, action: SignUpAction.FillEmail })
      } catch (e: any) {
        setFlowState({ type: AuthType.SignUp, action: SignUpAction.FillEmail })
      }
    }
    setConnectingMethod(null)
  }

  return (
    <ChakraModal
      title={"SIGN IN OR CREATE ACCOUNT"}
      size="lg"
      isOpen={flowState?.type === AuthType.SignUp && flowState?.action === SignUpAction.SignUp}
      onClose={() => setFlowState(null)}
    >
      <Form onSubmit={handleSubmit(d => mutateSignUp(d))}>
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
                {...register("password", { onChange: e => setPassword(e.target.value) })}
              />
            </FormField>
          </FormControl>
          <FormControl>
            <FormField error={errors?.confirmPassword?.message}>
              <CustomInput
                pr="2.5rem"
                type={"password"}
                placeholder="Confirm your password"
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
          {/* <SocialAccountSignIn /> */}
          <WalletSignIn
            onMetamaskConnect={() => handleConnectWallet("injected")}
            onWalletConnectConnect={() => handleConnectWallet("walletConnect")}
            connectingMethod={connectingMethod}
            metamaskText={
              wallet.account && wallet.connector === "injected" ? shortenAddress(wallet.account) : undefined
            }
            walletConnectText={
              wallet.account && wallet.connector === "walletConnect" ? shortenAddress(wallet.account) : undefined
            }
          />
          <Text color="neutral.400" textAlign="center">
            Already have an account?{" "}
            <chakra.span
              textDecor="underline"
              cursor="pointer"
              color="cyan.600"
              onClick={() => setFlowState({ type: AuthType.SignIn, action: SignInAction.SignIn })}
            >
              Sign In
            </chakra.span>
          </Text>
        </Stack>
      </Form>
    </ChakraModal>
  )
}

export default SignUpForm
