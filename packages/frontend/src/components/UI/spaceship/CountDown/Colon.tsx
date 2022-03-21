import { chakra, ChakraProps } from "@sipher.dev/sipher-ui"

type ColonProps = ChakraProps

const Colon = (props: ColonProps) => {
  return (
    <chakra.span mx={1} {...props}>
      {" "}
      :{" "}
    </chakra.span>
  )
}

export default Colon
