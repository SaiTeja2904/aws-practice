import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SampleS3Controller } from './sample-s3/sample-s3.controller';
import { S3Service } from './s3/s3.service';

@Module({
  imports: [],
  controllers: [AppController, SampleS3Controller],
  providers: [AppService, S3Service],
})
export class AppModule {}
