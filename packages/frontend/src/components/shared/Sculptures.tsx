import React, { useEffect, useState } from "react";
import { Box, Button, Checkbox, Image, Text } from "@chakra-ui/react";
import { IoIosInformationCircle } from "react-icons/io";

const data = [
  {
    id: 1,
    name: "neko sculpture #12",
    label: "Sipherian Flash",
    image: "/images/portfolio/sculpture.png",
    checked: false,
  },
  {
    id: 2,
    name: "neko sculpture #12",
    label: "Sipherian Flash",
    image: "/images/portfolio/sculpture.png",
    checked: false,
  },
  {
    id: 3,
    name: "neko sculpture #12",
    label: "Sipherian Flash",
    image: "/images/portfolio/sculpture.png",
    checked: false,
  },
];

const Sculptures = () => {
  const [list, setList] = useState(data);
  return (
    <Box>
      <Button
        className="choose_all"
        display="flex"
        alignItems="center"
        padding="0.5rem 1rem"
        bg="#45465E"
        borderRadius="4px"
        w="auto"
        justifyContent="space-between"
        _hover={{
          color: "text.gray",
        }}
      >
        <Checkbox width="100%">
          <Text marginLeft="0.3rem">All</Text>
        </Checkbox>
      </Button>
      <Box display="flex" flexWrap="wrap">
        {list &&
          list.map((value) => {
            return (
              <Box
                key={value.id}
                width="19%"
                margin="1rem 0.5rem"
                border="1px solid #292A40"
                borderRadius="8px"
                overflow="hidden"
                paddingBottom="1rem"
                position="relative"
              >
                <Image src={value.image} width="100%" />
                <Checkbox
                  position="absolute"
                  top="3%"
                  right="7%"
                  isChecked={value.checked}
                />
                <Box className="content-sculpture" width="85%" margin="auto">
                  <Text
                    color="#FFFFFF"
                    textTransform="uppercase"
                    margin="0.5rem 0"
                  >
                    {value.name}
                  </Text>
                  <Text color="#9091A0" textTransform="capitalize">
                    {value.label}
                  </Text>
                  <Button
                    bg="#F4B433"
                    color="#1B1C27"
                    margin="0.5rem 0"
                    fontSize="0.8rem"
                    w="100%"
                  >
                    REDEEM SCULPTURE
                  </Button>
                  <Box display="flex" width="100%" alignItems="center">
                    <IoIosInformationCircle />
                    <Text marginLeft="0.5rem" color="#9091A0" fontSize="0.7rem">
                      Redeem in bulk to save on gas fees
                    </Text>
                  </Box>
                </Box>
              </Box>
            );
          })}
      </Box>
    </Box>
  );
};

export default Sculptures;
