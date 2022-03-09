import React, { useEffect, useState } from "react"
import { Box, Img, SimpleGrid } from "@sipher.dev/sipher-ui"

import { ChakraModal } from "@components/shared"

interface ChooseAvatarModalProps {
  choose: string
  setChoose: (src: string) => void
  isOpen: boolean
  onClose: () => void
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

export const ChooseAvatarModal = ({ setChoose, isOpen, onClose }: ChooseAvatarModalProps) => {
  const [selected, setSelected] = useState<number>()

  const handleSelected = (index: number) => {
    setSelected(index)
    setChoose("/images/avatar/avatar1.png")
  }

  useEffect(() => {
    setSelected(undefined)
  }, [isOpen])

  return (
    <ChakraModal isCentered title={"CHOOSE NFT"} isOpen={isOpen} onClose={onClose} size="xl">
      <SimpleGrid pb={2} columns={4} spacing={6}>
        {Array.from(Array(6).keys()).map((i, index) => (
          <ImgCard
            key={i}
            active={index === selected}
            src="/images/avatar/avatar1.png"
            onClick={() => handleSelected(index)}
          />
        ))}
      </SimpleGrid>
    </ChakraModal>
  )
}
