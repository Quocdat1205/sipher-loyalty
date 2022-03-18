import React, { useState } from "react"
import { BiArrowBack } from "react-icons/bi"
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs"
import {
  Box,
  Button,
  Divider,
  Flex,
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
  setChangeForm: (v: string) => void
}

export const AccountPassword = ({ setChangeForm }: ChangePasswordProps) => {
  const [show, setShow] = useState({ pass1: false, pass2: false })
  const [password, setPassword] = useState({ firstPass: "", secondPass: "" })

  const validationPassword = usePasswordValidation({
    firstPassword: password.firstPass,
    secondPassword: password.secondPass,
  })

  const handleChangeForm = () => {
    setChangeForm("SETTING")
  }

  const handleStrengthText = () => {
    if (validationPassword.filter(i => i === true).length > 3) return { text: "Excellent", color: "cyan.400" }
    if (validationPassword.filter(i => i === true).length > 2) return { text: "Good", color: "teal.400" }
    if (validationPassword.filter(i => i === true).length > 1) return { text: "Fair", color: "orange.400" }
    if (validationPassword.filter(i => i === true).length > 0) return { text: "Poor", color: "red.400" }
    return { text: "Password Strength", color: "neutral.500" }
  }

  return (
    <Stack px={6} spacing={4} w="full">
      <Flex onClick={() => setChangeForm("SETTING")} cursor="pointer" mb={4} align="center">
        <Box mr={1} color="accent.500">
          <BiArrowBack size="1.2rem" />
        </Box>
        <Text color="neutral.400">Change password</Text>
      </Flex>
      <Form>
        <FormControl as="fieldset">
          <FormField>
            <InputGroup size="md">
              <CustomInput
                onChange={e => setPassword({ ...password, firstPass: e.target.value })}
                pr="2.5rem"
                type={show.pass2 ? "text" : "password"}
                placeholder="Current Password"
              />
              <InputRightElement width="2.5rem">
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
        <FormControl as="fieldset">
          <FormField>
            <InputGroup size="md">
              <CustomInput
                onChange={e => setPassword({ ...password, firstPass: e.target.value })}
                pr="2.5rem"
                type={show.pass1 ? "text" : "password"}
                placeholder="Password"
              />
              <InputRightElement width="2.5rem">
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
            <Text color={handleStrengthText().color} fontWeight={600} fontSize="xs">
              {handleStrengthText().text}
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
          <FormField>
            <InputGroup size="md">
              <CustomInput
                onChange={e => setPassword({ ...password, firstPass: e.target.value })}
                pr="2.5rem"
                type={show.pass2 ? "text" : "password"}
                placeholder="Re-type New Password"
              />
              <InputRightElement width="2.5rem">
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
        <FormControl as="fieldset">
          <FormField>
            <InputGroup size="md">
              <CustomInput
                onChange={e => setPassword({ ...password, firstPass: e.target.value })}
                pr="2.5rem"
                type={show.pass2 ? "text" : "password"}
                placeholder="Verification Code"
              />
            </InputGroup>
          </FormField>
        </FormControl>
      </Form>
      <Divider pb={2} borderColor="whiteAlpha.100" />
      <HStack justify="center">
        <Button onClick={handleChangeForm} fontSize="md" py={6} fontWeight={600}>
          Update Password
        </Button>
        <Button
          onClick={handleChangeForm}
          variant="secondary"
          colorScheme="neutral"
          border="1px"
          borderColor="neutral.600"
          fontSize="md"
          py={6}
          fontWeight={600}
        >
          Cancel
        </Button>
      </HStack>
    </Stack>
  )
}
