import React from "react";
import {
  IoIosCopy,
  IoIosSettings,
  IoMdArrowRoundForward,
} from "react-icons/io";
import { Box, Image, Text, useDisclosure } from "@chakra-ui/react";
import { useMetaMask } from "@hooks";
import ModalAccountsetting from "./ModalAccountsetting";

const GeneralInfo = () => {
  const { account } = useMetaMask();
  const { onOpen, isOpen, onClose } = useDisclosure();

  return (
    <Box width="65%" margin="auto" marginTop="1.5rem" textAlign="center">
      <Image
        src="/images/nft/sipher2.png"
        width="50%"
        borderRadius="50%"
        margin="auto"
      />
      <Text margin="0.7rem" fontSize="1.3rem" fontWeight="bold">
        Tamarine
      </Text>
      <Box display="flex" alignItems="center" justifyContent="space-around">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          border="1px solid #45465E"
          borderRadius="4px"
          padding="0.5rem"
          cursor="pointer"
          marginRight="1rem"
        >
          <Text marginRight="0.5rem">
            {`${account.slice(0, 5)}...${account.slice(
              account.length - 5,
              account.length
            )}`}
          </Text>
          <IoIosCopy fontSize="1.3rem" />
        </Box>
        <Box
          border="1px solid #45465E"
          borderRadius="4px"
          padding="0.5rem"
          height="100%"
        >
          <IoIosSettings cursor="pointer" fontSize="1.3rem" onClick={onOpen} />
          {/* modal account setting */}
          <ModalAccountsetting isOpen={isOpen} onClose={onClose} />
        </Box>
      </Box>
      <Box
        className="convert"
        display="flex"
        alignItems="center"
        justifyContent="center"
        marginTop="1rem"
      >
        <Box display="flex" alignItems="center">
          <Image src="/images/home/sipher.png" />1
        </Box>
        <Box margin="0 0.5rem" fontSize="1.2rem">
          <IoMdArrowRoundForward />
        </Box>
        <Box display="flex" alignItems="center">
          <Image src="/images/home/eth.png" />
          0.01 (0.06)
        </Box>
      </Box>
    </Box>
  );
};

export default GeneralInfo;
