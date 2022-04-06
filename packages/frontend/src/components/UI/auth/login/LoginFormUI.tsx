import { useState } from "react"
import { useForm } from "react-hook-form"
import { useMutation } from "react-query"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import AtherIdAuth, { ChallengeType, CognitoUser, SocialProvider } from "@sipher.dev/ather-id"
import { Box, Button, Flex, Heading, Link, Stack, Text } from "@sipher.dev/sipher-ui"
import { useWalletContext } from "@web3"

import { Form, SocialAccountSignIn, StyledInput, WalletSignIn } from "@components/shared"
import { useChakraToast } from "@hooks"
import { useAuth } from "src/providers/auth"

import { LoginStep } from "./LoginUI"

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Must be a valid email address"),
  password: Yup.string().required("Password is required"),
})

interface LoginFormUIProps {
  setStep: (step: LoginStep) => void
  onChangeEmail: (email: string) => void
  onChangePassword: (password: string) => void
  setTempUser: (user: CognitoUser | null) => void
}

const LoginFormUI = ({ setStep, onChangeEmail, onChangePassword, setTempUser }: LoginFormUIProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) })

  const toast = useChakraToast()
  const wallet = useWalletContext()
  const { setUser } = useAuth()

  const [connectingMethod, setConnectingMethod] = useState<string | null>(null)

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
  }

  const handleChallenge = async (user: any) => {
    if (!user.challengeName) {
      return setUser(user)
    }

    if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
      setTempUser(user)
      setStep(LoginStep.NewPassword)
      return
    } else if (user.challengeName === "CUSTOM_CHALLENGE") {
      const { TYPE } = user.challengeParam
      if (TYPE === ChallengeType.Wallet) {
        return handleWalletChallenge(user, user.challengeParam.message)
      }
      if (TYPE === ChallengeType.Code) {
        return
      }
    }

    toast({
      status: "error",
      title: "Unable to Sign In",
      message: `Unknown challenge ${user.challengeParam?.challenge ?? user.challengeName}`,
    })
  }

  const { mutate: mutateSignIn, isLoading } = useMutation<
    unknown,
    unknown,
    { emailOrWallet: string; password?: string }
  >(input => AtherIdAuth.signIn(input.emailOrWallet, input.password), {
    onSuccess: handleChallenge,
    onError: (e: any) => {
      if (e?.message === "User is not confirmed.") {
        setStep(LoginStep.Verify)
      } else if (e?.message === "Wallet is not connected with any account") {
        toast({
          status: "error",
          title: "Wallet is not registered",
          message: "Please sign up to continue!",
        })
      } else if (e?.code === 4001) {
        toast({
          status: "error",
          title: "Signature error",
          message: "User denied to sign the message",
        })
      } else if (e?.message === "Incorrect username or password.") {
        toast({
          status: "error",
          title: "Invalid credentials",
          message: "Please check email and password and try again",
        })
      } else {
        toast({
          status: "error",
          title: "Something went wrong!",
          message: e.message || "Please try again later.",
        })
      }
    },
    onSettled: () => setConnectingMethod(null),
  })

  const handleWalletSignin = async (connectorId: Parameters<typeof wallet["connect"]>["0"]) => {
    setConnectingMethod(connectorId as string)
    let account = wallet.account
    if (!account) {
      account = (await wallet.connect(connectorId)) as string
    }
    if (account) mutateSignIn({ emailOrWallet: account! })
  }

  return (
    <Box>
      <Heading fontSize={"lg"} fontWeight={600} mb={8} color="white" textAlign={"center"}>
        SIGN IN
      </Heading>
      <Form onSubmit={handleSubmit(d => mutateSignIn({ emailOrWallet: d.email, password: d.password }))} noValidate>
        <Stack spacing={4}>
          <StyledInput
            label="Email"
            autoComplete="off"
            {...register("email", { onChange: e => onChangeEmail(e.target.value) })}
            error={errors?.email?.message}
          />
          <StyledInput
            label="Password"
            type="password"
            {...register("password", { onChange: e => onChangePassword(e.target.value) })}
            error={errors?.password?.message}
          />

          <Link fontWeight={600} color="cyan.600" href="/forgot-password">
            Forgot password?
          </Link>
          <Button
            fontSize="md"
            py={6}
            fontWeight={600}
            type="submit"
            isLoading={isLoading && connectingMethod === null}
          >
            SIGN IN
          </Button>
        </Stack>
        <Flex align="center" mt={6} mb={4}>
          <Box flex={1} h="1px" bg="neutral.500" />
          <Text mx={2} fontWeight={600}>
            or Sign in With
          </Text>
          <Box flex={1} h="1px" bg="neutral.500" />
        </Flex>
        <SocialAccountSignIn
          onGoogleSignIn={() => AtherIdAuth.signInWithSocial(SocialProvider.Google)}
          onDiscordSignIn={() => AtherIdAuth.signInWithSocial(SocialProvider.Discord)}
          displayLabel
          mb={4}
        />
        <WalletSignIn
          onMetamaskConnect={() => handleWalletSignin("injected")}
          onWalletConnectConnect={() => handleWalletSignin("walletConnect")}
          connectingMethod={connectingMethod}
        />
        <Text color="neutral.400" textAlign="center" mt={8}>
          Don't have an account?{" "}
          <Link href="/signup" fontWeight={600} color="cyan.600">
            Sign Up
          </Link>
        </Text>
      </Form>
    </Box>
  )
}

export default LoginFormUI
