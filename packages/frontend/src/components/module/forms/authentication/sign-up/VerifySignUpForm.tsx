import { FormEvent, useEffect, useState } from "react"
import { useMutation } from "react-query"
import AtherIdAuth from "@sipher.dev/ather-id"
import { Button, chakra, FormControl, Spinner, Stack, Text } from "@sipher.dev/sipher-ui"
import { useStore } from "@store"
import { useWalletContext } from "@web3"

import { ChakraModal, CustomInput, Form, FormField } from "@components/shared"
import { useChakraToast, useOwnedWallets } from "@hooks"

import ConnectingWallet from "./ConnectingWallet"

interface VerifySignUpFormProps {
  email: string
  password: string
  // address will be string when user connect wallet first, else
  address: string | null
}

// * CONFIRM SIGN UP => SIGN IN (=> ADD WALLET IF HAVE => CONFIRM WALLET)

const VerifySignUpForm = ({ email, password, address }: VerifySignUpFormProps) => {
  const toast = useChakraToast()
  const [code, setCode] = useState("")
  const [isOpen, setIsOpen] = useState(true)
  // const [isConnectingWallet, setIsConnectingWallet] = useState(false)
  const [authFlow] = useStore(s => [s.authFlow])

  const { scCaller, reset } = useWalletContext()

  const ownedWallets = useOwnedWallets()

  const { mutate: mutateConnectWallet, isLoading: isConnectingWallet } = useMutation(
    async () => {
      if (!ownedWallets.includes(address!)) {
        const res = await AtherIdAuth.connectWallet(address!)
        const signature = await scCaller.current?.sign(res.message)
        await AtherIdAuth.confirmConectWallet(res, signature!)
      }
    },
    {
      onError: (e: any) => {
        if (e?.code === 4001) {
          toast({
            status: "error",
            title: "Signature error",
            message: "User denied to sign the message",
          })
          AtherIdAuth.signOut()
          reset()
        }
      },
    },
  )

  const { mutate: mutateSignIn, isLoading: isSigningIn } = useMutation(() => AtherIdAuth.signIn(email, password), {
    onSuccess: () => {
      if (address) {
        mutateConnectWallet()
      }
    },
  })

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

  const isLoading = isConfirmingSignup || isSigningIn || isConnectingWallet

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
