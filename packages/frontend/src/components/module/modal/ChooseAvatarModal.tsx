import React, { useCallback, useState } from "react"
import Cropper from "react-easy-crop"
import { BiArrowBack } from "react-icons/bi"
import Image from "next/image"
import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from "@sipher.dev/sipher-ui"

import getCroppedImg from "./CropImage"

interface ChooseAvatarModalProps {
  setChangeForm: (v: string) => void
}

const dogImg = "/images/avatar1.png"

export const ChooseAvatarModal = ({ setChangeForm }: ChooseAvatarModalProps) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedImage, setCroppedImage] = useState<any>()
  const [croppedAreaPixels, setCroppedAreaPixels] = useState()

  const onCropComplete = useCallback(croppedAreaPixels => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImages = await getCroppedImg(dogImg, croppedAreaPixels)
      console.log("donee", { croppedImage })
      setCroppedImage(croppedImages)
    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels])

  const handleCancel = useCallback(() => {
    setCroppedImage(undefined)
  }, [])

  return (
    <Box textAlign="center" px={6}>
      <Flex onClick={() => setChangeForm("SETTING")} cursor="pointer" mb={4} align="center">
        <Box mr={1} color="accent.500">
          <BiArrowBack size="1.2rem" />
        </Box>
        <Text color="neutral.400">Upload Image</Text>
      </Flex>
      <Flex align="center" justify="center" mb={4} pos="relative" h="24rem">
        {croppedImage ? (
          <Box sx={{ span: { rounded: "full", overflow: "hidden" } }}>
            <Image src={croppedImage} alt="new-image" width={240} height={240} />
          </Box>
        ) : (
          <Cropper
            cropShape="round"
            image={dogImg}
            crop={crop}
            zoom={zoom}
            aspect={3 / 3}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        )}
      </Flex>
      <Flex mb={4} px={12} align="center">
        {!croppedImage && (
          <>
            <Text mr={8}>Zoom</Text>
            <Slider aria-label="slider-ex-1" value={zoom} min={1} max={3} step={0.1} onChange={zoom => setZoom(zoom)}>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </>
        )}
      </Flex>
      <Divider mb={6} borderColor="whiteAlpha.100" />
      {croppedImage ? (
        <HStack spacing={4} justify="center">
          <Button>Save</Button>
          <Button bg="neutral.600" onClick={handleCancel} colorScheme="neutral" variant="secondary">
            Cancel
          </Button>
        </HStack>
      ) : (
        <Button bg="neutral.600" onClick={showCroppedImage} colorScheme="neutral" variant="secondary">
          Crop Photo
        </Button>
      )}
    </Box>
  )
}
