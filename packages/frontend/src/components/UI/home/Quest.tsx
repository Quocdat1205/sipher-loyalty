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
import ProgressBar from "./Progress";

const data_fake = [
  {
    id: 1,
    label: "marketplace",
    reward: [{ xp: "10" }],
    expired: "1h18m",
    title: "Sign in to SIPHER Dashboard",
    collected: false,
    count: 1,
    image: "/images/nft/sipher2.png",
  },
  {
    id: 2,
    label: "discord",
    reward: [{ xp: "10" }],
    expired: "1h18m",
    title: "Duis aute irure dolor in reprehenderit.",
    collected: false,
    count: 1,
    image: "/images/nft/sipher1.png",
  },
  {
    id: 3,
    label: "game",
    reward: [{ xp: "10" }],
    expired: "1h18m",
    title: "Excepteur sint occaecat cupidatat non proident sunt in culpa.",
    collected: false,
    count: 1,
    image: "/images/nft/sipher2.png",
  },
  {
    id: 4,
    label: "marketplace",
    reward: [{ xp: "100" }],
    expired: "1h18m",
    title: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet.",
    collected: false,
    count: 1,
    image: "/images/nft/sipher3.png",
  },
  {
    id: 5,
    label: "game",
    reward: [{ xp: "40" }],
    expired: "1h18m",
    title: "Sign in to SIPHER Dashboard",
    collected: false,
    count: 1,
    image: "/images/nft/sipher4.png",
  },
  {
    id: 6,
    label: "marketplace",
    reward: [{ xp: "20" }],
    expired: "1h18m",
    title: "Duis aute irure dolor in reprehenderit.",
    collected: false,
    count: 1,
  },
  {
    id: 7,
    label: "marketplace",
    reward: [{ xp: "30" }],
    expired: "1h18m",
    title: "Sign in to SIPHER Dashboard",
    collected: false,
    count: 1,
  },
];

const Quest = () => {
  return (
    <Box marginTop="2rem">
      <Heading fontWeight="bold" marginTop="0">
        Quest
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
                  bg="rgba(0, 0, 0, 0.7)"
                  borderRadius="4px"
                  zIndex={3}
                >
                  {value.label}
                </Text>
                <Box
                  display="flex"
                  w="90%"
                  justifyContent="space-between"
                  position="absolute"
                  top="40%"
                  left="5%"
                  zIndex={4}
                >
                  <Box className="reward">
                    {value.reward.map((reward, index) => {
                      return (
                        <Text key={index} display="flex">
                          {reward.xp && `${reward.xp}`}
                          <Image src="/images/nft/xp.png" />
                        </Text>
                      );
                    })}
                  </Box>
                  <Box>
                    <Text>{value.expired}</Text>
                  </Box>
                </Box>
              </Box>
              {/* description */}
              <Box width="90%" margin="auto">
                <Box className="description" margin="1rem 0" fontWeight="bold">
                  <Text>{value.title}</Text>
                </Box>
                <Box className="content-fix-bottom">
                  <Box className="progress">
                    <ProgressBar progress={30} height={"40"} />
                  </Box>
                  <Button
                    w="100%"
                    padding="0.5rem"
                    bg="#F4B433"
                    color="text.gray"
                    marginTop="1rem"
                  >
                    Collect
                  </Button>
                </Box>
              </Box>
            </Card>
          );
        })}
      </SimpleGrid>
    </Box>
  );
};

export default Quest;
