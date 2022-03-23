import React, { Fragment } from "react"
import Image from "next/image"
import { useRouter } from "next/router"
import { Button, chakra, Divider, Flex, Text } from "@sipher.dev/sipher-ui"

import { ChakraModal } from "@components/shared/ChakraModal"

interface ClaimStatusModalProp {
  isOpen: boolean
  onClose: () => void
  status: string
}

const ClaimStatusModal = ({ isOpen, onClose, status }: ClaimStatusModalProp) => {
  const router = useRouter()

  return (
    <ChakraModal
      isCentered
      title={status === "SUCCESS" ? "CLAIM SUCCESSFUL!" : "CLAIM FAILED!"}
      isOpen={isOpen}
      onClose={onClose}
      size="md"
    >
      <Flex flexDir="column" align="center" px={6}>
        <Image src="/images/spaceship/box-1.png" alt="box" height={400} width={400} />
        <Text textAlign="center" py={4} color="grey.400">
          {status === "SUCCESS" ? (
            <Fragment>
              You can check the claimed box(es) at the{" "}
              <chakra.span
                cursor="pointer"
                textDecor="underline"
                color="cyan.500"
                onClick={() => router.push({ query: { tab: "inventory" } })}
              >
                Inventory
              </chakra.span>{" "}
              tab
            </Fragment>
          ) : (
            "Something went wrong, please try after sometime!"
          )}
        </Text>
        <Divider mb={4} borderColor="whiteAlpha.100" />
        <Button w="10rem" onClick={onClose}>
          Done
        </Button>
      </Flex>
    </ChakraModal>
  )
}

export default ClaimStatusModal
