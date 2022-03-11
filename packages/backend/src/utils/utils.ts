import { ethers } from "ethers";

const randomSalt = () =>
  ethers.utils.formatBytes32String(
    (Math.random() * 1000000000000000).toString()
  );

export { randomSalt };
