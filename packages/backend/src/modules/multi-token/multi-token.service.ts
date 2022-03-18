import { Provider } from "@ethersproject/abstract-provider";
import { Injectable } from "@nestjs/common";
import { getContract, getProvider } from "@setting/blockchain/ethers";
import constant from "@setting/constant";
import { BigNumber } from "ethers";
import { readFileSync } from "fs";
import { join } from "path";
import { MultiTokenBalanceDto } from "./multi-token.dto";

@Injectable()
export class MultiTokenService {
  private erc1155abi: string;
  private provider: Provider;

  constructor() {
    this.provider = this.provider = getProvider(constant.CHAIN_ID);
    this.erc1155abi = readFileSync(
      join(__dirname, "../../data/ERC1155/abi.json")
    ).toString();
  }

  async balanceOf(
    contractAddress: string,
    multiTokenBalanceDto: MultiTokenBalanceDto
  ): Promise<BigNumber> {
    const contract = getContract(
      contractAddress,
      this.erc1155abi,
      this.provider
    );
    const balance = await contract.balanceOf(
      multiTokenBalanceDto.address,
      BigNumber.from(multiTokenBalanceDto.tokenId)
    );
    return balance;
  }
}
