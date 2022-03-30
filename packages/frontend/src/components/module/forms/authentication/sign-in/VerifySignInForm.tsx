import { FormEvent, useEffect, useState } from "react"
import { useMutation } from "react-query"
import AtherIdAuth from "@sipher.dev/ather-id"
import { Box, Button, chakra, Divider, FormControl, Spinner, Stack, Text } from "@sipher.dev/sipher-ui"
import { AuthType, SignInAction } from "@store"

import { ChakraModal, CustomInput, Form, FormField } from "@components/shared"
import { useChakraToast } from "@hooks"

import { useSignInContext } from "./useSignIn"

const VerifySignInForm = () => {
  const toast = useChakraToast()
  const [code, setCode] = useState("")

  const { email, flowState, setFlowState, wallet } = useSignInContext()

  const { mutate, isLoading } = useMutation(() => AtherIdAuth.confirmSignUp(email, code), {
    onSuccess: () => {
      if (!wallet.isActive) setFlowState({ type: AuthType.SignIn, action: SignInAction.ConnectWallet })
      else
        toast({
          status: "success",
          title: "Sign Up Successfully",
          message: "You can now login to your account",
        })
    },
    onError: (e: any) => {
      toast({
        status: "error",
        title: "Error",
        message: e.message,
      })
    },
  })

  const { mutate: mutateResendCode, isLoading: isResendingCode } = useMutation(() => AtherIdAuth.resendSignUp(email), {
    onSuccess: () => {
      toast({
        status: "success",
        title: "Resend passcode successfully!",
        message: "Please check your email.",
      })
    },
  })

  useEffect(() => {
    if (flowState?.type === AuthType.SignIn && flowState.action === SignInAction.Verify) {
      AtherIdAuth.resendSignUp(email)
    }
  }, [flowState])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    mutate()
  }

  return (
    <ChakraModal
      title={"VERIFY YOUR ACCOUNT"}
      size="lg"
      isOpen={flowState?.type === AuthType.SignIn && flowState.action === SignInAction.Verify}
      closeOnOverlayClick={false}
      hideCloseButton
    >
      <Form onSubmit={handleSubmit}>
        <Stack pos="relative" px={6} spacing={4} w="full">
          <Box>
            <Text color="red.500">Your account is not confirmed.</Text>
            <Text color="neutral.300">
              Please enter passcode sent to <chakra.span fontWeight={600}>{email}</chakra.span>
            </Text>
          </Box>
          <FormControl as="fieldset">
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

export default VerifySignInForm
