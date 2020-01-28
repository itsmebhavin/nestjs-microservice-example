import { Module } from '@nestjs/common';
import { MagazinesController } from './magazines.controller';

@Module({
  controllers: [MagazinesController],
})
export class MagazinesModule {}
