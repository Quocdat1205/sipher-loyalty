import React from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  Text,
} from "@chakra-ui/react";
import { IoArrowDownCircleSharp, IoArrowUpCircleSharp } from "react-icons/io5";

const head_table = ["Currency", "balance", "value", "24h change"];

const Tokens = () => {
  return (
    <Box>
      <Table>
        <Thead>
          <Tr>
            {head_table.map((value) => {
              return (
                <Th key={value} fontSize="1.2rem" color="text.gray">
                  {value}
                </Th>
              );
            })}
          </Tr>
        </Thead>
        <Tbody>
          {/* fake data */}
          <Tr>
            <Td display="flex" alignItems="center">
              <Image src="/images/home/eth.png" marginRight="1rem" />
              ETH
            </Td>
            <Td>1000</Td>
            <Td>$1.2</Td>
            <Td display="flex" alignItems="center" color="red">
              <IoArrowDownCircleSharp fontSize="1.2rem" />{" "}
              <Text marginLeft="1rem">0.98%</Text>
            </Td>
          </Tr>
          <Tr>
            <Td display="flex" alignItems="center">
              <Image src="/images/home/sipher.png" marginRight="1rem" />
              SIPHER
            </Td>
            <Td>1100</Td>
            <Td>$1.2</Td>
            <Td display="flex" alignItems="center" color="green">
              <IoArrowUpCircleSharp fontSize="1.2rem" />{" "}
              <Text marginLeft="1rem">0.98%</Text>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
};

export default Tokens;
