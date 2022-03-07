import React, { RefObject } from "react"
import { BiUpArrowAlt } from "react-icons/bi"
import { IconButton } from "@sipher.dev/sipher-ui"

interface ScrollTopButtonProps {
  bodyRef: RefObject<HTMLInputElement> | null
}

const ScrollTopButton = ({ bodyRef }: ScrollTopButtonProps) => {
  const scrollToTop = () => {
    if (bodyRef && bodyRef.current) {
      bodyRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }
  }

  return (
    <IconButton
      onClick={scrollToTop}
      rounded="base"
      aria-label="setting"
      border="1px"
      borderColor="neutral.600"
      bg="accent.600"
      color="neutral.700"
      icon={<BiUpArrowAlt size="1.4rem" />}
      _focus={{ boxShadow: "none" }}
    />
  )
}

export default ScrollTopButton
