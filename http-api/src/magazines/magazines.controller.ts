import {
  Controller,
  Logger,
  Get,
  Post,
  Delete,
  Query,
  Param,
  Body,
} from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { CreateMagazineDTO } from './magazines.dto';

@Controller('magazines')
export class MagazinesController {
  client: ClientProxy;
  logger = new Logger('Magazines');
  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        url: 'redis://localhost:6379',
      },
    });
  }

  @Get()
  async getMagazines() {
    this.logger.log('Getting all magazines');
    const pattern = { cmd: 'getMagazines' };
    return await this.client.send(pattern, {});
  }

  @Get(':magazineID')
  async getMagazine(@Param('magazineID') magazineID) {
    this.logger.log(magazineID);
    const pattern = { cmd: 'getMagazineById' };
    return await this.client.send<number>(pattern, magazineID);
  }

  @Post()
  async addMagazine(@Body() createMagazineDTO: CreateMagazineDTO) {
    this.logger.log(createMagazineDTO);
    const magazine = await this.client.send<CreateMagazineDTO>(
      { cmd: 'addMagazine' },
      createMagazineDTO,
    );
    return magazine;
  }

  @Delete()
  async deleteMagazine(@Query() query) {
    const magazines = await this.client.send({ cmd: 'deleteMagazine' }, query);
    return magazines;
  }
}
