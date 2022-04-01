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
  transform(value: any) {
    try {
      const address = toChecksumAddress(value);
      if (!isEthereumAddress(address)) {
        throw new HttpException(
          "Invalid ethereum address !",
          HttpStatus.BAD_REQUEST
        );
      }
      return value.toLowerCase();
    } catch (err) {
      throw new HttpException(
        "Invalid ethereum address !!",
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
