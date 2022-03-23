import { FieldValues, useForm } from "react-hook-form"
import { useMutation } from "react-query"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import AtherIdAuth from "@sipher.dev/ather-id"
import { Button, chakra, FormControl, Spinner, Text, VStack } from "@sipher.dev/sipher-ui"
import { useStore } from "@store"

import { ChakraModal, CustomInput, Form, FormField } from "@components/shared"
import { useChakraToast } from "@hooks"

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/,
      "Must contain at least 8 characters, one uppercase, one number and one special character",
    ),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
  code: Yup.string().required("Code is required"),
})

interface VerifySignUpFormProps {
  email: string
  isOpen: boolean
  onClose: () => void
}

const VerifySignUpForm = ({ email, isOpen, onClose }: VerifySignUpFormProps) => {
  const toast = useChakraToast()
  const setAuthFlow = useStore(s => s.setAuthFlow)

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) })

  const { mutate: mutateForgetPasswordSubmit, isLoading } = useMutation<unknown, unknown, FieldValues>(
    d => AtherIdAuth.forgotPasswordSubmit(email, d.code, d.password),
    {
      onMutate: d => console.log(d),
      onSuccess: () => {
        toast({
          title: "Reset password successfully!",
          message: "Please login to continue.",
          status: "success",
        })
        setAuthFlow("SIGN_IN")
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
    <ChakraModal title={"CHANGE YOUR PASSWORD"} size="lg" isOpen={isOpen} onClose={onClose}>
      <Form onSubmit={handleSubmit(d => mutateForgetPasswordSubmit(d))}>
        <VStack align="stretch" spacing={4} px={6}>
          <Text color="neutral.300" fontSize="sm">
            {`Reset your pasword to use it in the Ather Labs' Platforms & Games.`}
          </Text>
          <FormControl>
            <FormField error={errors?.password?.message}>
              <CustomInput placeholder="Password" type="password" {...register("password")} />
            </FormField>
          </FormControl>
          <FormControl>
            <FormField error={errors?.confirmPassword?.message}>
              <CustomInput placeholder="Repeat your password" type="password" {...register("confirmPassword")} />
            </FormField>
          </FormControl>
          <FormControl>
            <FormField error={errors?.code?.message}>
              <CustomInput placeholder="Enter passcode" type="text" {...register("code")} />
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
        </VStack>
      </Form>
    </ChakraModal>
  )
}

export default VerifySignUpForm
