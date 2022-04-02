import { useForm } from "react-hook-form"
import { useMutation } from "react-query"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import AtherIdAuth, { CognitoUser } from "@sipher.dev/ather-id"
import { Box, Button, Divider, Heading, Text } from "@sipher.dev/sipher-ui"

import { Form, StyledInput } from "@components/shared"
import { useChakraToast } from "@hooks"
import { useAuth } from "src/providers/auth"

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/,
      "Must contain at least 8 characters, one uppercase, one number and one special character",
    ),
})

interface NewPasswordFormUIProps {
  tempUser: CognitoUser | null
}

const NewPasswordFormUI = ({ tempUser }: NewPasswordFormUIProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) })

  const toast = useChakraToast()
  const { setUser } = useAuth()

  const { mutate: mutateUpdatePassword, isLoading } = useMutation<CognitoUser, unknown, string>(
    password => AtherIdAuth.completeNewPassword(tempUser!, password),
    {
      onSuccess: data => {
        setUser(data)
      },
      onError: (e: any) => {
        toast({
          status: "error",
          title: "Update password failed!",
          message: e?.message || "Please try again later",
        })
      },
    },
  )

  return (
    <Box>
      <Heading fontSize={"lg"} fontWeight={600} mb={8} color="white" textAlign={"center"}>
        UPDATE NEW PASSWORD
      </Heading>
      <Form onSubmit={handleSubmit(d => mutateUpdatePassword(d.password))}>
        <Text mb={4}>You need to update your password to continue.</Text>
        <StyledInput label="New password" type="password" {...register("password")} error={errors?.password?.message} />
        <Divider my={6} />
        <Button fontSize="md" py={6} fontWeight={600} type="submit" w="full" isLoading={isLoading}>
          SIGN IN
        </Button>
      </Form>
    </Box>
  )
}

export default NewPasswordFormUI
