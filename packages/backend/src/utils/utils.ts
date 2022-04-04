import { BigNumber, ethers } from "ethers";
import constant, { Chain } from "@setting/constant";
import _ from "lodash";

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
    contractRegistry.erc1155Sculpture[Chain.Polygon].address.toLowerCase() ===
    contractAddress;
  return isMumbaiSculpture || isPolygonSculpture;
};

const isLootboxContract = (contractAddress: string) => {
  const contractRegistry = constant.blockchain.contracts;
  const isMumbaiSpaceship =
    contractRegistry.erc1155LootBox[Chain.Mumbai].address.toLowerCase() ===
    contractAddress;
  const isPolygonSpaceship =
    contractRegistry.erc1155LootBox[Chain.Polygon].address.toLowerCase() ===
    contractAddress;
  return isMumbaiSpaceship || isPolygonSpaceship;
};

const weiToEther = (wei: string | BigNumber) =>
  parseFloat(ethers.utils.formatEther(wei));

const currency = (
  amount: number,
  prefix = "",
  options: {
    maximumFractionDigits?: number;
    minimumFractionDigits?: number;
  } = {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }
) => prefix + amount.toLocaleString(undefined, { ...options });

const toTokenId = (id: string) => {
  const splitIdStr = id.split(":");
  if (splitIdStr.length === 3) {
    return splitIdStr[1];
  }
  return splitIdStr[0];
};

const toCamcelCase = (data: Object) => {
  const camelCaseStats = {};
  Object.entries(data).forEach((entry) => {
    camelCaseStats[_.camelCase(entry[0])] = entry[1];
  });
  return camelCaseStats;
};

export {
  currency,
  getDeadline3Day,
  getNow,
  insertDetailStringToImage,
  isLootboxContract,
  isSculptureContract,
  randomSalt,
  toTokenId,
  weiToEther,
  toCamcelCase,
};
