import { Test, TestingModule } from '@nestjs/testing';
import { MagazinesController } from './magazines.controller';

describe('Magazines Controller', () => {
  let controller: MagazinesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MagazinesController],
    }).compile();

    controller = module.get<MagazinesController>(MagazinesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
