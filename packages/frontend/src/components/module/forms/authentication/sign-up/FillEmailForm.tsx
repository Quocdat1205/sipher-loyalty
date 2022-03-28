import { FieldValues, useForm } from "react-hook-form"
import { MdInfo } from "react-icons/md"
import { useMutation } from "react-query"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import AtherIdAuth from "@sipher.dev/ather-id"
import { Box, Button, chakra, Flex, FormControl, Stack, Text } from "@sipher.dev/sipher-ui"
import { AuthType, SignUpAction } from "@store"

import { ChakraModal, CustomInput, CustomPopover, Form, FormField } from "@components/shared"
import { useChakraToast } from "@hooks"

import { useSignUpContext } from "./useSignUp"

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Must be a valid email address"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/,
      "Must contain at least 8 characters, one uppercase, one number and one special character",
    ),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
})

const FillEmailForm = () => {
  const toast = useChakraToast()

  const { flowState, setFlowState, setEmail, setPassword } = useSignUpContext()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) })

  const { mutate, isLoading } = useMutation<unknown, unknown, FieldValues>(
    data => AtherIdAuth.signUp(data.email, data.password),
    {
      onSuccess: () => {
        setFlowState({ type: AuthType.SignUp, action: SignUpAction.VerifySignUp })
      },
      onError: (e: any) =>
        toast({
          status: "error",
          title: "Error",
          message: e.message || "Something went wrong!",
        }),
    },
  )

  return (
    <ChakraModal
      title={"YOU ARE ALMOST THERE"}
      size="lg"
      isOpen={flowState?.type === AuthType.SignUp && flowState.action == SignUpAction.FillEmail}
      onClose={() => setFlowState(null)}
    >
      <Form onSubmit={handleSubmit(d => mutate(d))}>
        <Stack pos="relative" px={6} spacing={4} w="full">
          <Flex display="inline-block" align="center">
            <Text mr={2} color="neutral.400" fontSize="sm">
              You will need to fill in your email and password to enable{" "}
              <chakra.span sx={{ ">div": { display: "inline-block" } }} textDecor="underline" color="cyan.600">
                Ather Account{" "}
                <CustomPopover
                  placement="top"
                  label="Crypto-wallet"
                  icon={
                    <Box color="neutral.500">
                      <MdInfo size="1.2rem" />
                    </Box>
                  }
                >
                  <Text fontSize="sm" color="neutral.900">
                    The Ather Account system powers Ather Labs Game Launcher, Sipher game, Sipher Marketplace, Sipher
                    Loyalty, and more. This account system has never been compromised. However, specific individual
                    Ather accounts have been compromised by hackers using lists of email addresses and passwords leaked
                    from other sites which have been compromised.
                  </Text>
                  <Text fontSize="sm" color="neutral.900">
                    If you use the same email address and password on Ather as you used on another site which has been
                    compromised, then your account is vulnerable to attack. To secure your Ather account, use a unique
                    password, and enable multi-factor authentication. You can learn more about the measures we take to
                    protect your account and what you can do to stay safe here.
                  </Text>
                </CustomPopover>
              </chakra.span>
            </Text>
          </Flex>
          <FormControl as="fieldset">
            <FormField error={errors?.email?.message}>
              <CustomInput
                placeholder="Email address"
                {...register("email", { onChange: e => setEmail(e.target.value) })}
              />
            </FormField>
          </FormControl>
          <FormControl mb={2} as="fieldset">
            <FormField error={errors?.password?.message}>
              <CustomInput
                type={"password"}
                placeholder="Password"
                autoComplete="new-password"
                {...register("password", { onChange: e => setPassword(e.target.value) })}
              />
            </FormField>
          </FormControl>
          <FormControl mb={2} as="fieldset">
            <FormField error={errors?.confirmPassword?.message}>
              <CustomInput
                type={"password"}
                placeholder="Confirm your password"
                autoComplete="new-password"
                {...register("confirmPassword")}
              />
            </FormField>
          </FormControl>
          <Button fontSize="md" py={6} fontWeight={600} type="submit" isLoading={isLoading}>
            CONTINUE
          </Button>
        </Stack>
      </Form>
    </ChakraModal>
  )
}

export default FillEmailForm
