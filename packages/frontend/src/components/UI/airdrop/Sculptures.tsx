import React from "react";
import { Box, Image, Text, Button } from "@chakra-ui/react";

const data = [
  {
    id: 1,
    title: "NEKO SCULPTURE #12",
    description: "This Airdrop is limited and applied for Gold & Diamonđ tiers",
    image: "/images/airdrops/sculpture.png",
  },
  {
    id: 2,
    title: "NEKO SCULPTURE #12",
    description: "This Airdrop is limited and applied for Gold & Diamonđ tiers",
    image: "/images/airdrops/sculpture.png",
  },
];

const Sculptures = () => {
  return (
    <Box display="flex" flexWrap="wrap">
      {data.map((value) => {
        return (
          <Box
            key={value.id}
            bg="#292A40"
            borderRadius="8px"
            width="19%"
            boxSizing="border-box"
            overflow="hidden"
            margin="0.5%"
            paddingBottom="1rem"
          >
            <Image src={value.image} width="100%" />
            <Box width="90%" margin="auto" marginTop="1rem">
              <Text textTransform="uppercase" color="#FFFFFF">
                {value.title}
              </Text>
              <Text color="text.gray" margin="1rem 0">
                {value.description}
              </Text>
              <Button
                w="100%"
                textAlign="center"
                color="text.gray"
                fontWeight="bold"
                borderRadius="4px"
                bg="#F4B433"
              >
                Claim
              </Button>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default Sculptures;
