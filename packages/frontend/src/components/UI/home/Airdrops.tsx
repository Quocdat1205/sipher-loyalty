import React from "react";
import {
  Box,
  Button,
  Heading,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import Card from "./Card";

const data_fake = [
  {
    id: 1,
    label: "gold",
    reward: [{ xp: "10" }],
    expired: "1h18m",
    title: "Sign in to SIPHER",
    collected: false,
    count: 1,
    image: "/images/nft/sipher2.png",
    description: "This Airdrop is limited and applied for Gold & Diamonđ tiers",
  },
  {
    id: 2,
    label: "dimond",
    reward: [{ xp: "10" }],
    expired: "1h18m",
    title: "hello",
    collected: false,
    count: 1,
    image: "/images/nft/sipher1.png",
    description: "This Airdrop is limited and applied for Gold & Diamonđ tiers",
  },
  {
    id: 3,
    label: "game",
    reward: [{ xp: "10" }],
    expired: "1h18m",
    title: "Excepteur",
    collected: false,
    count: 1,
    image: "/images/nft/sipher2.png",
    description: "This Airdrop is limited and applied for Gold & Diamonđ tiers",
  },
  {
    id: 4,
    label: "marketplace",
    reward: [{ xp: "100" }],
    expired: "1h18m",
    title: "Neque",
    collected: false,
    count: 1,
    image: "/images/nft/sipher3.png",
    description: "This Airdrop is limited and applied for Gold & Diamonđ tiers",
  },
  {
    id: 5,
    label: "game",
    reward: [{ xp: "40" }],
    expired: "1h18m",
    title: "Sign in to SIPHER",
    collected: false,
    count: 1,
    image: "/images/nft/sipher4.png",
    description: "This Airdrop is limited and applied for Gold & Diamonđ tiers",
  },
];

const AirDrops = () => {
  return (
    <Box marginTop="2rem">
      <Heading fontWeight="bold" marginTop="0">
        AirDrops
      </Heading>
      <SimpleGrid display="flex" flexWrap="wrap">
        {data_fake.map((value) => {
          return (
            <Card key={value.id}>
              <Box className="shade">
                {/* <Box
                  className="bg-gradient"
                  bg="linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%), rgba(33, 33, 46, 0.6)"
                  borderRadius="8px 8px 0px 0px"
                  position="absolute"
                  top="0"
                  height="47vh"
                  width="100%"
                  zIndex={2}
                ></Box> */}
                <Image
                  src={value.image ? value.image : "/images/nft/sipher1.png"}
                  width="100%"
                  opacity="0.8"
                  zIndex={1}
                />
                <Text
                  position="absolute"
                  top="5%"
                  left="5%"
                  padding="0.3rem 0.7rem"
                  color={
                    value.label === "gold" || value.label === "dimond"
                      ? "black"
                      : "text.primary"
                  }
                  bg={
                    value.label === "gold"
                      ? "linear-gradient(103.49deg, #FFD337 0%, #FF8F27 100%)"
                      : value.label === "dimond"
                      ? "linear-gradient(103.49deg, #33DDF4 0%, #3375F4 100%)"
                      : "rgba(0, 0, 0, 0.7)"
                  }
                  borderRadius="4px"
                  zIndex={3}
                  textTransform="capitalize"
                  fontWeight="bold"
                >
                  {value.label}
                </Text>
              </Box>
              {/* description */}
              <Box width="90%" margin="auto">
                <Box className="description" margin="1rem 0" fontWeight="bold">
                  <Text textTransform="uppercase">{value.title}</Text>
                </Box>
                <Box>
                  <Text color="#A0A1B1">{value.description}</Text>
                </Box>
                <Button
                  w="100%"
                  padding="0.5rem"
                  bg="#F4B433"
                  color="text.gray"
                  marginTop="1rem"
                >
                  Claim
                </Button>
              </Box>
            </Card>
          );
        })}
      </SimpleGrid>
    </Box>
  );
};

export default AirDrops;
