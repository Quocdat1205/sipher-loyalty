import React, { useEffect, useState } from "react"
import { Box, Button, Flex, HStack, Img, Skeleton, Stack, Text } from "@sipher.dev/sipher-ui"

import { ChakraModal } from "@components/shared"
import { SpLayer } from "@components/shared/icons"
import { currency } from "@utils"

import { videos } from "../portfolio/nft/NFTCard"

import { useDetailAirdrop } from "./useDetailAirdrop"

export function DetailsAirdrop() {
  const {
    isOpen,
    onClose,
    isFetched,
    detailAirdrop,
    handleClaim,
    isLoadingClaim,
    isDisabled,
    tokenClaimed,
    claimableAmount,
    buttonText,
  } = useDetailAirdrop()
  const defaultImage = "/images/airdrops/sipher.png"
  const [imageState, setImageState] = useState({
    front: defaultImage,
    back: defaultImage,
  })
  const extension = detailAirdrop ? detailAirdrop.imageUrls[0]?.default.split(".")[5] : ""
  const [selectedSize, setSelectedSize] = useState("S")
  const [selectedColor, setSelectedColor] = useState("black")
  const [imageLoad, setImageLoad] = useState(false)

  const handleSize = id => {
    setSelectedSize(id)
  }

  const handleImage = id => {
    if (id === "black" && detailAirdrop) {
      setSelectedColor(id)
      setImageState({
        front: detailAirdrop?.imageUrls.find(item => item.color === id)!.default ?? defaultImage,
        back: detailAirdrop?.imageUrls.find(item => item.color === id)!.back ?? defaultImage,
      })
    } else if (id === "white" && detailAirdrop) {
      setSelectedColor(id)
      setImageState({
        front: detailAirdrop?.imageUrls.find(item => item.color === id)!.default ?? defaultImage,
        back: detailAirdrop?.imageUrls.find(item => item.color === id)!.back ?? defaultImage,
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
      <Flex pt={6} px={8} minH="28rem" h="full" align="flex-start">
        <Skeleton flex={2} isLoaded={imageLoad && isFetched && detailAirdrop && detailAirdrop?.imageUrls?.length > 0}>
          <Flex
            sx={{
              video: {
                minH: "26rem",
              },
            }}
            overflow="hidden"
            minH="26rem"
            rounded="lg"
            bg={detailAirdrop?.type === "MERCH" ? "white" : "black"}
            align="center"
            justify="center"
            pos="relative"
            role="group"
          >
            {videos.includes(extension) ? (
              <video src={detailAirdrop?.imageUrls[0]?.default} autoPlay loop muted datatype="video/mp4"></video>
            ) : detailAirdrop && detailAirdrop.type === "MERCH" ? (
              <>
                {imageState.back && (
                  <Img
                    pos="absolute"
                    left={0}
                    transition="opacity 0.7s ease-in-out"
                    src={imageState.back}
                    objectFit="contain"
                    alt=""
                    w="full"
                    h="full"
                    onLoad={() => setImageLoad(true)}
                  />
                )}
                <Img
                  pos="absolute"
                  left={0}
                  transition="opacity 0.7s ease-in-out"
                  _groupHover={{
                    opacity: !!imageState.back ? 0 : 1,
                  }}
                  src={imageState.front}
                  objectFit="contain"
                  alt=""
                  w="full"
                  h="full"
                  onLoad={() => setImageLoad(true)}
                />
                <Flex
                  boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
                  align="center"
                  py={0.5}
                  px={1.5}
                  rounded="full"
                  bg="white"
                  pos="absolute"
                  bottom="1rem"
                  left={4}
                >
                  <SpLayer />
                  <Text ml={1} fontSize="xs" color="neutral.900" fontWeight={600}>
                    {detailAirdrop?.quantity}
                  </Text>
                </Flex>
              </>
            ) : (
              <Img
                src={
                  imageState.front ||
                  "https://sipherstorage.s3.ap-southeast-1.amazonaws.com/loyalty/airdrop/sipher_token.png"
                }
                alt="airdrop"
                maxH="26rem"
                objectFit="contain"
                onLoad={() => setImageLoad(true)}
              />
            )}
          </Flex>
        </Skeleton>
        <Flex minH="26rem" flexDir="column" justify="space-between" flex={3} ml={6}>
          <Stack spacing={4}>
            <Box>
              <Skeleton isLoaded={isFetched} mb={1}>
                <Text fontWeight={600} fontSize="lg" color="neutral.100">
                  You are eligible for
                </Text>
              </Skeleton>
              <Skeleton isLoaded={isFetched}>
                <Text fontWeight={600} fontSize="2xl">
                  {detailAirdrop?.type === "TOKEN" ? detailAirdrop?.description[0] : detailAirdrop?.name}
                </Text>
              </Skeleton>
            </Box>
            {detailAirdrop?.type === "TOKEN" && (
              <Skeleton isLoaded={isFetched}>
                {detailAirdrop?.description?.slice(1, detailAirdrop?.description?.length).map(item => (
                  <Text mb={2} key={item} color="neutral.400">
                    {item}
                  </Text>
                ))}
                <Text mb={2} color="neutral.400">
                  Your current claimable amount is {currency(claimableAmount!)} $SIPHER. You can claim every period or
                  claim all at the end of the airdrops (00:00 UTC TUE JUL 19 2022)
                </Text>
                <Text mb={2} color="neutral.400">
                  Your claimed amount: {currency(tokenClaimed ?? 0)} $SIPHER
                </Text>
              </Skeleton>
            )}
            {detailAirdrop?.type !== "TOKEN" && (
              <Skeleton isLoaded={isFetched}>
                {detailAirdrop?.description?.map(item => (
                  <Text mb={2} key={item} color="neutral.400">
                    {item}
                  </Text>
                ))}
              </Skeleton>
            )}
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
              <Skeleton pb={4} isLoaded={isFetched}>
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
              <Button
                onClick={handleClaim}
                isLoading={isLoadingClaim}
                isDisabled={isDisabled}
                w="full"
                py={5}
                fontSize="md"
              >
                {buttonText}
              </Button>
            </Skeleton>
            <Skeleton isLoaded={isFetched} flex={1}></Skeleton>
          </HStack>
        </Flex>
      </Flex>
    </ChakraModal>
  )
}
