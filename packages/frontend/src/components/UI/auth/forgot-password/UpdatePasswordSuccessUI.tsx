import { useRouter } from "next/router"
import { Text } from "@chakra-ui/layout"
import { Box, Button, Heading } from "@sipher.dev/sipher-ui"

const UpdatePasswordSuccessUI = () => {
  const router = useRouter()
  return (
    <Box>
      <Heading fontSize={"lg"} fontWeight={600} mb={8} color="white" textAlign={"center"}>
        PASSWORD UPDATED!
      </Heading>
      <Text color="neutral.300" mb={4}>
        You have successfully updated your account password.
      </Text>

      <Button onClick={() => router.push("/signin")} fontSize="md" py={6} fontWeight={600} w="full" mt={6}>
        SIGN IN
      </Button>
    </Box>
  )
}

export default UpdatePasswordSuccessUI
