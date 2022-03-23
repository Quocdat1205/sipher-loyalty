import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useMutation } from "react-query"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import AtherIdAuth from "@sipher.dev/ather-id"
import { Button, FormControl, Text, VStack } from "@sipher.dev/sipher-ui"
import { useStore } from "@store"

import { ChakraModal, CustomInput, Form, FormField } from "@components/shared"

import VerifySignUpForm from "./VerifySignUpForm"

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Must be a valid email address"),
})

interface ForgetPasswordProps {
  isOpen: boolean
  onClose: () => void
}

const ForgetPassword = ({ isOpen, onClose }: ForgetPasswordProps) => {
  const [showVerify, setShowVerify] = useState(false)
  const [email, setEmail] = useState("")
  const setAuthFlow = useStore(s => s.setAuthFlow)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) })

  const { mutate, isLoading } = useMutation<unknown, unknown, string>(email => AtherIdAuth.forgotPassword(email), {
    onSuccess: () => {
      setShowVerify(true)
    },
  })

  useEffect(() => {
    if (showVerify) setAuthFlow(null)
  }, [showVerify])

  useEffect(() => {
    if (isOpen) setShowVerify(false)
  }, [isOpen])

  if (showVerify) return <VerifySignUpForm email={email} isOpen={showVerify} onClose={() => setShowVerify(false)} />

  return (
    <ChakraModal title={"FORGOT PASSWORD"} size="lg" isOpen={isOpen} onClose={onClose}>
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
          <Button py={6} fontWeight={600} isLoading={isLoading} type="submit" w="full" fontSize={"md"}>
            NEXT
          </Button>
        </VStack>
      </Form>
    </ChakraModal>
  )
}

export default ForgetPassword
