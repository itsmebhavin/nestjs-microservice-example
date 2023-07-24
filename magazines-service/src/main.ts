import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
// Create new logger instance
const logger = new Logger('Main');

// Create micro service options
const microserviceOptions = {
  name: 'MAGAZINE_SERVICE',
  transport: Transport.REDIS,
  options: {
    host: 'localhost',
    port: 6379,
  },
};
async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    AppModule,
    microserviceOptions,
  );
  app.listen();
}
bootstrap();
