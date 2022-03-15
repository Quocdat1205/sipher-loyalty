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
    if (!this.ethereumRegex.test(value)) {
      throw new HttpException(
        "Invalid ethereum address",
        HttpStatus.BAD_REQUEST
      );
    }
    return value;
  }
}
