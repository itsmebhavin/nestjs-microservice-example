import { BooksService } from './books.service';
import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Query,
  Body,
} from '@nestjs/common';
import { CreateBookDTO } from './create-book.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  // @Get()
  @MessagePattern({ cmd: 'getBooks' })
  async getBooks() {
    const books = await this.booksService.getBooks();
    return books;
  }

  @MessagePattern({ cmd: 'getBookById' })
  // @Get(":bookID")
  async getBook(bookID) {
    const book = await this.booksService.getBook(bookID);
    return book;
  }

  // @Post()
  @MessagePattern({ cmd: 'addBook' })
  async addBook(createBookDTO: CreateBookDTO) {
    const book = await this.booksService.addBook(createBookDTO);
    return book;
  }

  // @Delete()
  @MessagePattern({ cmd: 'deleteBook' })
  async deleteBook(query) {
    const books = await this.booksService.deleteBook(query.bookID);
    return books;
  }
}
