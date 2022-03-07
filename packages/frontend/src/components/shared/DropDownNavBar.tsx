import React from "react";
import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import { IoListSharp } from "react-icons/io5";
import GeneralInfo from "@components/UI/navbar/GeneralInfo";
import BodyDropdown from "../UI/navbar/BodyDropdown";
import ListSelection from "@components/UI/navbar/ListSelection";
import { GroupCard } from "@components/UI/navbar/CardDropdown";
import { useMetaMask } from "@hooks";

const DropDownNavBar = () => {
  const { disconnect } = useMetaMask();
  return (
    <Popover placement="bottom-end">
      <PopoverTrigger>
        <Button
          bg="none"
          fontSize="2rem"
          padding="0"
          _focus={{ boxShadow: "none", border: "1px solid #45465E" }}
        >
          <IoListSharp cursor="pointer" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        bg="#292A40"
        height="80vh"
        overflowY="scroll"
        _active={{ border: "none" }}
        paddingTop="1rem"
      >
        <PopoverCloseButton />
        <GeneralInfo />
        <PopoverArrow />
        <PopoverBody>
          <BodyDropdown />
          <ListSelection />
          {/* button disconnect */}
          <GroupCard>
            <Button
              bg="#DF6767"
              borderRadius="4px"
              width="100%"
              color="black"
              textTransform="uppercase"
              onClick={disconnect}
            >
              Disconnect
            </Button>
          </GroupCard>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default DropDownNavBar;
