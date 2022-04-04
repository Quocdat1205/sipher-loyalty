import React, { useEffect } from "react"
import { FieldValues, useForm } from "react-hook-form"
import { BiArrowBack } from "react-icons/bi"
import { useMutation } from "react-query"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import AtherIdAuth from "@sipher.dev/ather-id"
import { Box, Button, Divider, Flex, HStack, Stack, Text } from "@sipher.dev/sipher-ui"
import { useAuthFlowStore } from "@store"

import { ChakraModal, Form, StyledInput } from "@components/shared"
import { useChakraToast } from "@hooks"
import { useAuth } from "src/providers/auth"

interface ChangePasswordModal {
  isOpen: boolean
  onClose: () => void
  onBack: () => void
}

const validationSchema = Yup.object().shape({
  currentPassword: Yup.string().required("Current password is required"),
  newPassword: Yup.string()
    .required("New password is required")
    .matches(
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/,
      "Password must contain 8 or more characters with a combination of uppercase, lowercase, numbers, and symbols.",
    ),
})

const ChangePasswordModal = ({ isOpen, onClose, onBack }: ChangePasswordModal) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(validationSchema) })

  useEffect(() => {
    if (isOpen) reset()
  }, [isOpen])

  const toast = useChakraToast()

  const setAuthFlow = useAuthFlowStore(s => s.setState)

  const { cognitoUser } = useAuth()
  const { mutate: mutateChangePassword, isLoading } = useMutation<unknown, unknown, FieldValues>(
    d => AtherIdAuth.changePassword(cognitoUser!, d.currentPassword, d.newPassword),
    {
      onSuccess: () => {
        toast({
          status: "success",
          title: "Change password successfully",
        })
        onClose()
      },
      onError: (e: any) => {
        toast({
          status: "error",
          title: "Change password failed!",
          message: e.message ?? "Pleases try again later",
        })
      },
    },
  )

  return (
    <ChakraModal
      title={
        <Flex onClick={onBack} cursor="pointer" align="center">
          <Box mr={1} color="accent.500">
            <BiArrowBack size="1.2rem" />
          </Box>
          <Text color="neutral.400">Change Password</Text>
        </Flex>
      }
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
    >
      <Box px={6} mt={2}>
        <Form onSubmit={handleSubmit(d => mutateChangePassword(d))}>
          <Stack spacing={6} mb={4}>
            <StyledInput
              error={errors.currentPassword?.message}
              label="Current password"
              type="password"
              {...register("currentPassword")}
            />
            <StyledInput
              error={errors.newPassword?.message}
              label="New password"
              type="password"
              helperText="Password must contain 8 or more characters with a combination of uppercase, lowercase, numbers, and symbols."
              {...register("newPassword")}
            />
          </Stack>
          <Text
            cursor="pointer"
            color="cyan.600"
            fontWeight={600}
            onClick={() => {
              onClose()
              setAuthFlow("forgotPassword")
            }}
          >
            Forgot password?
          </Text>
          <Divider my={6} />
          <HStack spacing={4} justify="center">
            <Button type="submit" fontSize="md" py={6} fontWeight={600} isLoading={isLoading}>
              UPDATE PASSWORD
            </Button>
            <Button
              border="1px"
              borderColor="neutral.600"
              size="md"
              colorScheme="neutral"
              variant="secondary"
              onClick={onClose}
              py={6}
              fontSize="md"
            >
              CANCEL
            </Button>
          </HStack>
        </Form>
      </Box>
    </ChakraModal>
  )
}

export default ChangePasswordModal
