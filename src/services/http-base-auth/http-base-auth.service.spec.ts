import { Test, TestingModule } from '@nestjs/testing';
import { HttpBaseAuthService } from './http-base-auth.service';

describe('HttpBaseService', () => {
  let service: HttpBaseAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HttpBaseAuthService],
    }).compile();

    service = module.get<HttpBaseAuthService>(HttpBaseAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
