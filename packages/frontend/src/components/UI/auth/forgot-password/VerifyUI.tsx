import { FieldValues, useForm } from "react-hook-form"
import { useMutation } from "react-query"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import AtherIdAuth from "@sipher.dev/ather-id"
import { Box, Button, chakra, Divider, Heading, Spinner, Stack, Text } from "@sipher.dev/sipher-ui"

import { Form, StyledInput } from "@components/shared"
import { useChakraToast } from "@hooks"

import { ForgotPasswordStep } from "./ForgotPasswordUI"

interface VerifyFormProps {
  email: string
  setStep: (step: ForgotPasswordStep) => void
}

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*_])(?=.{8,})/,
      "Must contain at least 8 characters, one uppercase, one number and one special character",
    ),
  code: Yup.string().required("Code is required"),
})

const VerifyUI = ({ email, setStep }: VerifyFormProps) => {
  const toast = useChakraToast()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) })

  const { mutate: mutateForgetPasswordSubmit, isLoading } = useMutation<unknown, unknown, FieldValues>(
    d => AtherIdAuth.forgotPasswordSubmit(email, d.code, d.password),
    {
      onSuccess: () => {
        setStep(ForgotPasswordStep.Success)
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

  const { mutate: mutateResendCode, isLoading: isResendingCode } = useMutation(
    () => AtherIdAuth.forgotPassword(email),
    {
      onSuccess: () => {
        toast({
          status: "success",
          title: "Resend passcode successfully!",
          message: "Please check your email",
        })
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

  return (
    <Box>
      <Heading fontSize={"lg"} fontWeight={600} mb={8} color="white" textAlign={"center"}>
        MOSTLY DONE!
      </Heading>
      <Text color="neutral.300" mb={4}>
        You're almost there! Please enter your New Password below.
      </Text>
      <Form onSubmit={handleSubmit(d => mutateForgetPasswordSubmit(d))}>
        <Stack spacing={4}>
          <StyledInput
            label="New Password"
            {...register("password")}
            mb={4}
            type="password"
            error={errors?.password?.message}
          />
          <StyledInput label="Enter Passcode" {...register("code")} mb={4} error={errors?.code?.message} />
          <Text color="neutral.400" textAlign="center">
            Haven't received code?{" "}
            <chakra.span cursor={"pointer"} fontWeight={600} color="cyan.600" onClick={() => mutateResendCode()}>
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

export default VerifyUI
