import React from "react"
import { Box, Button, Divider, Stack, Text } from "@sipher.dev/sipher-ui"

import { CustomInput } from "@components/module/modal"
import { Form, FormControl, FormField } from "@components/shared"

import { ChangeFormProps } from "../top-navigation-bar/sign-in-button"

type ForgotPasswordProps = ChangeFormProps

export const ForgotPassword = ({ changeForm, setChangeForm }: ForgotPasswordProps) => {
  const handleClick = () => {
    setChangeForm({ ...changeForm, form: "VERIFY" })
  }
  return (
    <Stack pos="relative" px={6} spacing={4} w="full">
      <Text color="neutral.300">Enter your email address to reset your password.</Text>
      <Form>
        <FormControl mb={2} as="fieldset">
          <FormField>
            <CustomInput placeholder="Email Address" />
          </FormField>
        </FormControl>
      </Form>
      <Box pb={2}>
        <Divider pos="absolute" left="0" w="full" borderColor="whiteAlpha.100" />
      </Box>
      <Button onClick={handleClick} fontSize="md" py={6} fontWeight={600}>
        NEXT
      </Button>
    </Stack>
  )
}
