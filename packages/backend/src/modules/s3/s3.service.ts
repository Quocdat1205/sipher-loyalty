// import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import AWS from 'aws-sdk';
// import { Repository } from 'typeorm';
// import { v4 as uuidv4 } from 'uuid';
// import { User } from '@entity';
// import constant from '@setting/constant';

// declare global {

// }

// @Injectable()
// export class S3Service {
//   constructor(@InjectRepository(User) private userRepo: Repository<User>) {}
//   private s3bucket = new AWS.S3({
//     accessKeyId: constant.AWS_ACCESS_KEY_ID,
//     secretAccessKey: constant.AWS_SECRET_ACCESS_KEY,
//     region: constant.AWS_REGION,
//   });
//   private Bucket = constant.AWS_NAME_BUCKET;
//   private AWS_UPLOAD_FILE_URL_LINK = constant.AWS_UPLOAD_FILE_URL_LINK;

//   async uploadFile(file: Express.Multer.File) {
//     // link save img
//     const attachment =
//       uuidv4() + '-' + file.originalname.toLowerCase().split(' ').join('-');

//     //Where you want to store your file
//     const params = {
//       Bucket: this.Bucket,
//       Key: `loyalty/${attachment}`,
//       Body: file.buffer,
//       ContentType: file.mimetype,
//       ACL: 'public-read',
//     };

//     try {
//       await this.s3bucket.upload(params).promise();

//       // save attachment to database
//       const result = await this.s3LinkRepos.save({
//         s3_key: params.Key,
//         link: this.AWS_UPLOAD_FILE_URL_LINK + attachment,
//       });

//       return {
//         published: Math.round(new Date().getTime() / 1000),
//         thumbnail: result.link,
//       };
//     } catch (e) {
//       throw new HttpException(e.message, HttpStatus.BAD_GATEWAY);
//     }
//   }
// }
