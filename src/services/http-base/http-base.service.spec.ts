import { Test, TestingModule } from '@nestjs/testing';
import { HttpBaseService } from './http-base.service';

describe('HttpBaseService', () => {
  let service: HttpBaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HttpBaseService],
    }).compile();

    service = module.get<HttpBaseService>(HttpBaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
