import { Module } from '@nestjs/common';
import { MagazinesController } from './magazines.controller';
import { MagazinesService } from './magazines.service';

@Module({
  controllers: [MagazinesController],
  providers: [MagazinesService]
})
export class MagazinesModule {}
