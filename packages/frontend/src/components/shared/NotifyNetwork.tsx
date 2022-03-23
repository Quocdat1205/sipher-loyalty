import React, { Fragment, useEffect, useState } from "react"
import { chakra, CloseButton, Flex, Text } from "@sipher.dev/sipher-ui"
import { useWalletContext } from "@web3"

interface NotifyNetworkProps {
  chainId: number
  title: string
}

export const NotifyNetwork = ({ chainId, title }: NotifyNetworkProps) => {
  const { chainId: chainIdCurrent, switchNetwork, account } = useWalletContext()
  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => {
    if (chainIdCurrent && chainIdCurrent !== chainId) setIsOpen(true)
  }, [account, chainIdCurrent])

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
