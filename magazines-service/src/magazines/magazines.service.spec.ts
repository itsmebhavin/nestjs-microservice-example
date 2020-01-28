import { Test, TestingModule } from '@nestjs/testing';
import { MagazinesService } from './magazines.service';

describe('MagazinesService', () => {
  let service: MagazinesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MagazinesService],
    }).compile();

    service = module.get<MagazinesService>(MagazinesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
