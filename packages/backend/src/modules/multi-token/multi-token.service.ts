import { BigNumber, providers } from "ethers";
import { Injectable } from "@nestjs/common";
import { erc1155Abi } from "@setting/blockchain/abis";
import { getContract, getProvider } from "@setting/blockchain/ethers";
import constant from "@setting/constant";

import { MultiTokenBalanceDto } from "./multi-token.dto";

@Injectable()
export class MultiTokenService {
  private erc1155abi;

  private provider: providers.Provider;

  constructor() {
    this.provider = getProvider(constant.CHAIN_ID);
  }

  async balanceOf(
    contractAddress: string,
    multiTokenBalanceDto: MultiTokenBalanceDto
  ): Promise<BigNumber> {
    const contract = getContract(contractAddress, erc1155Abi, this.provider);
    const balance = await contract.balanceOf(
      multiTokenBalanceDto.address,
      BigNumber.from(multiTokenBalanceDto.tokenId)
    );
    return balance;
  }
}
