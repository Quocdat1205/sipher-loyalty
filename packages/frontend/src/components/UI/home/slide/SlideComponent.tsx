import React from "react"
import { Autoplay, Navigation, Pagination } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import { Box } from "@sipher.dev/sipher-ui"

import SlideFrame from "./SlideFrame"

const SlideComponent = ({ data }) => {
  return (
    <Box overflow="hidden" pos="relative" sx={{ ".mySwiper": { width: "100vw", h: "100%" } }}>
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
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
        {data.map(item => (
          <SwiperSlide key={item.title}>
            <SlideFrame {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  )
}
export default SlideComponent
