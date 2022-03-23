import { useState } from "react"
import { FieldValues, useForm } from "react-hook-form"
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs"
import { MdInfo } from "react-icons/md"
import { useMutation } from "react-query"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import AtherIdAuth from "@sipher.dev/ather-id"
import {
  Box,
  Button,
  chakra,
  Divider,
  Flex,
  FormControl,
  IconButton,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
} from "@sipher.dev/sipher-ui"

import { ChakraModal, CustomInput, CustomPopover, Form, FormField } from "@components/shared"
import { useChakraToast } from "@hooks"

import VerifySignUpForm from "./VerifySignUpForm"

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Must be a valid email address"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/,
      "Must contain at least 8 characters, one uppercase, one number and one special character",
    ),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
})

const FillEmailForm = () => {
  const [show, setShow] = useState(false)
  const [showVerify, setShowVerify] = useState(false)
  const toast = useChakraToast()
  const [email, setEmail] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) })

  const { mutate, isLoading } = useMutation<unknown, unknown, FieldValues>(
    data => AtherIdAuth.signUp(data.email, data.password),
    {
      onSuccess: () => setShowVerify(true),
      onError: (e: any) =>
        toast({
          status: "error",
          title: "Error",
          message: e.message || "Something went wrong!",
        }),
    },
  )

  if (showVerify) return <VerifySignUpForm email={email} isWalletConnected={true} />

  return (
    <ChakraModal title={"YOU ARE ALMOST THERE"} size="lg" isOpen={true} hideCloseButton={true}>
      <Form onSubmit={handleSubmit(d => mutate(d))}>
        <Stack pos="relative" px={6} spacing={4} w="full">
          <Flex display="inline-block" align="center">
            <Text mr={2} color="neutral.400" fontSize="sm">
              You will need to fill in your email and password to enable{" "}
              <chakra.span sx={{ ">div": { display: "inline-block" } }} textDecor="underline" color="cyan.600">
                Ather Account{" "}
                <CustomPopover
                  placement="top"
                  label="Crypto-wallet"
                  icon={
                    <Box color="neutral.500">
                      <MdInfo size="1.2rem" />
                    </Box>
                  }
                >
                  <Text fontSize="sm" color="neutral.900">
                    Wallets are used to send, receive, and store digital assets like Ether. Wallets come in many forms.
                    For more infomation about wallets, see this{" "}
                    <chakra.span color="cyan.500" textDecor="underline">
                      explanation
                    </chakra.span>
                  </Text>
                </CustomPopover>
              </chakra.span>
            </Text>
          </Flex>
          <FormControl as="fieldset">
            <FormField error={errors.email}>
              <CustomInput
                placeholder="Email address"
                {...register("email", { onChange: e => setEmail(e.target.value) })}
              />
            </FormField>
          </FormControl>
          <FormControl mb={2} as="fieldset">
            <FormField error={errors.password}>
              <InputGroup size="md">
                <CustomInput
                  pr="2.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Password"
                  {...register("password")}
                />
                <InputRightElement width="2.5rem">
                  <IconButton
                    variant="ghost"
                    aria-label="eye-icon"
                    color="neutral.400"
                    _hover={{ bg: "neutral.500" }}
                    _active={{ bg: "neutral.500" }}
                    icon={show ? <BsEyeSlashFill size="1rem" /> : <BsEyeFill size="1rem" />}
                    size="sm"
                    h="1.75rem"
                    onClick={() => setShow(!show)}
                  />
                </InputRightElement>
              </InputGroup>
            </FormField>
          </FormControl>
          <FormControl mb={2} as="fieldset">
            <FormField error={errors.confirmPassword}>
              <InputGroup size="md">
                <CustomInput
                  pr="2.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Password"
                  {...register("confirmPassword")}
                />
                <InputRightElement width="2.5rem">
                  <IconButton
                    variant="ghost"
                    aria-label="eye-icon"
                    color="neutral.400"
                    _hover={{ bg: "neutral.500" }}
                    _active={{ bg: "neutral.500" }}
                    icon={show ? <BsEyeSlashFill size="1rem" /> : <BsEyeFill size="1rem" />}
                    size="sm"
                    h="1.75rem"
                    onClick={() => setShow(!show)}
                  />
                </InputRightElement>
              </InputGroup>
            </FormField>
          </FormControl>
          <Button fontSize="md" py={6} fontWeight={600} type="submit" isLoading={isLoading}>
            CONTINUE
          </Button>
        </Stack>
      </Form>
    </ChakraModal>
  )
}

export default FillEmailForm
