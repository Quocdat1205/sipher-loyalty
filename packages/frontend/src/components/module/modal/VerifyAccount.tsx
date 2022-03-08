import React, { Fragment } from "react"
import { Box, Button, chakra, Divider, Stack, Text } from "@sipher.dev/sipher-ui"

import { CustomInput } from "@components/module/modal"
import { Form, FormControl, FormField } from "@components/shared"

import { ChangeFormProps } from "../top-navigation-bar/user-info"

interface VerifyAccountProps extends ChangeFormProps {
  isComplete: boolean
  setIsComplete: (isComplete: boolean) => void
}
export const VerifyAccount = ({ isComplete, setIsComplete, changeForm, setChangeForm }: VerifyAccountProps) => {
  const handleChangeForm = () => {
    if (isComplete) {
      {
        setChangeForm({ ...changeForm, form: "SIGN_IN" })
        setIsComplete(false)
      }
    } else if (changeForm.status === "FORGOT") {
      setChangeForm({ ...changeForm, form: "CHANGE_PASSWORD" })
    } else if (changeForm.status === "SIGN_UP_EMAIL") {
      setChangeForm({ ...changeForm, form: "WALLET_FIRST" })
    } else setIsComplete(true)
  }

  return (
    <Stack pos="relative" px={6} spacing={6} w="full">
      <Text color="neutral.300">
        {isComplete ? (
          "Your account has been updated"
        ) : (
          <Fragment>
            Please enter Passcode sent to <chakra.span fontWeight={600}>susan@sipher.xyz</chakra.span>
          </Fragment>
        )}
      </Text>
      {!isComplete && (
        <Fragment>
          <Form>
            <FormControl mb={0} as="fieldset">
              <FormField>
                <CustomInput placeholder="Passcode" />
              </FormField>
            </FormControl>
          </Form>
          <Text color="neutral.400" textAlign="center">
            Haven't received code?{" "}
            <chakra.span textDecor="underline" cursor="pointer" color="cyan.600">
              Resend
            </chakra.span>
          </Text>
        </Fragment>
      )}
      <Box pb={2}>
        <Divider pos="absolute" left="0" w="full" borderColor="whiteAlpha.100" />
      </Box>
      <Button onClick={handleChangeForm} fontSize="md" py={6} fontWeight={600}>
        {changeForm.status === "FORGOT" ? "CONTINUE" : "COMPLETE"}
      </Button>
    </Stack>
  )
}
