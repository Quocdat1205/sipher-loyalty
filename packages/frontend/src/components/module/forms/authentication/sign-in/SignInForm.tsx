import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useMutation } from "react-query"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import AtherIdAuth, { CognitoUser } from "@sipher.dev/ather-id"
import { Box, Button, chakra, Flex, FormControl, Stack, Text } from "@sipher.dev/sipher-ui"
import { useStore } from "@store"
import { useWalletContext } from "@web3"

import { ChakraModal, CustomInput, Form, FormField, WalletSignIn } from "@components/shared"
import { useChakraToast } from "@hooks"
import { useAuth } from "src/providers/auth"

import useSignInContext from "../useSignInContext"

import ConnectToWallet from "./ConnectToWallet"
import VerifySignUpForm from "./VerifySignUpForm"

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Must be a valid email address"),
  password: Yup.string().required("Password is required"),
})

interface SignInFormProps {
  isOpen: boolean
  onClose: () => void
}

const SignInForm = ({ isOpen, onClose }: SignInFormProps) => {
  const wallet = useWalletContext()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) })

  const toast = useChakraToast()
  const { setUser: setSigningInUser } = useSignInContext()
  const { setUser, authenticated } = useAuth()

  const setAuthFlow = useStore(s => s.setAuthFlow)

  const [connectWallet, setConnectWallet] = useState(false)
  const [verifyCode, setVerifyCode] = useState(false)
  const [email, setEmail] = useState("")
  const [connectingMethod, setConnectingMethod] = useState<string | null>(null)

  useEffect(() => {
    if (authenticated && !wallet.isActive) setConnectWallet(true)
  }, [authenticated, !wallet.isActive])

  useEffect(() => {
    if (connectWallet || verifyCode) setAuthFlow(null)
  }, [connectWallet, verifyCode])

  useEffect(() => {
    if (isOpen) {
      setConnectWallet(false)
      setVerifyCode(false)
    }
  }, [isOpen])

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
    onClose()
  }

  const handleChallenge = async (user: any) => {
    if (!user.challengeName) {
      if (!wallet.isActive) setConnectWallet(true)
      else onClose()
      return setUser(user)
    }

    if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
      toast({ title: "Need new password" })
      return setSigningInUser(user)
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
          setVerifyCode(true)
        } else if (e?.message === "Wallet is not connected with any account") {
          toast({
            title: "Wallet is not registered",
            message: "Please sign up to continue!",
          })
          setAuthFlow("SIGN_UP")
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

  if (connectWallet) return <ConnectToWallet />

  if (verifyCode) return <VerifySignUpForm email={email} />

  return (
    <ChakraModal title={"SIGN IN"} size="lg" isOpen={isOpen} onClose={onClose}>
      <Form
        onSubmit={handleSubmit(d => {
          setConnectingMethod("email")
          console.log(d)
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
          <Text cursor="pointer" color="cyan.600" onClick={() => setAuthFlow("FORGET_PASSWORD")}>
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
            <chakra.span textDecor="underline" cursor="pointer" color="cyan.600" onClick={() => setAuthFlow("SIGN_UP")}>
              Sign Up
            </chakra.span>
          </Text>
        </Stack>
      </Form>
    </ChakraModal>
  )
}

export default SignInForm
