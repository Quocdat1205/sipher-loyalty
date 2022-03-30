import { isEthereumAddress } from "class-validator";
import { toChecksumAddress } from "ethereumjs-util";
import {
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from "@nestjs/common";

@Injectable()
export class ParseEthereumAddress implements PipeTransform {
  private ethereumRegex = /^0x[a-fA-F0-9]{40}$/;

  transform(value: any) {
    try {
      const address = toChecksumAddress(value);
      if (!isEthereumAddress(address)) {
        throw new HttpException(
          "Invalid ethereum address !",
          HttpStatus.BAD_REQUEST
        );
      }
      return address;
    } catch (err) {
      throw new HttpException(
        "Invalid ethereum address !",
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
