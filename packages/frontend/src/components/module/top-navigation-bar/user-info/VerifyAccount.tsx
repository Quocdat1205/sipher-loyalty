import React from "react"
import { Button, chakra, FormLabel, Stack, Text } from "@sipher.dev/sipher-ui"

import { CustomInput } from "@components/module/modal"
import { Form, FormControl, FormField } from "@components/shared"

interface VerifyAccountProps {
  setChangeForm: (changeForm: string) => void
}

export const VerifyAccount = ({ setChangeForm }: VerifyAccountProps) => {
  const handleClick = () => {
    setChangeForm("CHANGE_PASSWORD")
  }

  return (
    <Stack spacing={4} w="full">
      <Text color="neutral.300">Please enter Passcode sent to susan@sipher.xyz</Text>
      <Form>
        <FormControl as="fieldset">
          <FormLabel fontWeight={400}>Passcode</FormLabel>
          <FormField>
            <CustomInput />
          </FormField>
        </FormControl>
      </Form>
      <Button onClick={handleClick} fontSize="md" py={6} fontWeight={600}>
        CONTINUE
      </Button>
      <Text color="neutral.400" pt={4} textAlign="center">
        Haven't received code?{" "}
        <chakra.span textDecor="underline" cursor="pointer" color="cyan.600">
          Resend
        </chakra.span>
      </Text>
    </Stack>
  )
}
