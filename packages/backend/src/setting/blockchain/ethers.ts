import { Contract, providers } from "ethers";
import constant, { Chain } from "@setting/constant";

const providerInstances: { [k in Chain]?: providers.Provider } = {};

export const getProvider = async (chain: Chain) => {
  if (!providerInstances[chain]) {
    providerInstances[chain] = new providers.StaticJsonRpcProvider(
      (await constant.getRpcUrls())[chain],
      chain
    );
  }

  return providerInstances[chain];
};

export const getContract = (
  address: string,
  abi: any,
  provider?: providers.Provider
) => new Contract(address, abi, provider);
