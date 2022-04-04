import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useMutation } from "react-query"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import AtherIdAuth from "@sipher.dev/ather-id"
import { Box, Button, Divider, Text } from "@sipher.dev/sipher-ui"
import { useAuthFlowStore } from "@store"

import { ChakraModal, Form, StyledInput } from "@components/shared"
import { useChakraToast } from "@hooks"

import VerifyNewPassword from "./VerifyNewPassword"

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Must be a valid email address"),
})

const ForgotPassword = () => {
  const [flowState, setFlowState] = useAuthFlowStore(s => [s.state, s.setState])
  const [email, setEmail] = useState("")
  const [step, setStep] = useState(1)
  const toast = useChakraToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(validationSchema) })

  const { mutate: mutateForgotPassword, isLoading } = useMutation<unknown, unknown, string>(
    email => AtherIdAuth.forgotPassword(email),
    {
      onSuccess: () => {
        setStep(2)
        toast({
          status: "success",
          title: "Reset password request sent successfully!",
          message: "Please check the passcode sent to your email.",
        })
      },
    },
  )

  useEffect(() => {
    if (flowState === null) {
      setStep(1)
      setEmail("")
      reset()
    }
  }, [flowState])

  if (step === 2) return <VerifyNewPassword isOpen={true} onClose={() => setFlowState(null)} email={email} />

  return (
    <ChakraModal
      title={"FORGOT PASSWORD"}
      size="lg"
      isOpen={flowState === "forgotPassword"}
      onClose={() => setFlowState(null)}
    >
      <Box px={6}>
        <Text color="neutral.300" mb={4}>
          Enter your email address to reset your password.
        </Text>
        <Form onSubmit={handleSubmit(d => mutateForgotPassword(d.email))}>
          <StyledInput
            label="Email"
            {...register("email", { onChange: e => setEmail(e.target.value) })}
            error={errors?.email?.message}
            mb={6}
          />
          <Divider my={6} />
          <Button fontSize="md" py={6} fontWeight={600} type="submit" isLoading={isLoading} w="full">
            CONTINUE
          </Button>
        </Form>
      </Box>
    </ChakraModal>
  )
}

export default ForgotPassword
