import React, { Fragment } from "react"
import Image from "next/image"
import { useRouter } from "next/router"
import { Box, Button, chakra, Divider, Flex, HStack, Link, Text } from "@sipher.dev/sipher-ui"

import { ChakraModal } from "@components/shared"
import { padZero } from "@utils"

import QuantitySelector from "./details/QuantitySelector"
import { InventoryProps, useInventory } from "./useInventory"

interface MintModalProps {
  isLoading: boolean
  status: string
  handleMint: () => void
  dataMinted: InventoryProps[]
  dataMint: ReturnType<typeof useInventory>["inventoryDataCheck"]
  isOpen: boolean
  onClose: () => void
}

export const MintModal = ({ dataMinted, dataMint, isOpen, onClose, status, handleMint, isLoading }: MintModalProps) => {
  const router = useRouter()

  return (
    <ChakraModal
      scrollBehavior="inside"
      isCentered
      title={
        status === "MINT"
          ? "CONFIRMATION"
          : status === "SUCCESS"
          ? "MINT SUCCESSFUL!"
          : status === "PENDING"
          ? "REJECT MINTING NFT !"
          : "MINT ERROR"
      }
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
    >
      <Box px={6}>
        {status === "MINT" ? (
          <Fragment>
            <chakra.table w="full">
              <chakra.thead>
                <chakra.tr>
                  <chakra.th fontSize="sm" py={2} fontWeight={600} textAlign="left">
                    Item(s)
                  </chakra.th>
                  <chakra.th fontSize="sm" py={2} fontWeight={600} textAlign="right">
                    Quantity(s)
                  </chakra.th>
                </chakra.tr>
              </chakra.thead>
              <chakra.tbody>
                {dataMint.map(item => (
                  <chakra.tr borderTop="1px" borderColor="whiteAlpha.100" key={item.id}>
                    <chakra.td py={2}>
                      <Flex align="center">
                        <Image
                          src={item.propertyLootbox.image ?? ""}
                          alt={item.propertyLootbox.name}
                          width={50}
                          height={30}
                        />
                        <Text ml={4}>{item.propertyLootbox.name}</Text>
                      </Flex>
                    </chakra.td>
                    <chakra.td py={2}>
                      <QuantitySelector
                        onChange={item.onChange}
                        minValue={1}
                        maxValue={item.mintable}
                        value={item.slot}
                      />
                    </chakra.td>
                  </chakra.tr>
                ))}
              </chakra.tbody>
            </chakra.table>
            <Divider borderColor="whiteAlpha.100" mb={2} />
            <Flex mb={6} align="center" justify="flex-end">
              <Text fontWeight={600}>TOTAL QUANTITY: {dataMint.reduce((acc, val) => acc + val.slot, 0)}</Text>
            </Flex>
            <Text mb={4} color="neutral.400">
              Minting Lootbox(es) to NFT(s) will be processed on Polygon and require you to change Blockchain network.
              For more information, please check{" "}
              <Link textDecor="underline" isExternal color="cyan.600">
                here.
              </Link>
            </Text>
            <Text color="neutral.400">
              After "Confirm", your items will be moved to the "Pending" section. It will require an on-chain
              transaction to cancel pending items, otherwise, you have to wait 3 days for the pending order to be
              automatically canceled.
            </Text>
          </Fragment>
        ) : status === "SUCCESS" ? (
          <Fragment>
            <Text textAlign="center" color="neutral.400">
              You have successfully minted to NFT(s).
            </Text>
            {dataMinted.map(item => (
              <Text textAlign="center" color="white" fontWeight={600} key={item.id}>
                {padZero(item.slot, 2)} {item.propertyLootbox.name}
              </Text>
            ))}
            <Text color="neutral.400" textAlign="center" mt={4}>
              Now you can list your NFT(s) on{" "}
              <Link href="https://opensea.io/assets" textDecor="underline" isExternal color="cyan.600">
                Marketplace{" "}
              </Link>
              for trading.
            </Text>
          </Fragment>
        ) : status === "PENDING" ? (
          <Text color="neutral.400">
            You have rejected minting NFT and this request will take 3 days to process. You can check it at the
            "Pending" section and cancel request by clicking STOP button and it will require an on-chain transaction to
            execute.
          </Text>
        ) : (
          <Text color="neutral.400">Something went wrong. Please try again!</Text>
        )}
        <Divider pt={4} borderColor="whiteAlpha.100" mb={6} />
        <HStack justify="center">
          {status === "MINT" ? (
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
                onClick={() => window.open("https://opensea.io/assets", "_blank")}
                variant="secondary"
                colorScheme="cyan"
                fontSize="md"
                size="md"
                py={5}
              >
                VIEW YOUR NFT
              </Button>
              <Button onClick={onClose} py={5} fontSize="md" size="md">
                MINT ANOTHER NFT
              </Button>
            </Fragment>
          ) : status === "PENDING" ? (
            <Fragment>
              <Button
                variant="secondary"
                colorScheme="cyan"
                onClick={() => router.push({ query: { tab: "pending" } })}
                fontSize="md"
                size="md"
                py={5}
              >
                VIEW PENDING LIST
              </Button>
              <Button onClick={onClose} py={5} fontSize="md" size="md">
                MINT ANOTHER NFT
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
