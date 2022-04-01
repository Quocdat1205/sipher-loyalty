import { useForm } from "react-hook-form"
import { useMutation } from "react-query"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import AtherIdAuth from "@sipher.dev/ather-id"
import { Box, Button, Divider, Flex, Heading, Link, Text } from "@sipher.dev/sipher-ui"

import { Form, StyledInput } from "@components/shared"
import { useChakraToast } from "@hooks"

import { ForgotPasswordStep } from "./ForgotPasswordUI"

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Must be a valid email address"),
})

interface ForgotPasswordUI {
  setStep: (step: ForgotPasswordStep) => void
  onChangeEmail: (email: string) => void
}

const ForgotPasswordFormUI = ({ setStep, onChangeEmail }: ForgotPasswordUI) => {
  const toast = useChakraToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) })

  const { mutate: mutateForgotPassword, isLoading } = useMutation<unknown, unknown, string>(
    email => AtherIdAuth.forgotPassword(email),
    {
      onSuccess: () => {
        setStep(ForgotPasswordStep.Verify)
        toast({
          status: "success",
          title: "Reset password request sent successfully!",
          message: "Please check the passcode sent to your email.",
        })
      },
    },
  )
  return (
    <Box>
      <Heading fontSize={"lg"} fontWeight={600} mb={8} color="white" textAlign={"center"}>
        FORGOT PASSWORD
      </Heading>
      <Text color="neutral.300" mb={6}>
        Enter your email address to reset your password
      </Text>
      <Form onSubmit={handleSubmit(d => mutateForgotPassword(d.email))}>
        <StyledInput
          label="Email"
          {...register("email", { onChange: e => onChangeEmail(e.target.value) })}
          error={errors?.email?.message}
          mb={6}
        />
        <Divider my={6} />
        <Button fontSize="md" py={6} fontWeight={600} type="submit" isLoading={isLoading} w="full" mb={6}>
          CONTINUE
        </Button>
        <Flex w="full" justify="center">
          <Link href="/signin" fontWeight={600} color="cyan.600">
            Back to Sign In
          </Link>
        </Flex>
      </Form>
    </Box>
  )
}

export default ForgotPasswordFormUI
