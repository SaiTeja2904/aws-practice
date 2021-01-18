import { Test, TestingModule } from '@nestjs/testing';
import { SampleS3Controller } from './sample-s3.controller';

describe('SampleS3Controller', () => {
  let controller: SampleS3Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SampleS3Controller],
    }).compile();

    controller = module.get<SampleS3Controller>(SampleS3Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
