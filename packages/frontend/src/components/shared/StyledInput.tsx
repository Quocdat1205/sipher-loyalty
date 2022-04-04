import { forwardRef, useState } from "react"
import { BiErrorCircle } from "react-icons/bi"
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs"
import { Box, chakra, Flex, InputProps as ChakraInputProps, Text } from "@sipher.dev/sipher-ui"

interface InputProps extends Omit<ChakraInputProps, "size"> {
  label?: string
  required?: boolean
  error?: string
  helperText?: string
}

export const StyledInput = forwardRef<HTMLInputElement, InputProps>(
  ({ label, required = false, error, helperText, isReadOnly, ...rest }: InputProps, ref) => {
    const [isShow, setIsShow] = useState(false)

    return (
      <Box pos="relative">
        <Box h="3rem" pos="relative">
          <chakra.input
            px={4}
            bg={isReadOnly ? "neutral.700" : "neutral.600"}
            _hover={{ bg: "neutral.500" }}
            color="white"
            h="full"
            w="full"
            pt="0.8rem"
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
            isReadOnly={isReadOnly}
            {...rest}
            pointerEvents={rest.isReadOnly ? "none" : "all"}
            type={rest.type === "password" ? (isShow ? "text" : "password") : rest.type}
            border={!isReadOnly ? (error ? "1px" : "0px") : "1px"}
            borderColor={!isReadOnly ? (error ? "red.500" : "neutral.500") : "neutral.600"}
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
          {rest.type === "password" && (
            <Box
              pos="absolute"
              right={4}
              top="50%"
              transform={"auto"}
              translateY="-50%"
              color="neutral.400"
              cursor={"pointer"}
              onClick={() => setIsShow(!isShow)}
              zIndex={2}
            >
              {isShow ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
            </Box>
          )}
        </Box>
        {helperText && !error && (
          <Text fontSize={"xs"} mt={1} color="neutral.500">
            {helperText}
          </Text>
        )}
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

export default StyledInput
