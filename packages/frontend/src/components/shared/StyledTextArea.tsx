import { forwardRef } from "react"
import { BiErrorCircle } from "react-icons/bi"
import { Box, chakra, Flex, Text, TextareaProps as ChakraTextareaProps } from "@sipher.dev/sipher-ui"

interface InputProps extends Omit<ChakraTextareaProps, "size"> {
  label?: string
  required?: boolean
  error?: string
}

export const StyledTextArea = forwardRef<HTMLTextAreaElement, InputProps>(
  ({ label, required = false, error, ...rest }: InputProps, ref) => {
    return (
      <Box pos="relative">
        <Box pos="relative">
          <chakra.textarea
            px={4}
            bg="neutral.600"
            _hover={{ bg: "neutral.500" }}
            color="white"
            h="full"
            w="full"
            pt="1.2rem"
            required
            rounded={"md"}
            transition="all 0.25s ease-out"
            outline="none"
            ref={ref}
            autoComplete="new-password"
            sx={{
              "&:focus + .form-label, &:valid + .form-label, &:placeholder-shown + .form-label": {
                translateY: "-8px",
                fontSize: "xs",
              },
              "&::-ms-reveal": {
                display: "none",
              },
            }}
            {...rest}
            border={error ? "1px" : "0px"}
            borderColor={error ? "red.500" : "neutral.500"}
          />
          <chakra.label
            color="neutral.400"
            pos="absolute"
            bottom={"0%"}
            left={0}
            w="full"
            h="full"
            pointerEvents={"none"}
            className="form-label"
          >
            <chakra.span
              className="label-content"
              pos="absolute"
              left={"1rem"}
              top="0.8rem"
              transform={"auto"}
              transition="all 0.25s ease-out"
            >
              {label}
              {required && (
                <chakra.span color="red.500" ml={1}>
                  *
                </chakra.span>
              )}
            </chakra.span>
          </chakra.label>
        </Box>
        {error && (
          <Flex color="red.500" fontSize={"xs"} mt={1}>
            <Box mr="1">
              <BiErrorCircle size="1rem" />
            </Box>
            <Text>{error}</Text>
          </Flex>
        )}
      </Box>
    )
  },
)

export default StyledTextArea
