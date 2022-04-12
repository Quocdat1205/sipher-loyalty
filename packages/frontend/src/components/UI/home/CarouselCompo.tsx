import React from "react"
import { Autoplay, Navigation, Pagination } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import { Box } from "@sipher.dev/sipher-ui"

import CollectionCard from "../portfolio/collection/CollectionCard"

import usePortFolioHome from "./portfolio/usePortFolioHome"

interface NFTsContainerProps {
  collectionData: ReturnType<typeof usePortFolioHome>["collectionData"][number]
}

const CarouselCompo = ({ collectionData }: NFTsContainerProps) => {
  return (
    <Box>
      <Box
        overflow="hidden"
        pos="relative"
        sx={{
          ".swiper": {
            display: "flex",
            flexDir: "column",
          },
          ".swiper-pagination": { pos: "relative", order: 2, pt: 6 },
          ".swiper-pagination-bullet": {
            mx: "8px!important",
            bg: "whiteAlpha.500",
            w: ["44px", "44px", "88px"],
            h: ["4px", "4px", "8px"],
            rounded: "none",
          },
          ".swiper-pagination-bullet-active": {
            bg: "white",
          },
        }}
      >
        <Swiper
          spaceBetween={20}
          slidesPerView={3}
          slidesPerGroup={3}
          loop={true}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {collectionData.map(item => (
            <SwiperSlide key={item.id}>
              <CollectionCard data={item} isFetched={true} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  )
}
export default CarouselCompo
