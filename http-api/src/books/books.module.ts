import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';

@Module({
  controllers: [BooksController],
})
export class BooksModule {}
