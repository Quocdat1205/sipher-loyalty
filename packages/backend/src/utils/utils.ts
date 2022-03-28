import { ethers } from "ethers";
import constant, { Chain } from "@setting/constant";

const randomSalt = () =>
  ethers.utils.formatBytes32String(
    (Math.random() * 1000000000000000).toString()
  );

const getDeadline3Day = () =>
  Math.round(new Date().getTime() / 1000) + constant.PENDING_TIME_LOOTBOX_MINT;

const getNow = () => Math.round(new Date().getTime() / 1000);

const insertDetailStringToImage = (img_url: string) => {
  const re = /(.*)\.png$/;
  const newstr = img_url.replace(re, "$1_Detail.png");
  return newstr;
};

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

const isLooboxContract = (contractAddress: string) => {
  const contractRegistry = constant.blockchain.contracts;
  const isMumbaiSpaceship =
    contractRegistry.erc1155LootBox[Chain.Mumbai].address.toLowerCase() ===
    contractAddress;
  const isPolygonSpaceship =
    contractRegistry.erc1155LootBox[Chain.Mainnet].address.toLowerCase() ===
    contractAddress;
  return isMumbaiSpaceship || isPolygonSpaceship;
};

export {
  getDeadline3Day,
  getNow,
  insertDetailStringToImage,
  isSculptureContract,
  isLooboxContract,
  randomSalt,
};
