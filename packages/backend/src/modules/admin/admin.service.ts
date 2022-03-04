import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import constant from '@setting/constant';
import { AuthService } from '@module/auth/auth.service';
import { logInAdmin, sculptureOrder } from './admin.type';
import { SculpturesOrder, NftOrder } from '@entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(
    private authservice: AuthService,
    @InjectRepository(SculpturesOrder)
    private sculptureOrderRepo: Repository<SculpturesOrder>,
    @InjectRepository(NftOrder)
    private nftOrderRepo: Repository<NftOrder>,
  ) {}

  async logIn(info: logInAdmin) {
    const { username } = info;

    // if (username !== constant.TK_WEB || password !== constant.PW_WEB) {
    //   return { success: false };
    // }

    const accessToken = await this.authservice.getTokenAdmin({ username });

    return { success: true, accessToken };
  }

  async getCountPage(quantity: number) {
    // count all order in db
    const count = await this.sculptureOrderRepo.count();

    const page = Math.ceil(count / quantity);

    return page;
  }

  async getSculptureOrder(sculptureOder: sculptureOrder) {
    const { min, max } = sculptureOder;

    const sculpture_order = await this.sculptureOrderRepo.find({
      take: max,
      skip: min,
    });

    return sculpture_order;
  }
}
