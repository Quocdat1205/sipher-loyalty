import React, { Fragment, useEffect, useState } from "react"
import { chakra, CloseButton, Flex, Text } from "@sipher.dev/sipher-ui"
import useWeb3Wallet from "@web3-wallet"

interface NotifyNetworkProps {
  chainId: number
}

const chainName = [
  {
    id: 1,
    name: "Ethereum Mainnet",
  },
  {
    id: 4,
    name: "Ethereum Testnet",
  },
  {
    id: 137,
    name: "Polygon Mainnet",
  },
  {
    id: 80001,
    name: "Polygon Testnet",
  },
]

export const NotifyNetwork = ({ chainId }: NotifyNetworkProps) => {
  const [changeId, setChangeId] = useState(chainId)
  const { chain, switchNetwork, account } = useWeb3Wallet()
  const [isOpen, setIsOpen] = useState(false)
  const title = chainName.find(i => i.id === chainId)?.name
  useEffect(() => {
    setChangeId(chainId)
    if (chain?.id && chain.id !== changeId && changeId) setIsOpen(true)
  }, [account, chain?.id, changeId])

  return (
    <Fragment>
      {isOpen && (
        <Flex
          align="center"
          justify="center"
          p={2}
          textAlign="center"
          w="full"
          pos="absolute"
          top="0"
          zIndex={2}
          bg="accent.500"
        >
          <Text mr={2} fontSize="xs" fontWeight={600} color="neutral.900">
            You're viewing data from the {title} network.To use Sipher Loyalty, please switch to{" "}
            <chakra.span onClick={() => switchNetwork(chainId)} textDecor="underline" cursor="pointer" color="cyan.700">
              {title}
            </chakra.span>
          </Text>
          <CloseButton size="sm" color="neutral.900" onClick={() => setIsOpen(false)} />
        </Flex>
      )}
    </Fragment>
  )
}
