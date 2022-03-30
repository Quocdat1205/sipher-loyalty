import { Fragment, useState } from "react"
import { useForm } from "react-hook-form"
import { useMutation } from "react-query"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import AtherIdAuth from "@sipher.dev/ather-id"
import { Button, Divider, FormControl, Text, VStack } from "@sipher.dev/sipher-ui"
import { AuthType, ForgotPasswordAction, useAuthFlowStore } from "@store"

import { ChakraModal, CustomInput, Form, FormField } from "@components/shared"
import { useChakraToast } from "@hooks"

import VerifyNewPassword from "./VerifyNewPassword"

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Must be a valid email address"),
})

const ForgetPassword = () => {
  const [email, setEmail] = useState("")

  const [flowState, setFlowState] = useAuthFlowStore(s => [s.state, s.setState])

  const toast = useChakraToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) })

  const { mutate, isLoading } = useMutation<unknown, unknown, string>(email => AtherIdAuth.forgotPassword(email), {
    onSuccess: () => {
      setFlowState({ type: AuthType.ForgotPassword, action: ForgotPasswordAction.Verify })
      toast({
        status: "success",
        title: "Reset password request sent successfully!",
        message: "Please check the passcode sent to your email.",
      })
    },
  })

  return (
    <Fragment>
      <VerifyNewPassword email={email} />
      <ChakraModal
        closeOnOverlayClick={false}
        hideCloseButton
        title={"FORGOT PASSWORD"}
        size="lg"
        isOpen={flowState?.type === AuthType.ForgotPassword && flowState.action === ForgotPasswordAction.FillEmail}
        onClose={() => setFlowState(null)}
      >
        <Form onSubmit={handleSubmit(d => mutate(d.email))}>
          <VStack align="stretch" px={6} spacing={4}>
            <Text color="neutral.300" fontSize="sm">
              Enter your email address to reset your password.
            </Text>
            <FormControl as="fieldset">
              <FormField error={errors?.email?.message}>
                <CustomInput
                  placeholder="Email Address"
                  type="email"
                  {...register("email", { onChange: e => setEmail(e.target.value) })}
                />
              </FormField>
            </FormControl>
            <Divider />
            <Button py={6} fontWeight={600} isLoading={isLoading} type="submit" w="full" fontSize={"md"}>
              NEXT
            </Button>
          </VStack>
        </Form>
      </ChakraModal>
    </Fragment>
  )
}

export default ForgetPassword
