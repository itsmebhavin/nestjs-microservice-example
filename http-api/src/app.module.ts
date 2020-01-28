import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { MagazinesController } from './magazines/magazines.controller';
import { MagazinesModule } from './magazines/magazines.module';

@Module({
  imports: [BooksModule, MagazinesModule],
  controllers: [AppController, MagazinesController],
  providers: [AppService],
})
export class AppModule {}
