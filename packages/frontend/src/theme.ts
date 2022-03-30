import { extendTheme } from "@chakra-ui/react"
import { sipherThemeExtensions } from "@sipher.dev/sipher-ui"

export const theme = extendTheme({
  ...sipherThemeExtensions,
  styles: {
    global: {
      html: {
        fontSize: ["14px", "14px", "14px", "14px", "16px"],
      },
    },
  },
})
export default theme
