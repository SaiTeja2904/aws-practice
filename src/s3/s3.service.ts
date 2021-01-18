import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class S3Service {
  s3: AWS.S3;

  constructor() {
    if (!this.s3) {
      var credentials = new AWS.SharedIniFileCredentials({
        profile: 'learner',
      });
      AWS.config.credentials = credentials;
      this.s3 = new AWS.S3();
    }
  }

  getS3Object(): AWS.S3 {
    return this.s3;
  }
}
