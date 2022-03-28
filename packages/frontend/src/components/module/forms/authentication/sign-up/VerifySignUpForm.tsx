import { FormEvent, useEffect, useState } from "react"
import { useMutation, useQueryClient } from "react-query"
import AtherIdAuth from "@sipher.dev/ather-id"
import { Button, chakra, Divider, FormControl, Spinner, Stack, Text } from "@sipher.dev/sipher-ui"
import { AuthType, SignUpAction } from "@store"

import { ChakraModal, CustomInput, Form, FormField } from "@components/shared"
import { useChakraToast } from "@hooks"
import { useAuth } from "src/providers/auth"

import { useSignUpContext } from "./useSignUp"

const VerifySignUpForm = () => {
  const toast = useChakraToast()
  const [code, setCode] = useState("")
  const { setUser } = useAuth()

  const { wallet, flowState, setFlowState, email, password, isConnectWalletFirst } = useSignUpContext()
  const qc = useQueryClient()
  useEffect(() => {
    if (flowState === null) setCode("")
  })

  // Initiate wallet connection => Sign the message to get signature => Confirm wallet connection
  const { mutate: mutateAddWallet } = useMutation<unknown, unknown, string>(
    async account => {
      const res = await AtherIdAuth.connectWallet(account!)
      const signature = await wallet.scCaller.current?.sign(res.message)
      await AtherIdAuth.confirmConectWallet(res, signature!)
    },
    {
      onSuccess: () => {
        setFlowState(null)
        qc.invalidateQueries("owned-wallets")
      },
      onError: async (e: any) => {
        wallet.reset()
        if (e?.code === 4001) {
          await AtherIdAuth.signOut()
          setFlowState(null)
          toast({ status: "error", title: "Signature error", message: "User denied to sign the message" })
        } else {
          toast({
            status: "error",
            title: "Wallet linked to other account",
            message: "Please sign in by that wallet or switch to another wallet and try again",
          })
        }
      },
    },
  )

  // Sign user in
  const { mutate: mutateSignIn, isLoading: isSigningIn } = useMutation(() => AtherIdAuth.signIn(email, password), {
    onSuccess: data => {
      setUser(data)
      if (isConnectWalletFirst) {
        setFlowState({ type: AuthType.SignUp, action: SignUpAction.ConnectingWallet })
        mutateAddWallet(wallet.account!)
      } else setFlowState({ type: AuthType.SignUp, action: SignUpAction.ConnectWallet })
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

  return (
    <ChakraModal
      title={"VERIFY YOUR ACCOUNT"}
      size="lg"
      isOpen={flowState?.type === AuthType.SignUp && flowState.action === SignUpAction.VerifySignUp}
      hideCloseButton={true}
    >
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
          <Divider />
          <Button type="submit" fontSize="md" py={6} fontWeight={600} isLoading={isLoading}>
            COMPLETE
          </Button>
        </Stack>
      </Form>
    </ChakraModal>
  )
}

export default VerifySignUpForm
