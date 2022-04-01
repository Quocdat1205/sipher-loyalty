import { FormEvent, useState } from "react"
import { useMutation } from "react-query"
import AtherIdAuth from "@sipher.dev/ather-id"
import { Box, Button, chakra, Divider, Heading, Spinner, Stack, Text } from "@sipher.dev/sipher-ui"

import { Form, StyledInput } from "@components/shared"
import { useChakraToast } from "@hooks"
import { useAuth } from "src/providers/auth"

import { SignUpStep } from "./SignUpUI"

interface VerifyFormProps {
  email: string
  password: string
  setStep: (step: SignUpStep) => void
}

const VerifyForm = ({ email, password, setStep }: VerifyFormProps) => {
  const toast = useChakraToast()
  const [code, setCode] = useState("")
  const { setUser } = useAuth()

  // Sign user in
  const { mutate: mutateSignIn, isLoading: isSigningIn } = useMutation(() => AtherIdAuth.signIn(email, password), {
    onSuccess: data => {
      setUser(data)
      setStep(SignUpStep.ConnectWallet)
    },
  })

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
    <Box>
      <Heading fontSize={"lg"} fontWeight={600} mb={8} color="white" textAlign={"center"}>
        VERIFY YOUR ACCOUNT
      </Heading>
      <Form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <Text color="neutral.300">
            Please enter the passcode sent to <chakra.span fontWeight={600}>{email}</chakra.span>
          </Text>
          <StyledInput label="Passcode" value={code} onChange={e => setCode(e.target.value)} />
          <Text color="neutral.400" textAlign="center">
            Haven't received code?{" "}
            <chakra.span textDecor="underline" cursor="pointer" color="cyan.600" onClick={() => mutateResendCode()}>
              Resend
            </chakra.span>
            {isResendingCode && <Spinner size="xs" color="cyan.600" ml={2} />}
          </Text>
        </Stack>
        <Divider mt={4} />
        <Button type="submit" fontSize="md" py={6} fontWeight={600} isLoading={isLoading} w="full" mt={6}>
          COMPLETE
        </Button>
      </Form>
    </Box>
  )
}

export default VerifyForm
