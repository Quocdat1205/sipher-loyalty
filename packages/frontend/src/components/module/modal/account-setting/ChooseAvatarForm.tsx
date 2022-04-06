import React, { useState } from "react"
import { BiArrowBack } from "react-icons/bi"
import InfiniteScroll from "react-infinite-scroll-component"
import { useInfiniteQuery } from "react-query"
import { AspectRatio, Box, Flex, Heading, Image, SimpleGrid, Skeleton, Text } from "@sipher.dev/sipher-ui"

import { Avatar, getAvailableAvatars } from "@api"
import { ChakraModal } from "@components/shared"
import { useAuth } from "src/providers/auth"

interface ChooseAvatarModalProps {
  isOpen: boolean
  onClose: () => void
  onChangeAvatar: (avatarId: string) => void
  onBack: () => void
}

const ChooseAvatarForm = ({ isOpen, onClose, onBack, onChangeAvatar }: ChooseAvatarModalProps) => {
  const { bearerToken } = useAuth()
  const TAKE = 20
  const fetchAvatars = ({ pageParam = 0 }) => getAvailableAvatars(bearerToken, pageParam * TAKE, TAKE)
  const [imageLoaded, setImageLoaded] = useState(false)

  const { data, fetchNextPage, hasNextPage, isFetched } = useInfiniteQuery("available-avatars", fetchAvatars, {
    getNextPageParam: (lastPage, pages) => (lastPage.data.length < TAKE ? undefined : pages.length),
    keepPreviousData: true,
    enabled: !!bearerToken,
  })

  return (
    <ChakraModal
      title={
        <Flex onClick={onBack} cursor="pointer" align="center">
          <Box mr={1} color="accent.500">
            <BiArrowBack size="1.2rem" />
          </Box>
          <Text color="neutral.400">Account Settings</Text>
        </Flex>
      }
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
    >
      <Box px={6} h="30rem" overflow={"auto"} id="scrollContainer">
        <Heading fontSize={"md"} fontWeight={600} mb={4}>
          CHOOSE AVATAR
        </Heading>
        <InfiniteScroll
          dataLength={data ? data.pages[0].total : 0}
          next={fetchNextPage}
          hasMore={!!hasNextPage}
          style={{
            width: "100%",
            overflow: "hidden",
          }}
          scrollableTarget="scrollContainer"
          loader={<Text>Loading</Text>}
        >
          <SimpleGrid spacing={6} columns={4}>
            {data?.pages
              .reduce<Avatar[]>((acc, curr) => [...acc, ...curr.data], [])
              .map(avatar => (
                <AspectRatio key={avatar.id} ratio={1}>
                  <Skeleton
                    isLoaded={isFetched && imageLoaded}
                    border="4px"
                    borderColor={"transparent"}
                    _hover={{ borderColor: "accent.500" }}
                    rounded="lg"
                  >
                    <Image
                      onLoad={() => setImageLoaded(true)}
                      src={avatar.imageUrl}
                      onClick={() => onChangeAvatar(avatar.id)}
                    />
                  </Skeleton>
                </AspectRatio>
              ))}
          </SimpleGrid>
        </InfiniteScroll>
      </Box>
    </ChakraModal>
  )
}

export default ChooseAvatarForm
