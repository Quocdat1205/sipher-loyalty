// import library
import { recoverPersonalSignature } from "eth-sig-util";
import { bufferToHex } from "ethereumjs-util";
import { Repository } from "typeorm";
// import module
import { ActivityLogs, Address, TransactionLogs, User } from "@entity";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { AuthService } from "../auth/auth.service";
import { LoggerService } from "../logger/logger.service";

import { newAddress, publicAddressType, updateAccount } from "./user.type";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private UserRepo: Repository<User>,
    @InjectRepository(Address) private addressRepo: Repository<Address>,
    @InjectRepository(TransactionLogs)
    private transactionRepo: Repository<TransactionLogs>,
    @InjectRepository(ActivityLogs)
    private activityRepo: Repository<ActivityLogs>,
    private authService: AuthService
  ) {}

  async getNounce(publicAddress: string) {
    LoggerService.log(`Get nonce controller`);
    const new_nonce = Math.floor(Math.random() * 10000); // random nonce

    // find user
    const user = await this.UserRepo.findOne({ publicAddress });

    // create new user if does't exist
    if (user) {
      user.nonce = new_nonce;
      this.UserRepo.save(user);
    } else {
      this.UserRepo.save({ publicAddress, nonce: new_nonce });
    }
    return { nonce: new_nonce, publicAddress };
  }

  async signNonce({ signature, publicAddress }) {
    try {
      LoggerService.log(`Sign nonce service!`);

      // check user created address or not
      const user = await this.UserRepo.findOne({ publicAddress });

      if (!user) {
        return new HttpException("Address invalid", HttpStatus.FORBIDDEN);
      }

      // verify digital signature
      const msg = `I am signing my one-time nonce: ${user.nonce}`;

      // We now are in possession of msg, publicAddress and signature. We
      // will use a helper from eth-sig-util to extract the address from the signature
      const msgBufferHex = bufferToHex(Buffer.from(msg, "utf8"));

      const address = recoverPersonalSignature({
        data: msgBufferHex,
        sig: signature,
      });

      // The signature verification is successful if the address found with
      // sigUtil.recoverPersonalSignature matches the initial publicAddress
      if (address.toLowerCase() !== publicAddress.toLowerCase()) {
        return new HttpException(
          "User verification fail",
          HttpStatus.FORBIDDEN
        );
      }

      // generate new nouce
      const new_nonce = Math.floor(Math.random() * 10000); // random nonce
      user.nonce = new_nonce;
      this.UserRepo.save(user);

      // token
      // gen new token
      const payload = { publicAddress, nonce: new_nonce };
      const accessToken = this.authService.getTokenUser(payload);

      return await accessToken;
    } catch (error) {
      LoggerService.error(error);

      return new HttpException(
        "Something went wrong, please try again!",
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async getInfo(publicAddress: string) {
    try {
      LoggerService.log(`Get info service!`);

      const user = await this.UserRepo.findOne({ publicAddress });

      if (!user) {
        return new HttpException("User not found", HttpStatus.BAD_REQUEST);
      }

      return user;
    } catch (error) {
      LoggerService.error(error);

      return new HttpException(
        "Something went wrong, please try again!",
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async intergationDiscord({
    publicAddress,
    id_discord,
    name_discord,
  }: {
    publicAddress: string;
    id_discord: number;
    name_discord: string;
  }) {
    try {
      LoggerService.log(`Intergration discord service!`);

      // check user exited
      const user = await this.UserRepo.findOne({ publicAddress });

      if (!user) {
        return new HttpException("User not found!", HttpStatus.BAD_REQUEST);
      }

      user.id_discord = id_discord;
      user.username = name_discord;

      await this.UserRepo.save(user);

      return user;
    } catch (error) {
      LoggerService.error(error);

      return new HttpException(
        "Something went wrong, please try again!",
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async updateAccount(account: updateAccount) {
    try {
      const { publicAddress, username, email, bio, attachment } = account;

      // find user
      const user = await this.UserRepo.findOne({ where: { publicAddress } });

      if (!user) {
        return new HttpException("User not found!", HttpStatus.BAD_REQUEST);
      }

      user.username = username;
      user.email = email;
      user.bio = bio;
      user.attachment = attachment;

      await this.UserRepo.save(user);

      return user;
    } catch (error) {
      LoggerService.error(error);

      return new HttpException(
        "Something went wrong, please try again!",
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async addNewAddress(info: newAddress) {
    try {
      // const { publicAddress, fullname, phone, address, isDefault, type } = info;

      await this.addressRepo.save(info);

      return true;
    } catch (error) {
      LoggerService.error(error);

      return new HttpException(
        "Something went wrong, please try again!",
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async getActivities(publicAddress: publicAddressType) {
    try {
      const activity = await this.activityRepo.find({
        where: { publicAddress },
      });

      return activity;
    } catch (error) {
      LoggerService.error(error);

      return new HttpException(
        "Something went wrong, please try again!",
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async getTransaction(publicAddress: publicAddressType) {
    try {
      const transation = await this.transactionRepo.find({
        where: { publicAddress },
      });

      return transation;
    } catch (error) {
      LoggerService.error(error);

      return new HttpException(
        "Something went wrong, please try again!",
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
