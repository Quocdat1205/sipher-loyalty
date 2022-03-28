import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useMutation } from "react-query"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import AtherIdAuth, { CognitoUser } from "@sipher.dev/ather-id"
import { Box, Button, chakra, Flex, FormControl, Stack, Text } from "@sipher.dev/sipher-ui"
import { AuthType, ForgotPasswordAction, SignInAction, SignUpAction } from "@store"

import { ChakraModal, CustomInput, Form, FormField, WalletSignIn } from "@components/shared"
import { useChakraToast } from "@hooks"
import { useAuth } from "src/providers/auth"

import { useSignInContext } from "./useSignIn"

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Must be a valid email address"),
  password: Yup.string().required("Password is required"),
})

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(validationSchema) })

  const toast = useChakraToast()
  // const { setUser: setSigningInUser } = useSignInContext()
  const { setUser } = useAuth()

  const { wallet, flowState, setFlowState, setEmail } = useSignInContext()

  const [connectingMethod, setConnectingMethod] = useState<string | null>(null)

  useEffect(() => {
    if (flowState?.type === AuthType.SignIn && flowState?.action === SignInAction.SignIn) reset()
  }, [flowState])

  const handleWalletChallenge = async (cogitoUser: CognitoUser, message: string) => {
    if (!wallet.scCaller.current) return

    const response = await wallet.scCaller.current.sign(message)

    if (!response) {
      toast({
        status: "error",
        title: "Sign Error",
        message: "No response is received!",
      })
      return
    }

    const user = await AtherIdAuth.responseToSignInChallenge(cogitoUser, response)
    setUser(user)
    setFlowState(null)
  }

  const handleChallenge = async (user: any) => {
    if (!user.challengeName) {
      if (!wallet.isActive) setFlowState({ type: AuthType.SignIn, action: SignInAction.ConnectWallet })
      else setFlowState(null)
      return setUser(user)
    }

    // ! TO DO: handle the case when user need to change their password
    if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
      toast({ title: "Need new password" })
      return
    } else if (user.challengeName === "CUSTOM_CHALLENGE") {
      const { TYPE } = user.challengeParam
      if (TYPE === "WALLET") {
        return handleWalletChallenge(user, user.challengeParam.message)
      }
    }

    toast({
      status: "error",
      title: "Unable to Sign In",
      message: `Unknown challenge ${user.challengeParam?.challenge ?? user.challengeName}`,
    })
  }

  const { mutate: mutateSignIn } = useMutation<unknown, unknown, { emailOrWallet: string; password?: string }>(
    input => AtherIdAuth.signIn(input.emailOrWallet, input.password),
    {
      onSuccess: handleChallenge,
      onError: (e: any) => {
        if (e?.message === "User is not confirmed.") {
          setFlowState({ type: AuthType.SignIn, action: SignInAction.Verify })
        } else if (e?.message === "Wallet is not connected with any account") {
          toast({
            title: "Wallet is not registered",
            message: "Please sign up to continue!",
          })
        } else if (e?.code === 4001) {
          toast({
            status: "error",
            title: "Signature error",
            message: "User denied to sign the message",
          })
        } else {
          toast({
            status: "error",
            title: "Wallet connection error",
            message: e.message || "User denied to sign message.",
          })
        }
      },
      onSettled: () => setConnectingMethod(null),
    },
  )

  const handleWalletSignin = async (connectorId: Parameters<typeof wallet["connect"]>["0"]) => {
    setConnectingMethod(connectorId as string)
    let account = wallet.account
    if (!account) {
      account = (await wallet.connect(connectorId)) as string
    }
    mutateSignIn({ emailOrWallet: account! })
  }

  return (
    <ChakraModal
      title={"SIGN IN"}
      size="lg"
      isOpen={flowState?.type === AuthType.SignIn && flowState.action === SignInAction.SignIn}
      onClose={() => setFlowState(null)}
    >
      <Form
        onSubmit={handleSubmit(d => {
          setConnectingMethod("email")
          mutateSignIn({ emailOrWallet: d.email, password: d.password })
        })}
      >
        <Stack px={6} spacing={4} w="full">
          <FormControl as="fieldset">
            <FormField error={errors?.email?.message}>
              <CustomInput
                placeholder="Email address"
                {...register("email", { required: true, onChange: e => setEmail(e.target.value) })}
              />
            </FormField>
          </FormControl>
          <FormControl mb={0} as="fieldset">
            <FormField error={errors?.password?.message}>
              <CustomInput
                pr="2.5rem"
                type={"password"}
                placeholder="Password"
                {...register("password", { required: true })}
              />
            </FormField>
          </FormControl>
          <Text
            cursor="pointer"
            color="cyan.600"
            onClick={() => setFlowState({ type: AuthType.ForgotPassword, action: ForgotPasswordAction.FillEmail })}
          >
            Forgot password?
          </Text>
          <Button fontSize="md" py={6} fontWeight={600} type="submit" isLoading={connectingMethod === "email"}>
            SIGN IN
          </Button>
          <Flex align="center">
            <Text fontWeight={600}>or Sign in With</Text>
            <Box ml={2} flex={1} h="1px" bg="neutral.600" />
          </Flex>
          <WalletSignIn
            onMetamaskConnect={() => handleWalletSignin("injected")}
            onWalletConnectConnect={() => handleWalletSignin("walletConnect")}
            connectingMethod={connectingMethod}
          />

          <Text color="neutral.400" textAlign="center">
            Don't have an account?{" "}
            <chakra.span
              textDecor="underline"
              cursor="pointer"
              color="cyan.600"
              onClick={() => setFlowState({ type: AuthType.SignUp, action: SignUpAction.SignUp })}
            >
              Sign Up
            </chakra.span>
          </Text>
        </Stack>
      </Form>
    </ChakraModal>
  )
}

export default SignInForm
