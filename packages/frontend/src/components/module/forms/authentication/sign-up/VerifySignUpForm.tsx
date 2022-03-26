import { FormEvent, useEffect, useState } from "react"
import { useMutation } from "react-query"
import AtherIdAuth from "@sipher.dev/ather-id"
import { Button, chakra, FormControl, Spinner, Stack, Text } from "@sipher.dev/sipher-ui"
import { useStore } from "@store"
import { useWalletContext } from "@web3"

import { ChakraModal, CustomInput, Form, FormField } from "@components/shared"
import { useChakraToast } from "@hooks"

import ConnectingWallet from "./ConnectingWallet"
import ConnectToWallet from "./ConnectToWallet"

interface VerifySignUpFormProps {
  email: string
  password: string
  // address will be string when user connect wallet first, else
  account?: string | null
}

// * CONFIRM SIGN UP => SIGN IN (=> ADD WALLET IF HAVE => CONFIRM WALLET)

const VerifySignUpForm = ({ email, password, account = null }: VerifySignUpFormProps) => {
  const toast = useChakraToast()
  const [code, setCode] = useState("")
  const [isOpen, setIsOpen] = useState(true)
  const [isConnectingWallet, setIsConnectingWallet] = useState(false)
  const [showConnectWallet, setShowConnectWallet] = useState(false)
  const [authFlow] = useStore(s => [s.authFlow])
  const wallet = useWalletContext()

  // Initiate wallet connection => Sign the message to get signature => Confirm wallet connection
  const { mutate: mutateAddWallet } = useMutation<unknown, unknown, string>(
    async account => {
      const res = await AtherIdAuth.connectWallet(account!)
      const signature = await wallet.scCaller.current?.sign(res.message)
      await AtherIdAuth.confirmConectWallet(res, signature!)
    },
    {
      onSuccess: () => {
        setIsOpen(false)
      },
      onError: async (e: any) => {
        wallet.reset()
        if (e?.code === 4001) {
          await AtherIdAuth.signOut()
          toast({ status: "error", title: "Signature error", message: "User denied to sign the message" })
        } else {
          toast({
            status: "error",
            title: "Wallet already connected to another account",
            message: "Please sign in by that address or switch to another address and try again",
          })
        }
      },
    },
  )

  // Sign user in
  const { mutate: mutateSignIn, isLoading: isSigningIn } = useMutation(() => AtherIdAuth.signIn(email, password), {
    onSuccess: () => {
      if (account) {
        setIsConnectingWallet(true)
        mutateAddWallet(account)
      } else setShowConnectWallet(true)
    },
  })

  // Confirm sign up when user enter the passcode and submit
  // When signing up is successful, automatically sign in
  // After sign in successfully, navigate to connect wallet page
  // There are no wallet connection so far
  const { mutate: mutateConfirmSignup, isLoading: isConfirmingSignup } = useMutation(
    () => AtherIdAuth.confirmSignUp(email, code),
    {
      onSuccess: () => {
        mutateSignIn()
        setIsOpen(false)
      },
      onError: (e: any) => {
        toast({
          status: "error",
          title: "Something went wrong!",
          message: e?.message || "Please try again later.",
        })
      },
    },
  )

  const isLoading = isConfirmingSignup || isSigningIn

  useEffect(() => {
    if (authFlow === "SIGN_UP") setIsOpen(true)
  }, [authFlow])

  const { mutate: mutateResendCode, isLoading: isResendingCode } = useMutation(() => AtherIdAuth.resendSignUp(email), {
    onSuccess: () => {
      toast({
        status: "success",
        title: "Resend passcode successfully",
        message: "Please check your email",
      })
    },
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    mutateConfirmSignup()
  }

  if (showConnectWallet) return <ConnectToWallet onClose={() => setShowConnectWallet(false)} />

  if (isConnectingWallet) return <ConnectingWallet />

  return (
    <ChakraModal title={"VERIFY YOUR ACCOUNT"} size="lg" isOpen={isOpen} hideCloseButton={true}>
      <Form onSubmit={handleSubmit}>
        <Stack pos="relative" px={6} spacing={4} w="full">
          <Text color="neutral.300">
            Please enter the passcode sent to <chakra.span fontWeight={600}>{email}</chakra.span>
          </Text>
          <FormControl mb={0} as="fieldset">
            <FormField>
              <CustomInput placeholder="Passcode" value={code} onChange={e => setCode(e.target.value)} />
            </FormField>
          </FormControl>
          <Text color="neutral.400" textAlign="center">
            Haven't received code?{" "}
            <chakra.span textDecor="underline" cursor="pointer" color="cyan.600" onClick={() => mutateResendCode()}>
              Resend
            </chakra.span>
            {isResendingCode && <Spinner size="xs" color="cyan.600" ml={2} />}
          </Text>
          <Button type="submit" fontSize="md" py={6} fontWeight={600} isLoading={isLoading}>
            COMPLETE
          </Button>
        </Stack>
      </Form>
    </ChakraModal>
  )
}

export default VerifySignUpForm
