import React from "react";
import { Box, Button, Image, Text } from "@chakra-ui/react";

const data = [
  {
    id: 1,
    title: "NEKO SCULPTURE #12",
    description: "Sipherian Flash",
    image: "/images/airdrops/sculpture.png",
  },
  {
    id: 1,
    title: "NEKO SCULPTURE #12",
    description: "Sipherian Flash",
    image: "/images/airdrops/sipher1.png",
  },
  {
    id: 1,
    title: "NEKO SCULPTURE #12",
    description: "Sipherian Flash",
    image: "/images/airdrops/sipher.png",
  },
  {
    id: 1,
    title: "NEKO SCULPTURE #12",
    description: "Sipherian Flash",
    image: "/images/airdrops/sipher1.png",
  },
  {
    id: 1,
    title: "NEKO SCULPTURE #12",
    description: "Sipherian Flash",
    image: "/images/airdrops/sipher.png",
  },
];

const All = () => {
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

export default All;
