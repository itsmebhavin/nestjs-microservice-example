import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MagazinesModule } from './magazines/magazines.module';

@Module({
  imports: [MagazinesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
