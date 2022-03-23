import { FormEvent, useEffect, useState } from "react"
import { useMutation, useQuery } from "react-query"
import AtherIdAuth from "@sipher.dev/ather-id"
import { Box, Button, chakra, Divider, FormControl, Spinner, Stack, Text } from "@sipher.dev/sipher-ui"

import { ChakraModal, CustomInput, Form, FormField } from "@components/shared"
import { useChakraToast } from "@hooks"

import ConnectToWallet from "./ConnectToWallet"

interface VerifySignUpFormProps {
  email: string
  isWalletConnected?: boolean
}

const VerifySignUpForm = ({ email, isWalletConnected = false }: VerifySignUpFormProps) => {
  const toast = useChakraToast()
  const [code, setCode] = useState("")

  const [isConnectingWallet, setIsConnectingWallet] = useState(false)

  const { mutate, isLoading } = useMutation(() => AtherIdAuth.confirmSignUp(email, code), {
    onSuccess: () => {
      if (!isWalletConnected) setIsConnectingWallet(true)
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
    mutateResendCode()
  }, [])

  if (isConnectingWallet) return <ConnectToWallet />

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    mutate()
  }

  return (
    <ChakraModal title={"VERIFY YOUR ACCOUNT"} size="lg" isOpen={true} hideCloseButton={true}>
      <Stack pos="relative" px={6} spacing={6} w="full">
        <Text color="neutral.300">
          Please enter Passcode sent to <chakra.span fontWeight={600}>{email}</chakra.span>
        </Text>
        <Form onSubmit={handleSubmit}>
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
          <Box pb={2}>
            <Divider pos="absolute" left="0" w="full" borderColor="whiteAlpha.100" />
          </Box>
          <Button type="submit" fontSize="md" py={6} fontWeight={600} isLoading={isLoading}>
            COMPLETE
          </Button>
        </Form>
      </Stack>
    </ChakraModal>
  )
}

export default VerifySignUpForm
