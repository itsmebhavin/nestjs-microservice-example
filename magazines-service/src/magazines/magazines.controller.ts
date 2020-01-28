import { CreateMagazineDTO } from './create-magazine.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Delete,
  Param,
} from '@nestjs/common';
import { MagazinesService } from './magazines.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('magazines')
export class MagazinesController {
  constructor(private magazinesService: MagazinesService) {}

  // @Get()
  @MessagePattern({ cmd: 'getMagazines' })
  async getMagazines() {
    const magazines = await this.magazinesService.getMagazines();
    return magazines;
  }

  // @Get(':magazineID')
  @MessagePattern({ cmd: 'getMagazineById' })
  async getBook(magazineID) {
    const magazine = await this.magazinesService.getMagazine(magazineID);
    return magazine;
  }

  // @Post()
  @MessagePattern({ cmd: 'addMagazine' })
  async addBook(createBookDTO: CreateMagazineDTO) {
    const magazine = await this.magazinesService.addMagazine(createBookDTO);
    return magazine;
  }

  // @Delete()
  @MessagePattern({ cmd: 'deleteMagazine' })
  async deleteBook(query) {
    const magazines = await this.magazinesService.deleteMagazine(
      query.magazineID,
    );
    return magazines;
  }
}
