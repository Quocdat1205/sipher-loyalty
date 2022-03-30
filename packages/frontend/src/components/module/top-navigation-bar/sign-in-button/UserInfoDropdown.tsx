import { BiHeadphone } from "react-icons/bi"
import { BsArrowRightShort } from "react-icons/bs"
import { IoMdClose, IoMdSettings } from "react-icons/io"
import { RiEarthFill } from "react-icons/ri"
import { useMutation } from "react-query"
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

import { EthereumIcon, SipherIcon } from "@components/shared"
import { ClipboardCopy } from "@components/shared/ClipboardCopy"
import { useBalanceContext } from "@hooks"
import { currency, shortenAddress } from "@utils"
import { useAuth } from "src/providers/auth"

import OptionCard from "./OptionCard"

interface UserInfoDropdownProps {
  isOpen: boolean
  onClose: () => void
  onSettingClick: () => void
  onBuySipherClick: () => void
}

export const UserInfoDropdown = ({ isOpen, onClose, onSettingClick, onBuySipherClick }: UserInfoDropdownProps) => {
  const { account, reset } = useWalletContext()
  const {
    dataPrice,
    balance: { chainPrice, sipher, weth },
  } = useBalanceContext()

  const { signOut, userProfile } = useAuth()

  const { mutate: mutateSignOut, isLoading } = useMutation(signOut, {
    onSuccess: () => {
      onClose()
      reset()
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
      <ScaleFade in={isOpen} unmountOnExit>
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
            icon={<IoMdClose size="1.2rem" />}
          />
          <Stack mb={4} w="full" align="center" spacing={4}>
            <Avatar
              size="lg"
              bg="gray"
              src={userProfile?.user.avatarImage}
              name={userProfile?.user.name}
              bgGradient="linear(to-l, #FCD11F, #DF6767, #200B9F)"
            />
            <Text fontWeight={600} fontSize="lg">
              {userProfile?.user.name}
            </Text>
            <Flex>
              <Flex align="center" h="40px" rounded="base" border="1px" borderColor="neutral.600" px={2}>
                <Text mr={4}>{shortenAddress(account)}</Text>
                <ClipboardCopy color="#E7E7ED" text={account ?? ""} />
              </Flex>
              <IconButton
                ml={2}
                onClick={onSettingClick}
                boxSize="40px"
                rounded="base"
                aria-label="setting"
                colorScheme={"neutral"}
                variant="secondary"
                border="1px"
                borderColor="neutral.600"
                bg="transparent"
                icon={<IoMdSettings size="1.4rem" />}
              />
            </Flex>
            <HStack w="full" justify="center" spacing={2}>
              <Flex align="center">
                <SipherIcon />
                <Text ml={2} fontWeight={500} color="neutral.100">
                  1
                </Text>
              </Flex>
              <Box color="neutral.500">
                <BsArrowRightShort size="1.5rem" />
              </Box>
              <Flex align="center">
                <EthereumIcon size="1.4rem" />
                <Text fontWeight={500} color="neutral.100">
                  {currency(dataPrice!.sipherPrice.usd / dataPrice!.ethereumPrice.usd, "", {
                    maximumFractionDigits: 5,
                  })}{" "}
                  (${currency(dataPrice!.sipherPrice.usd)})
                </Text>
              </Flex>
            </HStack>
            <Button w="full" onClick={onBuySipherClick}>
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
                <Text fontWeight={600}>
                  {currency(chainPrice)}{" "}
                  <chakra.span color="neutral.400" fontWeight={400}>
                    (${currency(chainPrice * dataPrice!.ethereumPrice.usd)})
                  </chakra.span>
                </Text>
              </Flex>
              <Flex align="center" justify="space-between">
                <Flex align="center">
                  <Box textAlign="center" w="1.5rem">
                    <EthereumIcon isWETH size="1.4rem" />
                  </Box>
                  <Text ml={2}>WETH</Text>
                </Flex>
                <Text fontWeight={600}>
                  {currency(weth)}{" "}
                  <chakra.span fontWeight={400} color="neutral.400">
                    (${currency(weth * dataPrice!.ethereumPrice.usd)})
                  </chakra.span>
                </Text>
              </Flex>
              <Flex align="center" justify="space-between">
                <Flex align="center">
                  <Box textAlign="center" w="1.5rem">
                    <SipherIcon pl={0.5} />
                  </Box>
                  <Text ml={2}>SIPHER</Text>
                </Flex>
                <Text fontWeight={600}>
                  {currency(sipher)}{" "}
                  <chakra.span fontWeight={400} color="neutral.400">
                    (${currency(sipher * dataPrice!.sipherPrice.usd)})
                  </chakra.span>
                </Text>
              </Flex>
            </Stack>
          </Box>
          <Divider borderColor="neutral.600" mb={4} />
          <Stack mb={4} w="full" align="flex-start">
            <OptionCard
              name="Sipher Home Page"
              icon={<RiEarthFill size="1.4rem" />}
              onClick={() => window.open("https://sipher.xyz/", "_blank")}
            />
            <OptionCard
              name="Support"
              icon={<BiHeadphone size="1.4rem" />}
              onClick={() => window.open("mailto:hello@sipher.xyz")}
            />
          </Stack>
          <Button
            isLoading={isLoading}
            onClick={() => mutateSignOut()}
            w="full"
            color="white"
            colorScheme={"red"}
            rounded="base"
          >
            SIGN OUT
          </Button>
        </Flex>
      </ScaleFade>
    </Box>
  )
}

export default UserInfoDropdown
