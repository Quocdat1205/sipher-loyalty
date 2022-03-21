import { useState } from "react"
import { BiRefresh } from "react-icons/bi"
import { BsArrowRightShort } from "react-icons/bs"
import { IoMdClose, IoMdSettings } from "react-icons/io"
import { IoPersonCircle } from "react-icons/io5"
import { useMutation } from "react-query"
import { useRouter } from "next/router"
import {
  Avatar,
  Box,
  Button,
  chakra,
  Divider,
  Flex,
  HStack,
  IconButton,
  ScaleFade,
  Stack,
  Text,
} from "@sipher.dev/sipher-ui"
import { useWalletContext } from "@web3"

import { AccountModal, BuySipherModal } from "@components/module/modal"
import { EthereumIcon, SipherIcon } from "@components/shared"
import { ClipboardCopy } from "@components/shared/ClipboardCopy"
import { shortenAddress } from "@utils"
import { useAuth } from "src/providers/auth"

import OptionCard from "./OptionCard"

interface UserInfoDropdownProps {
  isOpen: boolean
  onClose: () => void
}

const UserInfoDropdown = ({ isOpen, onClose }: UserInfoDropdownProps) => {
  const router = useRouter()
  const wallet = useWalletContext()
  const [modal, setModal] = useState("")

  const { signOut } = useAuth()

  const { mutate: mutateSignOut, isLoading } = useMutation(signOut, {
    onSuccess: () => {
      onClose()
    },
  })

  return (
    <Box
      pos="absolute"
      transform={"auto"}
      top={"100%"}
      right={0}
      translateY={"0.5rem"}
      zIndex={"modal"}
      overflow="auto"
      maxH={["35rem", "unset"]}
    >
      <ScaleFade in={isOpen}>
        <Flex
          w="20rem"
          direction={"column"}
          align="center"
          rounded="md"
          background="neutral.700"
          boxShadow={"0px 34px 60px 0px #00000099"}
          p={6}
          zIndex={"modal"}
          pos="relative"
        >
          <IconButton
            pos="absolute"
            right={4}
            top={4}
            bg="transparent"
            _focus={{ boxShadow: "none" }}
            _hover={{ bg: "none" }}
            _active={{ bg: "none" }}
            color="neutral.400"
            aria-label="close"
            onClick={onClose}
            icon={<IoMdClose size="1.5rem" />}
          />
          <Stack mb={4} w="full" align="center" spacing={4}>
            <Avatar size="lg" bg="gray" />
            <Text fontWeight={600} fontSize="lg">
              Unnamed
            </Text>
            <Flex>
              <Flex align="center" p={2} rounded="base" border="1px" borderColor="neutral.600">
                <Text mr={4}>{shortenAddress(wallet.account)}</Text>
                <ClipboardCopy color="#E7E7ED" text={wallet.account ?? ""} />
              </Flex>
              <IconButton
                ml={2}
                onClick={() => setModal("SETTING")}
                boxSize="40px"
                rounded="base"
                color="neutral.50"
                _focus={{ boxShadow: "none" }}
                _hover={{ bg: "accent.600", color: "neutral.900" }}
                aria-label="setting"
                border="1px"
                borderColor="neutral.600"
                bg="transparent"
                icon={<IoMdSettings size="1.4rem" />}
              />
            </Flex>
            <HStack w="full" justify="center" spacing={2}>
              <Flex align="center">
                <SipherIcon />
                <Text ml={2} fontWeight={500} color="neutral.400">
                  0.14
                </Text>
              </Flex>
              <Box color="neutral.500">
                <BsArrowRightShort size="1.5rem" />
              </Box>
              <Flex align="center">
                <EthereumIcon size="1.4rem" />
                <Text fontWeight={500} color="neutral.400">
                  0.14
                </Text>
              </Flex>
            </HStack>
            <Button w="full" onClick={() => setModal("BUY_SIPHER")}>
              BUY SIPHER
            </Button>
          </Stack>
          <Divider borderColor="neutral.600" mb={4} />
          <Box mb={4} w="full">
            <Text mb={4} fontWeight={600} color="neutral.400">
              Wallet Balance
            </Text>
            <Stack w="full">
              <Flex align="center" justify="space-between">
                <Flex align="center">
                  <Box textAlign="center" w="1.5rem">
                    <EthereumIcon size="1.4rem" />
                  </Box>
                  <Text ml={2}>ETH</Text>
                </Flex>
                <Text>
                  0.14 <chakra.span color="neutral.400">($1,056)</chakra.span>
                </Text>
              </Flex>
              <Flex align="center" justify="space-between">
                <Flex align="center">
                  <Box textAlign="center" w="1.5rem">
                    <EthereumIcon isWETH size="1.4rem" />
                  </Box>
                  <Text ml={2}>WETH</Text>
                </Flex>
                <Text>
                  0.14 <chakra.span color="neutral.400">($1,056)</chakra.span>
                </Text>
              </Flex>
              <Flex align="center" justify="space-between">
                <Flex align="center">
                  <Box textAlign="center" w="1.5rem">
                    <SipherIcon size="1.4rem" />
                  </Box>
                  <Text ml={2}>SIPHER</Text>
                </Flex>
                <Text>
                  0.14 <chakra.span color="neutral.400">($1,056)</chakra.span>
                </Text>
              </Flex>
            </Stack>
          </Box>
          <Divider borderColor="neutral.600" mb={4} />
          <Stack mb={4} w="full" align="flex-start">
            <OptionCard
              name="My Profile"
              icon={<IoPersonCircle size="1.5rem" />}
              onClick={() => router.push("/profile/inventory")}
            />
            <OptionCard name="ETH / WETH Station" icon={<BiRefresh size="1.5rem" />} />
          </Stack>
          <Button
            onClick={() => mutateSignOut()}
            isLoading={isLoading}
            w="full"
            color="white"
            _hover={{ bg: "red.300" }}
            backgroundColor="red.400"
            rounded="base"
          >
            SIGN OUT
          </Button>
        </Flex>
        <AccountModal isOpen={modal === "SETTING"} onClose={() => setModal("")} />
        <BuySipherModal isOpen={modal === "BUY"} onClose={() => setModal("")} />
      </ScaleFade>
    </Box>
  )
}

export default UserInfoDropdown
