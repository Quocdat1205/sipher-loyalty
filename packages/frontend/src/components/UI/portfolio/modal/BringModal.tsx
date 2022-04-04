import React, { Fragment } from "react"
import { useRouter } from "next/router"
import { Box, Button, chakra, Divider, Flex, HStack, Stack, Text } from "@sipher.dev/sipher-ui"

import { ChakraModal } from "@components/shared"
import QuantitySelector from "@components/UI/spaceship/inventory/details/QuantitySelector"
import { padZero } from "@utils"

import useNFTs, { NFTItemProp } from "../nft/useNFTs"

interface BringModalProps {
  isLoading: boolean
  status: string
  handleMint: () => void
  dataMinted: NFTItemProp[]
  dataMint: ReturnType<typeof useNFTs>["nftsDataCheck"]
  isOpen: boolean
  onClose: () => void
}

export const BringModal = ({
  dataMinted,
  dataMint,
  isOpen,
  onClose,
  status,
  handleMint,
  isLoading,
}: BringModalProps) => {
  const router = useRouter()

  return (
    <ChakraModal
      scrollBehavior="inside"
      isCentered
      title={status === "CONFIRM" ? "CONFIRMATION" : status === "SUCCESS" ? "BURN SUCCESSFUL!" : "BURN ERROR"}
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
    >
      <Box px={6}>
        {status === "CONFIRM" ? (
          <Fragment>
            <chakra.table w="full">
              <chakra.thead>
                <chakra.tr>
                  <chakra.th fontSize="sm" py={2} fontWeight={600} textAlign="left">
                    Item(s)
                  </chakra.th>
                  <chakra.th w="40%" fontSize="sm" py={2} fontWeight={600} textAlign="right">
                    Quantity(s)
                  </chakra.th>
                </chakra.tr>
              </chakra.thead>
              <chakra.tbody>
                {dataMint.map(item => (
                  <chakra.tr borderTop="1px" borderColor="whiteAlpha.100" key={item.id}>
                    <chakra.td py={2}>
                      <Flex blendMode="lighten" align="center" sx={{ video: { h: "2rem" } }}>
                        <video src={item.imageUrl} autoPlay loop muted datatype="video/mp4"></video>
                        <Text ml={4}>{item.name}</Text>
                      </Flex>
                    </chakra.td>
                    <chakra.td py={2} w="40%">
                      <QuantitySelector onChange={item.onChange} maxValue={item.minable} value={item.slot} />
                    </chakra.td>
                  </chakra.tr>
                ))}
              </chakra.tbody>
            </chakra.table>
            <Divider borderColor="whiteAlpha.100" mb={2} />
            <Flex mb={6} align="center" justify="flex-end">
              <Flex justify="space-between" w="40%">
                <Text fontWeight={600}>TOTAL QUANTITY: </Text>
                <Text fontWeight={600}>{dataMint.reduce((acc, val) => acc + val.slot, 0)}</Text>
              </Flex>
            </Flex>
            <Stack spacing={2}>
              <Text color="neutral.400">
                Step required to burn Sipher box for the corresponding offchain Lootbox to open and get the digital ship
                parts for building a whole spaceship to be used in game:
              </Text>
              <Text color="neutral.400">
                1. Pay the gas fees to execute the burning transaction (Low fees! We are using Polygon network)
              </Text>
              <Text color="neutral.400">2. Approve the transaction that official burn this NFT</Text>
              <Text color="neutral.400">
                3. You can check the offchain Lootbox{" "}
                <chakra.span onClick={() => router.push("/spaceship?tab=inventory")} cursor="pointer" color="cyan.600">
                  at the inventory tab under Spaceship page
                </chakra.span>
              </Text>
            </Stack>
          </Fragment>
        ) : status === "SUCCESS" ? (
          <Fragment>
            <Text textAlign="center" color="neutral.400">
              You have successfully burn to Lootbox(s).
            </Text>
            {dataMinted.map(item => (
              <Text textAlign="center" color="white" fontWeight={600} key={item.id}>
                {padZero(item.slot, 2)} {item.name}
              </Text>
            ))}
            <Text color="neutral.400" textAlign="center" mt={4}>
              Now you can list your Lootbox on{" "}
              <chakra.span
                onClick={() => router.push("/spaceship?tab=inventory")}
                textDecor="underline"
                color="cyan.600"
              >
                at the inventory tab under Spaceship page
              </chakra.span>
            </Text>
          </Fragment>
        ) : (
          <Text color="neutral.400">Something went wrong. Please try again!</Text>
        )}
        <Divider pt={4} borderColor="whiteAlpha.100" mb={6} />
        <HStack justify="center">
          {status === "CONFIRM" ? (
            <>
              <Button isLoading={isLoading} onClick={handleMint} fontSize="md" size="md" py={5}>
                CONFIRM
              </Button>
              <Button
                onClick={onClose}
                py={5}
                fontSize="md"
                size="md"
                colorScheme="neutral"
                border="1px"
                borderColor="neutral.600"
                variant="secondary"
              >
                Cancel
              </Button>
            </>
          ) : status === "SUCCESS" ? (
            <Fragment>
              <Button
                onClick={() => router.push("/spaceship?tab=inventory")}
                variant="secondary"
                colorScheme="cyan"
                fontSize="md"
                size="md"
                py={5}
              >
                VIEW YOUR LOOTBOX
              </Button>
              <Button onClick={onClose} py={5} fontSize="md" size="md">
                BRING ANOTHER LOOTBOX
              </Button>
            </Fragment>
          ) : (
            <Button
              onClick={onClose}
              py={5}
              fontSize="md"
              size="md"
              colorScheme="neutral"
              border="1px"
              borderColor="neutral.600"
              variant="secondary"
            >
              DONE
            </Button>
          )}
        </HStack>
      </Box>
    </ChakraModal>
  )
}
