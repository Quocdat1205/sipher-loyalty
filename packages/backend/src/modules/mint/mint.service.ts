// import library
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { recoverPersonalSignature } from 'eth-sig-util';
import { bufferToHex } from 'ethereumjs-util';
import { ethers } from 'ethers';

// import module
import { MintInput } from './mint.type';
import { LoggerService } from '../logger/logger.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class MintService {
  constructor(private authService: AuthService) {}

  async test(mintInput: MintInput) {
    const { userAddress, mintType, quantity } = mintInput;
    LoggerService.log(`sign mint data for ${userAddress}`);

    let signer = new ethers.Wallet(process.env.PRIVATE_KEY);

    const domain = {
      name: 'My App',
      version: '1',
      chainId: 1,
      verifyingContract: '0x1111111111111111111111111111111111111111',
    };

    const types = {
      MintTypedData: [
        { name: 'id', type: 'string' },
        { name: 'quantity', type: 'uint256' },
        { name: 'to', type: 'string' },
      ],
    };

    const mintTypedData = {
      id: mintType,
      quantity: quantity,
      to: userAddress,
    };

    const signature = await signer._signTypedData(domain, types, mintTypedData);

    const expectedSignerAddress = signer.address;
    const recoveredAddress = ethers.utils.verifyTypedData(
      domain,
      types,
      mintTypedData,
      signature,
    );
    console.log(recoveredAddress === expectedSignerAddress);
  }
}
