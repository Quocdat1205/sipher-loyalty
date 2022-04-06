import { FieldValues, useForm } from "react-hook-form"
import { useMutation } from "react-query"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import AtherIdAuth, { signInWithSocial, SocialProvider } from "@sipher.dev/ather-id"
import { Box, Button, Flex, Heading, Link, Stack, Text } from "@sipher.dev/sipher-ui"

import { Form, SocialAccountSignIn, StyledInput } from "@components/shared"
import { useChakraToast } from "@hooks"

import { SignUpStep } from "./SignUpUI"

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Must be a valid email address"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/,
      "Must contain at least 8 characters, one uppercase, one number and one special character",
    ),
})

interface SignUpFormUIProps {
  setStep: (step: SignUpStep) => void
  onChangeEmail: (email: string) => void
  onChangePassword: (password: string) => void
}

const SignUpFormUI = ({ setStep, onChangeEmail, onChangePassword }: SignUpFormUIProps) => {
  const toast = useChakraToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) })

  const { mutate: mutateSignUp, isLoading } = useMutation<unknown, unknown, FieldValues>(
    data => AtherIdAuth.signUp(data.email, data.password),
    {
      // Go to verify page after sign up
      onSuccess: () => setStep(SignUpStep.Verify),
      onError: (e: any) => {
        toast({
          status: "error",
          title: "Something went wrong!",
          message: e.message || "Please try again later.",
        })
      },
    },
  )

  return (
    <Box>
      <Heading fontSize={"lg"} fontWeight={600} mb={8} color="white" textAlign={"center"}>
        CREATE ATHER ACCOUNT
      </Heading>
      <Form onSubmit={handleSubmit(d => mutateSignUp({ email: d.email, password: d.password }))} noValidate>
        <Stack spacing={4}>
          <StyledInput
            label="Email"
            {...register("email", { onChange: e => onChangeEmail(e.target.value) })}
            error={errors?.email?.message}
          />
          <StyledInput
            label="Password"
            type="password"
            autoComplete="new-password"
            {...register("password", { onChange: e => onChangePassword(e.target.value) })}
            error={errors?.password?.message}
          />

          <Text fontSize="sm" color="neutral.400">
            I have read and agree to the{" "}
            <Link href="https://atherlabs.xyz/privacy-policy" fontWeight={600} color="cyan.600" isExternal>
              Ather Labs Privacy Policy
            </Link>
          </Text>
          <Button fontSize="md" py={6} fontWeight={600} type="submit" isLoading={isLoading}>
            SIGN UP
          </Button>
        </Stack>
        <Flex align="center" mt={6} mb={4}>
          <Box flex={1} h="1px" bg="neutral.500" />
          <Text mx={2} fontWeight={600}>
            or Sign up with
          </Text>
          <Box flex={1} h="1px" bg="neutral.500" />
        </Flex>
        <SocialAccountSignIn
          onGoogleSignIn={() => signInWithSocial(SocialProvider.Google)}
          onDiscordSignIn={() => signInWithSocial(SocialProvider.Discord)}
        />
        <Text color="neutral.400" textAlign="center" mt={6}>
          Already have an account?{" "}
          <Link href="/signin" fontWeight={600} color="cyan.600">
            Sign In
          </Link>
        </Text>
      </Form>
    </Box>
  )
}

export default SignUpFormUI
