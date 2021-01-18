import {
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { from } from 'rxjs';
import { AppService } from 'src/app.service';
import { S3Service } from 'src/s3/s3.service';
import { catchError, map, switchMap } from 'rxjs/operators';

@Controller('sample-s3')
export class SampleS3Controller {
  bucketName = 'teja-personal-bucket-2904';

  constructor(
    private readonly appService: AppService,
    private readonly s3Service: S3Service,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('addObject')
  addObject(): string {
    const bucketName = 'teja-personal-bucket-2904';

    return this.appService.getHello();
  }

  @Get('listObjects')
  listObjects(): any {
    const objectsPromise = this.s3Service
      .getS3Object()
      .listObjects({ Bucket: this.bucketName })
      .promise();
    return from(objectsPromise).pipe(
      map((data) => data.Contents),
      catchError((err) => {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
      }),
    );
  }

  @Delete('emptyBucket')
  emptyBucket(): any {
    const objectsPromise = this.s3Service
      .getS3Object()
      .listObjects({ Bucket: this.bucketName })
      .promise();
    return from(objectsPromise).pipe(
      switchMap((data) => {
        const objects = data.Contents.map(({ Key }) => Key);
        const deletePayload = {
          Bucket: this.bucketName,
          Delete: { Objects: objects.map((key) => ({ Key: key })) },
        };
        console.log(deletePayload);
        return from(
          this.s3Service.getS3Object().deleteObjects(deletePayload).promise(),
        );
      }),
      catchError((err) => {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
      }),
    );
  }
}
