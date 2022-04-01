import { FormEvent, useEffect, useState } from "react"
import { useMutation } from "react-query"
import AtherIdAuth from "@sipher.dev/ather-id"
import { Box, Button, chakra, Divider, FormControl, Heading, Spinner, Stack, Text } from "@sipher.dev/sipher-ui"

import { CustomInput, Form, FormField, StyledInput } from "@components/shared"
import { useChakraToast } from "@hooks"

interface VerifyFormUIProps {
  email: string
  password: string
}

const VerifyFormUI = ({ email, password }: VerifyFormUIProps) => {
  const toast = useChakraToast()
  const [code, setCode] = useState("")

  const { mutate: mutateSignIn } = useMutation<unknown, unknown, { emailOrWallet: string; password?: string }>(
    input => AtherIdAuth.signIn(input.emailOrWallet, input.password),
    {
      onError: (e: any) => {
        toast({
          status: "error",
          title: "Something went wrong!",
          message: e.message || "Please try again later.",
        })
      },
    },
  )

  const { mutate: mutateConfirmSignUp, isLoading } = useMutation(() => AtherIdAuth.confirmSignUp(email, code), {
    onSuccess: () => {
      mutateSignIn({ emailOrWallet: email, password })
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
    AtherIdAuth.resendSignUp(email)
  }, [])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    mutateConfirmSignUp()
  }

  return (
    <Box>
      <Form onSubmit={handleSubmit}>
        <Heading fontSize={"lg"} fontWeight={600} mb={4} color="white">
          SIGN IN
        </Heading>
        <Stack pos="relative" px={6} spacing={4} w="full">
          <Box>
            <Text color="red.500">Your account is not confirmed.</Text>
            <Text color="neutral.300">
              Please enter passcode sent to <chakra.span fontWeight={600}>{email}</chakra.span>
            </Text>
          </Box>
          <StyledInput label="Passcode" value={code} onChange={e => setCode(e.target.value)} />
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
    </Box>
  )
}

export default VerifyFormUI
