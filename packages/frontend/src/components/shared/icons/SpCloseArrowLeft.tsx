import React from "react"
import { IconBase, IconBaseProps } from "react-icons"

export const SpCloseArrowLeft = ({ color = "white", ...rest }: IconBaseProps) => {
  return (
    <IconBase size="1.1rem" {...rest}>
      <path
        d="M3.33301 5H4.99967V15H3.33301V5ZM11.6663 10.8333H16.6663V9.16667H11.6663V5L6.66634 10L11.6663 15V10.8333Z"
        fill={color}
      />
    </IconBase>
  )
}
