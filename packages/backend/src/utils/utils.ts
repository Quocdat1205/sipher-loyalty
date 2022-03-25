import { ethers } from "ethers";
import constant, { Chain } from "@setting/constant";

const randomSalt = () =>
  ethers.utils.formatBytes32String(
    (Math.random() * 1000000000000000).toString()
  );

const getDeadline3Day = () =>
  Math.round(new Date().getTime() / 1000) + constant.PENDING_TIME_LOOTBOX_MINT;

const getNow = () => Math.round(new Date().getTime() / 1000);

const isSculptureContract = (contractAddress: string) => {
  const contractRegistry = constant.blockchain.contracts;
  const isMumbaiSculpture =
    contractRegistry.erc1155Sculpture[Chain.Mumbai].address.toLowerCase() ===
    contractAddress;
  const isPolygonSculpture =
    contractRegistry.erc1155Sculpture[Chain.Mainnet].address.toLowerCase() ===
    contractAddress;
  return isMumbaiSculpture || isPolygonSculpture;
};

const isSpaceshipContract = (contractAddress: string) => {
  const contractRegistry = constant.blockchain.contracts;
  const isMumbaiSpaceship =
    contractRegistry.erc1155Spaceship[Chain.Mainnet].address.toLowerCase() ===
    contractAddress;
  const isPolygonSpaceship =
    contractRegistry.erc1155Spaceship[Chain.Mainnet].address.toLowerCase() ===
    contractAddress;
  return isMumbaiSpaceship || isPolygonSpaceship;
};

export {
  getDeadline3Day,
  getNow,
  isSculptureContract,
  isSpaceshipContract,
  randomSalt,
};
