import React from "react"
import Carousel from "react-multi-carousel"
import { DotProps } from "react-multi-carousel/lib/types"
import { Box } from "@sipher.dev/sipher-ui"

import CollectionCard from "../portfolio/collection/CollectionCard"

interface NFTsContainerProps {
  collectionData: any
  responsive: Record<string, any>
}

const CustomDot = ({ onClick, active }: DotProps) => {
  return (
    <Box
      mx={2}
      onClick={e => {
        onClick && onClick()
        e.preventDefault()
      }}
      cursor="pointer"
      bg={active ? "white" : "whiteAlpha.500"}
      w={["44px", "44px", "88px"]}
      h={["4px", "4px", "8px"]}
    />
  )
}

const CarouselCompo = ({ collectionData, responsive }: NFTsContainerProps) => {
  return (
    <Box>
      <Carousel
        additionalTransfrom={0}
        arrows={false}
        swipeable={true}
        draggable={false}
        showDots={true}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={false}
        autoPlay={false}
        keyBoardControl={true}
        containerClass="carousel-container"
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        renderDotsOutside={true}
        customDot={<CustomDot />}
      >
        {collectionData.map(item => (
          <CollectionCard key={item.id} data={item} isFetched={true} />
        ))}
      </Carousel>
    </Box>
  )
}
export default CarouselCompo
