import { FieldValues, useForm } from "react-hook-form"
import { useMutation } from "react-query"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import AtherIdAuth from "@sipher.dev/ather-id"
import { Box, Button, chakra, Divider, Spinner, Stack, Text } from "@sipher.dev/sipher-ui"

import { ChakraModal, Form, StyledInput } from "@components/shared"
import { useChakraToast } from "@hooks"

interface VerifyNewPasswordProps {
  isOpen: boolean
  onClose: () => void
  email: string
}

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/,
      "Must contain at least 8 characters, one uppercase, one number and one special character",
    ),
  code: Yup.string().required("Code is required"),
})

const VerifyNewPassword = ({ isOpen, onClose, email }: VerifyNewPasswordProps) => {
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
        toast({
          status: "success",
          title: "Password reset successfully!",
        })
        onClose()
      },
      onError: (e: any) => {
        toast({
          status: "error",
          title: "Reset password failed!",
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
          title: "Resend code failed!",
          message: e?.message || "Please try again later.",
        })
      },
    },
  )

  return (
    <ChakraModal title={"MOSTLY DONE!"} size="lg" isOpen={isOpen} onClose={onClose}>
      <Box px={6}>
        <Text color="neutral.300" mb={6}>
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
    </ChakraModal>
  )
}

export default VerifyNewPassword
