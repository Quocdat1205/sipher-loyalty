import React from 'react';
import { Box, Flex, FlexboxProps, Heading, Text } from '@sipher.dev/sipher-ui';

import { ConnectWalletUI } from '@components/module/top-navigation-bar/user-info';

export const NotConnectWallet = ({ ...rest }: FlexboxProps) => {
  return (
    <Flex flex={1} pt={16} bg="background.primary" w="full" justify="center" {...rest}>
      <Box w="full" maxW="36rem" rounded="lg" p={4}>
        <Heading mb={2}>Connect your wallet.</Heading>
        <Text mb={8}>Connect with one of our available wallet providers</Text>
        <ConnectWalletUI />
      </Box>
    </Flex>
  );
};
