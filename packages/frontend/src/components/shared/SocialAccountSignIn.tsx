import { Box, BoxProps, HStack, Text } from "@sipher.dev/sipher-ui"

import { WalletCard } from "./WalletCard"

interface SocialAccountSignInProps extends BoxProps {
  onFacebookSignIn?: () => void
  onGoogleSignIn?: () => void
  onDiscordSignIn?: () => void
  onTwitterSignIn?: () => void
  connectingMethod?: string
  displayLabel?: boolean
}

export const SocialAccountSignIn = ({
  onFacebookSignIn,
  onGoogleSignIn,
  onDiscordSignIn,
  onTwitterSignIn,
  connectingMethod,
  displayLabel = false,
  ...rest
}: SocialAccountSignInProps) => {
  return (
    <Box {...rest}>
      {displayLabel && (
        <Text mb={2} color="neutral.400" fontSize="sm">
          Social Account
        </Text>
      )}
      <HStack spacing={4}>
        {onFacebookSignIn && (
          <WalletCard
            colorScheme={"messenger"}
            src="/images/icons/facebook.svg"
            onClick={onFacebookSignIn}
            isLoading={connectingMethod === "facebook"}
          />
        )}
        {onGoogleSignIn && (
          <WalletCard
            colorScheme={"red"}
            src="/images/icons/google.svg"
            onClick={onGoogleSignIn}
            isLoading={connectingMethod === "google"}
          />
        )}
        {onDiscordSignIn && (
          <WalletCard
            colorScheme={"blue"}
            src="/images/icons/discord.svg"
            onClick={onDiscordSignIn}
            isLoading={connectingMethod === "discord"}
          />
        )}
        {onTwitterSignIn && (
          <WalletCard
            colorScheme={"twitter"}
            src="/images/icons/twitter.svg"
            onClick={onTwitterSignIn}
            isLoading={connectingMethod === "twitter"}
          />
        )}
      </HStack>
    </Box>
  )
}
