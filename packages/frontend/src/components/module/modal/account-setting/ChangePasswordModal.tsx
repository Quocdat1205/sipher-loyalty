import React, { useEffect } from "react"
import { FieldValues, useForm } from "react-hook-form"
import { BiArrowBack } from "react-icons/bi"
import { useMutation } from "react-query"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import AtherIdAuth from "@sipher.dev/ather-id"
import { Box, Button, Flex, FormControl, HStack, Text } from "@sipher.dev/sipher-ui"

import { ChakraModal, CustomInput, Form, FormField } from "@components/shared"
import { useChakraToast } from "@hooks"
import { useAuth } from "src/providers/auth"

interface ChangePasswordModal {
  isOpen: boolean
  onClose: () => void
  onBack: () => void
}

const validationSchema = Yup.object().shape({
  currentPassword: Yup.string().required("Current password is required"),
  newPassword: Yup.string().required("New password is required"),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("newPassword")], "Passwords must match"),
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
      onError: () => {
        toast({
          status: "error",
          title: "Change password failed!",
          message: "Pleases try again later",
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
      <Box px={6}>
        <Form onSubmit={handleSubmit(d => mutateChangePassword(d))}>
          <FormControl mb={4}>
            <FormField error={errors?.currentPassword?.message}>
              <CustomInput
                placeholder="Current password"
                type="password"
                autoComplete="new-password"
                {...register("currentPassword")}
              />
            </FormField>
          </FormControl>
          <FormControl mb={4}>
            <FormField error={errors?.newPassword?.message}>
              <CustomInput
                type={"password"}
                placeholder="New password"
                autoComplete="new-password"
                {...register("newPassword")}
              />
            </FormField>
          </FormControl>
          <FormControl mb={4}>
            <FormField error={errors?.confirmPassword?.message}>
              <CustomInput
                type={"password"}
                placeholder="Confirm your password"
                autoComplete="new-password"
                {...register("confirmPassword")}
              />
            </FormField>
          </FormControl>
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
