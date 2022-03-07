import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import { useNft } from "@hooks";

type nft = {
  id: React.Key | null | undefined;
  image: string | undefined;
  name:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
  label:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
  rank: any;
  price: any;
};
const Nfts = () => {
  const { nft } = useNft();
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      {nft.map((value: nft) => {
        return (
          <Box
            key={value.id}
            width="19%"
            boxSizing="border-box"
            bg="#292A40"
            borderRadius="8px"
            paddingBottom="1rem"
          >
            <Image src={value.image} width="100%" />
            <Box width="80%" margin="auto" marginTop="1rem">
              <Text
                textTransform="uppercase"
                fontSize="1.2rem"
                fontWeight="bold"
              >
                {value.name}
              </Text>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                w="100%"
                margin="0.5rem 0"
              >
                <Text textTransform="capitalize">{value.label}</Text>
                <Text
                  padding="0.2rem 0.3rem"
                  bg="#842DDA"
                >{`# ${value.rank}`}</Text>
              </Box>
              <Box display="flex" alignItems="center">
                <Image src="/images/home/eth.png" />
                <Text
                  marginLeft="1rem"
                  fontSize="1.2rem"
                  fontWeight="bold"
                >{`${value.price} ETH`}</Text>
              </Box>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default Nfts;
