import React from "react"
import { Button, FormLabel, Stack, Text } from "@sipher.dev/sipher-ui"

import { CustomInput } from "@components/module/modal"
import { Form, FormControl, FormField } from "@components/shared"

interface ForgotPasswordProps {
  setChangeForm: (changeForm: string) => void
}

export const ForgotPassword = ({ setChangeForm }: ForgotPasswordProps) => {
  const handleClick = () => {
    setChangeForm("VERIFY")
  }
  return (
    <Stack spacing={4} w="full">
      <Text color="neutral.300">Enter your email address to reset your password.</Text>
      <Form>
        <FormControl as="fieldset">
          <FormLabel fontWeight={400}>Email address</FormLabel>
          <FormField>
            <CustomInput />
          </FormField>
        </FormControl>
      </Form>
      <Button onClick={handleClick} fontSize="md" py={6} fontWeight={600}>
        NEXT
      </Button>
    </Stack>
  )
}
