# nestjs-microservice-example

Example code for nestjs microservice using REDIS

> Looking for Microservices using gRPC? (New 2022 solution using microservices written in nest.js and asp.net core using gRPC. Also has gateway api written in nest.js)
*** https://github.com/itsmebhavin/nestjs-microservices-gRPC-example

## Description

We are creating microservices using nestjs [nestjs.com] and REDIS. We have following components in our solution -

- books-service (microservice)
- magazines-service (microservice)
- http-api (main entry point API for aggregating microservices)

## How microservices are designed?

### Books-Service (Microservice)

---

It's basically a CRUD API for managing books. We have books object as below -

```
export class CreateBookDTO {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly author: string;
}
```

#### Registering `Books-Service` with REDIS

```
main.ts \\ Bootstraping

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { Transport } from '@nestjs/microservices';

// Create new logger instance
const logger = new Logger('Main');

// Create micro service options
const microserviceOptions = {
  name: 'BOOK_SERVICE',
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
  app.listen(() => {
    logger.log('Books microservice is listening ... ');
  });
}
bootstrap();
```

#### Controller methods for microservice

To add method which you want to expose as endpoint, you have to add `@MessagePattern({ cmd: <endpoint-name>})` attribute.

```
 @MessagePattern({ cmd: 'getBooks' })
  async getBooks() {
    const books = await this.booksService.getBooks();
    return books;
  }
```

#### Registering `Magazines-Service` with REDIS

This is similar to books microservice registration / bootstraping. We have same types of CRUD endpoints in `magazines controller`.

---

Note: We are serving data from the mocks file. Mocks files are in respective microservice code. e.g. `books.mocks.ts` and `magazines.mocks.ts`.

---

## How aggregator Client API is designed?

Our aggrator API is nothing but simple nestjs API application, so there is no changes in `main.ts` bootstrapping. But main change will be in controllers where we are going to call individual microservices.

Client API is going to communicate with Microservice using REDIS messaging channel.

### REDIS setup

- I have REDIS running in `docker` in my windows machine.
- After that, I have installed Redis-cli for windows (x64).
- I verified that Redis is working by running `$#> redis-cli` on command prompt.

Now that my REDIS is running, I can use it in aggregator api as Transport channel.

```
books.controller.ts

  client: ClientProxy;
  logger = new Logger('Books');
  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        host: 'localhost',
        port: 6379,
      },
    });
  }
```

#### How to use ClientProxy?

```
@Get()
  async getBooks() {
    this.logger.log('Getting all books');
    const pattern = { cmd: 'getBooks' };
    return await this.client.send(pattern, {});
  }
```

### How to run whole eco-system?

- Need to run `books-microservice` using `npm run start:dev`
- Need to run `magazines-microservice` using `npm run start:dev`

finally, after you have both microservices are running, let's start our aggregator api, so we can use it to build our client UI application.

- Need to run `http-api` using `npm run start:dev`

#### Testing?

- I got my aggregator api running on `localhost:3000` and so i am using it in postman to test it.

---

#### Testing endpoints for `books` but same for `magazines` as well.

1. GET localhost:3000\books
2. GET localhost:3000\books\2
3. POST localhost:3000\books

```
  {
    id: 8,
    title: 'Champak',
    description: 'Kids book for pre-k',
    author: 'John Barry',
  }
```

---

- Author: Bhavin Patel
- Todo: Work in progress to add Docker and kubernetes support.
