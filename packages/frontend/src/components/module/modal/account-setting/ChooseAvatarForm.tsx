import React from "react"
import { BiArrowBack } from "react-icons/bi"
import { useQuery } from "react-query"
import { AspectRatio, Box, Flex, Heading, Image, SimpleGrid, Text } from "@sipher.dev/sipher-ui"

import { getAvailableAvatars } from "@api"
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

  const { data: availableAvatars } = useQuery(
    ["available-avatars", bearerToken],
    () => getAvailableAvatars(bearerToken, 0, 2),
    {
      enabled: !!bearerToken,
      initialData: { data: [], total: 0 },
    },
  )

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
      <Box px={6}>
        <Heading fontSize={"md"} fontWeight={600} mb={4}>
          CHOOSE AVATAR
        </Heading>
        <SimpleGrid columns={4} spacing={4}>
          {availableAvatars?.data.map(avatar => (
            <AspectRatio key={avatar.id} ratio={1}>
              <Box border="4px" borderColor={"transparent"} _hover={{ borderColor: "accent.500" }} rounded="lg">
                <Image src={avatar.imageUrl} onClick={() => onChangeAvatar(avatar.id)} />
              </Box>
            </AspectRatio>
          ))}
        </SimpleGrid>
      </Box>
    </ChakraModal>
  )
}

export default ChooseAvatarForm
