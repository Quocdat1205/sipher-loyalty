import AWS from "aws-sdk";
import { Repository } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { S3, User } from "@entity";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserService {
  constructor(
    private configService: ConfigService,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(S3) private s3Repo: Repository<S3>
  ) {}

  private s3bucket = new AWS.S3({
    accessKeyId: this.configService.get("AWS_ACCESS_KEY_ID"),
    secretAccessKey: this.configService.get("AWS_SECRET_ACCESS_KEY"),
    region: this.configService.get("AWS_REGION"),
  });

  private Bucket = this.configService.get("AWS_NAME_BUCKET");

  // eslint-disable-next-line @typescript-eslint/naming-convention
  private AWS_UPLOAD_FILE_URL_LINK = this.configService.get(
    "AWS_UPLOAD_FILE_URL_LINK"
  );

  async uploadFile(file: Express.Multer.File) {
    // link save img
    const attachment = `${uuidv4()}-${file.originalname
      .toLowerCase()
      .split(" ")
      .join("-")}`;

    // Where you want to store your file
    const params = {
      Bucket: this.Bucket,
      Key: `public/${attachment}`,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: "public-read",
    };

    try {
      await this.s3bucket.upload(params).promise();
      const result = await this.s3Repo.save({
        s3_key: params.Key,
        attachment: this.AWS_UPLOAD_FILE_URL_LINK + attachment,
      });

      return { attachment: result.attachment };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_GATEWAY);
    }
  }

  async deleteFile(s3_key: string) {
    // delete from db
    const file = await this.s3Repo.findOne({ where: { s3_key } });
    if (!file) throw new HttpException("File not found", HttpStatus.NOT_FOUND);

    // delete from db
    try {
      await this.s3Repo.delete({ s3_key: file.s3_key });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_GATEWAY);
    }

    const params = {
      Bucket: this.Bucket,
      Key: s3_key,
    };

    try {
      await this.s3bucket.deleteObject(params).promise();
      return "File deleted successfully";
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_GATEWAY);
    }
  }

  async updateBio(ather_id: string, username: string, bio: string) {
    // find user
    const user = await this.userRepo.findOne({ where: ather_id });

    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }

    user.bio = bio;
    user.username = username;

    await this.userRepo.save(user);

    return user;
  }
}
