import { MdOutlineReportGmailerrorred } from "react-icons/md"
import { Box, BoxProps, Flex, Text } from "@sipher.dev/sipher-ui"

interface FormFieldProps extends BoxProps {
  error?: string
}

export const FormField = ({ error, ...rest }: FormFieldProps) => {
  return (
    <Box {...rest}>
      <Box boxShadow={!!error ? "0 0 0 1px #e53e3e" : ""} rounded={"base"}>
        {rest.children}
      </Box>
      <Box my={1}>
        {error && (
          <Flex color="red.500" fontSize={"xs"} align="center">
            <Box mr="1">
              <MdOutlineReportGmailerrorred size="1rem" />
            </Box>
            <Text>{error}</Text>
          </Flex>
        )}
      </Box>
    </Box>
  )
}
