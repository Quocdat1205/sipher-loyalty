import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs"
import { MdInfo } from "react-icons/md"
import { useMutation } from "react-query"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import AtherIdAuth, { CognitoUser } from "@sipher.dev/ather-id"
import {
  Box,
  Button,
  chakra,
  Flex,
  FormControl,
  HStack,
  IconButton,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
} from "@sipher.dev/sipher-ui"
import { useStore } from "@store"
import { useWalletContext } from "@web3"

import { ChakraModal, CustomInput, CustomPopover, Form, FormField, WalletCard } from "@components/shared"
import { useChakraToast } from "@hooks"
import { useAuth } from "src/providers/auth"

import useSignInContext from "../useSignInContext"

import ConnectToWallet from "./ConnectToWallet"

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
  const [show, setShow] = useState(false)
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
  const [connectingMethod, setConnectingMethod] = useState<string | null>(null)

  useEffect(() => {
    if (authenticated && !wallet.isActive) setConnectWallet(true)
  }, [authenticated, !wallet.isActive])

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
    console.log("USER", user)
    if (!user.challengeName) {
      if (!wallet.isActive) setConnectWallet(true)
      else onClose()
      return setUser(user)
    }

    if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
      toast({ title: "Need new password" })
      return setSigningInUser(user)
    } else if (user.challengeName === "CUSTOM_CHALLENGE") {
      const { challenge } = user.challengeParam
      if (challenge === "WALLET") {
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
        toast({
          status: "error",
          title: "Signature Error",
          message: e.message || "User denied to sign message.",
        })
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

  return (
    <ChakraModal title={"SIGN IN"} size="lg" isOpen={isOpen} onClose={onClose}>
      <Form
        onSubmit={handleSubmit(d => {
          setConnectingMethod("email")
          mutateSignIn({ emailOrWallet: d.email, password: d.password })
        })}
      >
        <Stack px={6} spacing={6} w="full">
          <FormControl as="fieldset">
            <FormField error={errors?.email?.message}>
              <CustomInput placeholder="Email address" {...register("email", { required: true })} />
            </FormField>
          </FormControl>
          <FormControl mb={0} as="fieldset">
            <FormField error={errors?.password?.message}>
              <InputGroup size="md">
                <CustomInput
                  pr="2.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Password"
                  {...register("password", { required: true })}
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
          <Text cursor="pointer" color="cyan.600">
            Forgot password?
          </Text>
          <Flex flexDir="column" pb={2}>
            <Box mb={4}>
              <Text pb={2} color="neutral.400" fontSize="sm">
                Social Account
              </Text>
              <HStack spacing={4}>
                <WalletCard bg="#1677EF" src="/images/icons/facebook.svg" />
                <WalletCard bg="#EA4336" src="/images/icons/google.svg" />
                <WalletCard bg="#4053E4" src="/images/icons/discord.svg" />
                <WalletCard bg="#479BE9" src="/images/icons/twitter.svg" />
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
                    Wallets are used to send, receive, and store digital assets like Ether. Wallets come in many forms.
                    For more infomation about wallets, see this{" "}
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
                  onClick={() => handleWalletSignin("injected")}
                  isLoading={connectingMethod === "injected"}
                  spinnerColor="black"
                />
                <WalletCard
                  text="ConnectWallet"
                  bg="white"
                  src="/images/icons/wallets/walletconnect.svg"
                  onClick={() => handleWalletSignin("walletConnect")}
                  isLoading={connectingMethod === "walletConnect"}
                  spinnerColor="black"
                />
              </HStack>
            </Box>
          </Flex>
          <Button fontSize="md" py={6} fontWeight={600} type="submit" isLoading={connectingMethod === "email"}>
            SIGN IN
          </Button>
        </Stack>
      </Form>
      <Text color="neutral.400" textAlign="center" mt={4}>
        Don't have an account?{" "}
        <chakra.span textDecor="underline" cursor="pointer" color="cyan.600" onClick={() => setAuthFlow("SIGN_UP")}>
          Sign Up
        </chakra.span>
      </Text>
    </ChakraModal>
  )
}

export default SignInForm
