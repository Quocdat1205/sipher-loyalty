import { MdInfo } from "react-icons/md"
import { Box, BoxProps, Flex, HStack, Link, Text } from "@sipher.dev/sipher-ui"

import { CustomPopover } from "./CustomPopover"
import { WalletCard } from "./WalletCard"

interface SocialAccountSignInProps extends BoxProps {
  onFacebookSignIn?: () => void
  onGoogleSignIn?: () => void
  onDiscordSignIn?: () => void
  onTwitterSignIn?: () => void
  connectingMethod?: string
}

export const SocialAccountSignIn = ({
  onFacebookSignIn,
  onGoogleSignIn,
  onDiscordSignIn,
  onTwitterSignIn,
  connectingMethod,
  ...rest
}: SocialAccountSignInProps) => {
  return (
    <Box {...rest}>
      <Text mb={2} color="neutral.400" fontSize="sm">
        Social Account
      </Text>
      <HStack spacing={4}>
        <WalletCard
          colorScheme={"messenger"}
          src="/images/icons/facebook.svg"
          onClick={onFacebookSignIn}
          isLoading={connectingMethod === "facebook"}
        />
        <WalletCard
          colorScheme={"red"}
          src="/images/icons/google.svg"
          onClick={onGoogleSignIn}
          isLoading={connectingMethod === "google"}
        />
        <WalletCard
          colorScheme={"blue"}
          src="/images/icons/discord.svg"
          onClick={onDiscordSignIn}
          isLoading={connectingMethod === "discord"}
        />
        <WalletCard
          colorScheme={"twitter"}
          src="/images/icons/twitter.svg"
          onClick={onTwitterSignIn}
          isLoading={connectingMethod === "twitter"}
        />
      </HStack>
    </Box>
  )
}
