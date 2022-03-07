import React from "react";
import { Box, Button, Text, Image } from "@chakra-ui/react";
import { GroupCard, Card } from "@components/UI/navbar/CardDropdown";

const BodyDropdown = () => {
  return (
    <Box width="90%" margin="auto" paddingBottom="2rem">
      <GroupCard>
        <Button
          bg="#F4B433"
          borderRadius="4px"
          width="100%"
          color="black"
          textTransform="uppercase"
        >
          Buy sipher
        </Button>
      </GroupCard>
      <GroupCard>
        <Text color="#9091A0" fontWeight="bold">
          Wallet balance
        </Text>
        <Card>
          <Box display="flex" alignItems="center">
            <Image src="/images/home/eth.png" />
            <Text>ETH</Text>
          </Box>
          <Text>100</Text>
        </Card>
        <Card>
          <Box display="flex" alignItems="center">
            <Image src="/images/home/weth.png" />
            <Text>WETH</Text>
          </Box>
          <Text>100</Text>
        </Card>
        <Card>
          <Box display="flex" alignItems="center">
            <Image src="/images/home/sipher.png" />
            <Text>SIPHER</Text>
          </Box>
          <Text>100</Text>
        </Card>
      </GroupCard>
      <GroupCard>
        <Text color="#9091A0" fontWeight="bold">
          Staking
        </Text>
        <Card>
          <Text>Staked SIPHER</Text>
          <Text>$100</Text>
        </Card>
        <Card>
          <Text>Staked Uniswap LP</Text>
          <Text>$100</Text>
        </Card>
        <Card>
          <Text>Staked Kyber LP</Text>
          <Text>$100</Text>
        </Card>
        <Card>
          <Text>Unclaimed Rewards</Text>
          <Text>$100</Text>
        </Card>
        <Card>
          <Text>Total Earned</Text>
          <Text>$100</Text>
        </Card>
      </GroupCard>
    </Box>
  );
};

export default BodyDropdown;
