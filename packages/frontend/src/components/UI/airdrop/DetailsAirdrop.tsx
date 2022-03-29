import React, { useEffect, useState } from "react"
import Image from "next/image"
import { Box, Button, Flex, HStack, Img, Skeleton, Stack, Text } from "@sipher.dev/sipher-ui"

import { ChakraModal } from "@components/shared"

import { videos } from "../portfolio/nft/NFTCard"

import { useDetailAirdrop } from "./useDetailAirdrop"

export function DetailsAirdrop() {
  const { isOpen, onClose, isFetched, detailAirdrop } = useDetailAirdrop()
  const [imageState, setImageState] = useState({
    front: "/images/airdrops/sipher.png",
    back: "/images/airdrops/sipher.png",
  })
  const extension = detailAirdrop ? detailAirdrop.imageUrls[0]?.default.split(".")[5] : ""
  const [selectedSize, setSelectedSize] = useState("S")
  const [selectedColor, setSelectedColor] = useState("black")

  const handleSize = id => {
    setSelectedSize(id)
  }

  const handleImage = id => {
    if (id === "black" && detailAirdrop) {
      setSelectedColor(id)
      setImageState({
        front: detailAirdrop?.imageUrls.find(item => item.color === id)!.default,
        back: detailAirdrop?.imageUrls.find(item => item.color === id)!.back,
      })
    } else if (id === "white" && detailAirdrop) {
      setSelectedColor(id)
      setImageState({
        front: detailAirdrop?.imageUrls.find(item => item.color === id)!.default,
        back: detailAirdrop?.imageUrls.find(item => item.color === id)!.back,
      })
    }
  }

  useEffect(() => {
    setSelectedColor("black")
    setSelectedSize("S")
  }, [isOpen])

  useEffect(() => {
    if (detailAirdrop)
      setImageState({
        front:
          detailAirdrop?.imageUrls.find(item => item.color === "black")?.default ||
          detailAirdrop?.imageUrls[0]?.default,
        back: detailAirdrop?.imageUrls.find(item => item.color === "black")?.back || detailAirdrop?.imageUrls[0]?.back,
      })
  }, [detailAirdrop])

  return (
    <ChakraModal scrollBehavior="inside" title={""} isOpen={isOpen} onClose={onClose} size="4xl">
      <Flex minH="18rem" p={6} align="flex-start">
        <Skeleton flex={1} isLoaded={isFetched || (detailAirdrop && detailAirdrop?.imageUrls?.length > 0)}>
          <Flex
            sx={{
              video: {
                width: 300,
                height: 300,
              },
            }}
            overflow="hidden"
            h="18rem"
            rounded="lg"
            bg="black"
            align="center"
            justify="center"
            pos="relative"
            role="group"
          >
            {videos.includes(extension) ? (
              <video src={detailAirdrop?.imageUrls[0]?.default} autoPlay loop muted datatype="video/mp4"></video>
            ) : detailAirdrop && detailAirdrop.type === "MERCH" ? (
              <>
                <Img
                  pos="absolute"
                  left={0}
                  transition="opacity 0.7s ease-in-out"
                  src={imageState.back}
                  objectFit="cover"
                  w="full"
                  h="full"
                />
                <Img
                  pos="absolute"
                  left={0}
                  transition="opacity 0.7s ease-in-out"
                  _groupHover={{
                    opacity: !!imageState.back ? 0 : 1,
                  }}
                  src={imageState.front}
                  objectFit="cover"
                  w="full"
                  h="full"
                />
              </>
            ) : (
              <Image quality={100} src={imageState.front} alt="airdrop" width={300} height={300} objectFit="contain" />
            )}
          </Flex>
        </Skeleton>
        <Flex flexDir="column" justify="space-between" minH="18rem" flex={2} ml={4}>
          <Stack spacing={4}>
            <Box>
              <Skeleton isLoaded={isFetched} mb={1}>
                <Text fontWeight={600} fontSize="lg" color="neutral.100">
                  You are eligible for
                </Text>
              </Skeleton>
              <Skeleton isLoaded={isFetched}>
                <Text fontWeight={600} fontSize="2xl">
                  {detailAirdrop?.name}
                </Text>
              </Skeleton>
            </Box>
            <Skeleton isLoaded={isFetched}>
              <Text color="neutral.400">{detailAirdrop?.description}</Text>
            </Skeleton>
            {detailAirdrop?.size && detailAirdrop.size.length > 0 && (
              <Skeleton isLoaded={isFetched}>
                <Flex align="center">
                  <Text mr={6}>Size</Text>
                  <HStack>
                    {detailAirdrop?.size?.map((size, index) => (
                      <Button
                        onClick={() => handleSize(size)}
                        fontWeight={600}
                        bg={selectedSize === size ? "neutral.600" : "transparent"}
                        color={selectedSize === size ? "accent.500" : "white"}
                        border="1px"
                        borderColor="neutral.600"
                        variant="secondary"
                        colorScheme="neutral"
                        boxSize="40px"
                        key={index}
                      >
                        {size}
                      </Button>
                    ))}
                  </HStack>
                </Flex>
              </Skeleton>
            )}
            {detailAirdrop?.color && detailAirdrop.color.length > 0 && (
              <Skeleton isLoaded={isFetched}>
                <Flex align="center">
                  <Text mr={6}>Color</Text>
                  <HStack>
                    {detailAirdrop?.color?.map((color, index) => (
                      <Button
                        textTransform="capitalize"
                        onClick={() => handleImage(color)}
                        fontWeight={600}
                        bg={selectedColor === color ? "neutral.600" : "transparent"}
                        color={selectedColor === color ? "accent.500" : "white"}
                        border="1px"
                        borderColor="neutral.600"
                        variant="secondary"
                        colorScheme="neutral"
                        key={index}
                      >
                        {color}
                      </Button>
                    ))}
                  </HStack>
                </Flex>
              </Skeleton>
            )}
          </Stack>
          <HStack borderTop="1px" borderColor="whiteAlpha.300" pt={4}>
            <Skeleton isLoaded={isFetched} flex={1}>
              <Button isDisabled w="full" py={5} fontSize="md">
                Claim
              </Button>
            </Skeleton>
            <Skeleton isLoaded={isFetched} flex={1}></Skeleton>
          </HStack>
        </Flex>
      </Flex>
    </ChakraModal>
  )
}
