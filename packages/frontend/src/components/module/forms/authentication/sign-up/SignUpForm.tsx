import React, { useState } from "react"
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
  Flex,
  HStack,
  IconButton,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
} from "@sipher.dev/sipher-ui"
import { useStore } from "@store"
import { useWalletContext } from "@web3"

import { ChakraModal, CustomInput, CustomPopover, Form, FormControl, FormField, WalletCard } from "@components/shared"
import { useChakraToast } from "@hooks"

import FillEmailForm from "./FillEmailForm"
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

interface SignUpFormProps {
  isOpen: boolean
  onClose: () => void
}

const SignUpForm = ({ isOpen, onClose }: SignUpFormProps) => {
  const toast = useChakraToast()
  const [email, setEmail] = useState("")
  const [showVerify, setShowVerify] = useState(false)
  const [showEmailForm, setShowEmailForm] = useState(false)
  const [connectingMethod, setConnectingMethod] = useState<string | null>(null)
  const setAuthFlow = useStore(s => s.setAuthFlow)

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

  const wallet = useWalletContext()

  const handleConnectWallet = async (connectorId: Parameters<typeof wallet["connect"]>["0"]) => {
    setConnectingMethod(connectorId!)
    const account = await wallet.connect(connectorId)

    if (account) {
      try {
        const user = await AtherIdAuth.signIn(account)
        if (user)
          toast({
            status: "error",
            title: "Address is already registered",
          })
        else setShowEmailForm(true)
      } catch (e) {
        setShowEmailForm(true)
      }
    }
    setConnectingMethod(null)
  }

  // show verify form after user has signed up
  if (showVerify) return <VerifySignUpForm email={email} />

  // show email filling form after user connect wallet first
  if (showEmailForm) return <FillEmailForm />

  return (
    <ChakraModal title={"SIGN IN OR CREATE ACCOUNT"} size="lg" isOpen={isOpen} onClose={onClose}>
      <Stack px={6} spacing={6} w="full">
        <Text color="neutral.300">
          Please link crypto-wallet in order to sign in. This will only be used to link to your account. Funds will not
          be withdrawn and no minimum balance required.
        </Text>
        <Form onSubmit={handleSubmit(d => mutate(d))}>
          <FormControl mb={2} as="fieldset">
            <FormField error={errors?.email?.message}>
              <CustomInput
                placeholder="Email address"
                {...register("email", { onChange: e => setEmail(e.target.value) })}
              />
            </FormField>
          </FormControl>
          <FormControl mb={2} as="fieldset">
            <FormField error={errors?.password?.message}>
              <CustomInput pr="2.5rem" type={"password"} placeholder="Password" {...register("password")} />
            </FormField>
          </FormControl>
          <FormControl mb={2} as="fieldset">
            <FormField error={errors?.confirmPassword?.message}>
              <CustomInput pr="2.5rem" type={"password"} placeholder="Password" {...register("confirmPassword")} />
            </FormField>
          </FormControl>
          <Text color="neutral.400">
            I have read and agree to the{" "}
            <Link textDecor="underline" color="cyan.600" isExternal>
              Ather Labs Privacy Policy
            </Link>
          </Text>
          <Button type="submit" fontSize="md" py={6} fontWeight={600} isLoading={isLoading}>
            SIGN UP
          </Button>
        </Form>
        <Flex align="center">
          <Text fontWeight={600} mr={4}>
            or Sign up with
          </Text>
          <Box bg="neutral.600" h="1px" flex={1} />
        </Flex>
        <Flex flexDir="column" pb={2}>
          <Box>
            <Flex mb={2} align="center">
              <Text mr={2} color="neutral.400" fontSize="sm">
                Crypto-Wallet
              </Text>
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
                  <Link
                    isExternal
                    href="https://docs.ethhub.io/using-ethereum/wallets/intro-to-ethereum-wallets/"
                    color="cyan.500"
                    textDecor="underline"
                  >
                    explanation
                  </Link>
                </Text>
              </CustomPopover>
            </Flex>
            <HStack spacing={4}>
              <WalletCard
                text="Metamask"
                bg="white"
                src="/images/icons/wallets/metamask.svg"
                onClick={() => handleConnectWallet("injected")}
                isLoading={connectingMethod === "injected"}
              />
              <WalletCard
                text="ConnectWallet"
                bg="white"
                src="/images/icons/wallets/walletconnect.svg"
                onClick={() => handleConnectWallet("walletConnect")}
                isLoading={connectingMethod === "walletConnect"}
              />
            </HStack>
          </Box>
        </Flex>
        <Text color="neutral.400" textAlign="center">
          Already have an account?{" "}
          <chakra.span textDecor="underline" cursor="pointer" color="cyan.600" onClick={() => setAuthFlow("SIGN_IN")}>
            Sign In
          </chakra.span>
        </Text>
      </Stack>
    </ChakraModal>
  )
}

export default SignUpForm
