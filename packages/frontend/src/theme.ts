import { extendTheme } from "@chakra-ui/react"
import { sipherThemeExtensions } from "@sipher.dev/sipher-ui"

export const theme = extendTheme({
  ...sipherThemeExtensions,
  components: {
    Skeleton: {
      defaultProps: {
        startColor: "neutral.600",
        endColor: "neutral.500",
      },
    },
  },
  styles: {
    global: {
      html: {
        fontSize: ["12px", "12px", "14px", "14px", "16px"],
      },
      "*::-webkit-scrollbar": {
        width: "0.5rem",
        height: "0.2rem",
      },
      "@media screen and (min-width: 480px) *::-webkit-scrollbar": {
        height: "0.5rem",
      },
      " *::-webkit-scrollbar-thumb": {
        background: "rgba(255,255,255,0.1)",
      },
      "*::-webkit-scrollbar-track": {
        background: "neutral.700",
      },
    },
  },
})
export default theme
