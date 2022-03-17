import React, { useEffect, useState } from "react"
import { BiArrowBack } from "react-icons/bi"
import { Box, Flex, Img, SimpleGrid, Text } from "@sipher.dev/sipher-ui"

interface ChooseAvatarModalProps {
  setChangeForm: (v: string) => void
  setChoose: (src: string) => void
}

interface CardProps {
  active: boolean
  src: string
  onClick: () => void
}

const ImgCard = ({ active, src, onClick }: CardProps) => {
  return (
    <Box
      onClick={onClick}
      rounded="lg"
      border="2px solid"
      borderColor={active ? "accent.600" : "transparent"}
      _hover={{ borderColor: "accent.600" }}
      cursor="pointer"
    >
      <Img src={src} alt="avatar" />
    </Box>
  )
}

export const ChooseAvatarModal = ({ setChoose, setChangeForm }: ChooseAvatarModalProps) => {
  const [selected, setSelected] = useState<number>()

  const handleSelected = (index: number) => {
    setSelected(index)
    setChoose("/images/avatar1.png")
  }

  useEffect(() => {
    setSelected(undefined)
  }, [setChangeForm])

  return (
    <Box px={6}>
      <Flex onClick={() => setChangeForm("SETTING")} cursor="pointer" mb={4} align="center">
        <Box mr={1} color="accent.500">
          <BiArrowBack size="1.2rem" />
        </Box>
        <Text color="neutral.400">Choose NFT</Text>
      </Flex>
      <SimpleGrid pb={2} columns={4} spacing={6}>
        {Array.from(Array(6).keys()).map((i, index) => (
          <ImgCard
            key={i}
            active={index === selected}
            src="/images/avatar1.png"
            onClick={() => handleSelected(index)}
          />
        ))}
      </SimpleGrid>
    </Box>
  )
}
