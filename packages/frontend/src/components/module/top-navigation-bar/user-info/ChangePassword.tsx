import React, { useState } from "react"
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs"
import {
  Box,
  Button,
  Flex,
  FormLabel,
  HStack,
  IconButton,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
} from "@sipher.dev/sipher-ui"

import { CustomInput } from "@components/module/modal"
import { Form, FormControl, FormField } from "@components/shared"

import { usePasswordValidation } from "./usePasswordValidation"

interface ChangePasswordProps {
  setChangeForm: (changeForm: string) => void
  isComplete: boolean
  setIsComplete: (isComplete: boolean) => void
}

export const ChangePassword = ({ setChangeForm, isComplete, setIsComplete }: ChangePasswordProps) => {
  const [show, setShow] = useState({ pass1: false, pass2: false })
  const [password, setPassword] = useState({ firstPass: "", secondPass: "" })

  const validationPassword = usePasswordValidation({
    firstPassword: password.firstPass,
    secondPassword: password.secondPass,
  })

  const handleChangeForm = () => {
    if (isComplete) {
      {
        setChangeForm("SIGN_IN")
        setIsComplete(false)
      }
    } else setIsComplete(true)
  }

  return (
    <Stack spacing={4} w="full">
      <Text color="neutral.300">
        {isComplete
          ? "The password of your account has been updated"
          : `Set your password to use it in the Ather Lab's platforms.`}
      </Text>
      {!isComplete && (
        <Form>
          <FormControl as="fieldset">
            <FormLabel fontWeight={400}>Your Password</FormLabel>
            <FormField>
              <InputGroup size="md">
                <CustomInput
                  onChange={e => setPassword({ ...password, firstPass: e.target.value })}
                  pr="4.5rem"
                  type={show.pass1 ? "text" : "password"}
                  placeholder="Enter password"
                />
                <InputRightElement width="4.5rem">
                  <IconButton
                    variant="ghost"
                    aria-label="eye-icon"
                    color="neutral.400"
                    _hover={{ bg: "neutral.500" }}
                    _active={{ bg: "neutral.500" }}
                    icon={show.pass1 ? <BsEyeSlashFill size="1rem" /> : <BsEyeFill size="1rem" />}
                    size="sm"
                    h="1.75rem"
                    onClick={() => setShow({ ...show, pass1: !show.pass1 })}
                  />
                </InputRightElement>
              </InputGroup>
            </FormField>
            <Flex align="center" justify="space-between">
              <Text color="neutral.500" fontSize="xs">
                {validationPassword.filter(i => i === true).length > 0
                  ? "Poor"
                  : validationPassword.filter(i => i === true).length > 1
                  ? "Fair"
                  : validationPassword.filter(i => i === true).length > 2
                  ? "Good"
                  : validationPassword.filter(i => i === true).length > 3
                  ? "Excellent"
                  : "Password Strength"}
              </Text>
              <HStack spacing={1}>
                <Box
                  bg={validationPassword.filter(i => i === true).length > 0 ? "red.500" : "neutral.600"}
                  w="48px"
                  h="3px"
                />
                <Box
                  bg={validationPassword.filter(i => i === true).length > 1 ? "accent.500" : "neutral.600"}
                  w="48px"
                  h="3px"
                />
                <Box
                  bg={validationPassword.filter(i => i === true).length > 2 ? "green.500" : "neutral.600"}
                  w="48px"
                  h="3px"
                />
                <Box
                  bg={validationPassword.filter(i => i === true).length > 3 ? "cyan.500" : "neutral.600"}
                  w="48px"
                  h="3px"
                />
              </HStack>
            </Flex>
          </FormControl>
          <FormControl as="fieldset">
            <FormLabel fontWeight={400}>Repeat your Password</FormLabel>
            <FormField>
              <InputGroup size="md">
                <CustomInput
                  onChange={e => setPassword({ ...password, firstPass: e.target.value })}
                  pr="4.5rem"
                  type={show.pass2 ? "text" : "password"}
                  placeholder="Enter password"
                />
                <InputRightElement width="4.5rem">
                  <IconButton
                    variant="ghost"
                    aria-label="eye-icon"
                    color="neutral.400"
                    _hover={{ bg: "neutral.500" }}
                    _active={{ bg: "neutral.500" }}
                    icon={show.pass2 ? <BsEyeSlashFill size="1rem" /> : <BsEyeFill size="1rem" />}
                    size="sm"
                    h="1.75rem"
                    onClick={() => setShow({ ...show, pass2: !show.pass2 })}
                  />
                </InputRightElement>
              </InputGroup>
            </FormField>
          </FormControl>
        </Form>
      )}
      <Button onClick={handleChangeForm} fontSize="md" py={6} fontWeight={600}>
        {isComplete ? "SIGN IN" : "COMPLETE"}
      </Button>
    </Stack>
  )
}
