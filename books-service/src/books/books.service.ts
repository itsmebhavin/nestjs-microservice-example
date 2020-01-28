import { BOOKS } from './books.mocks';
import { Injectable, HttpException } from '@nestjs/common';

@Injectable()
export class BooksService {
  books = BOOKS;

  getBooks(): Promise<any> {
    return new Promise(resolve => {
      resolve(this.books);
    });
  }

  getBook(bookID): Promise<any> {
    const id = Number(bookID);
    return new Promise(resolve => {
      const book = this.books.find($book => $book.id === id);
      if (!book) {
        throw new HttpException('Book does not exist!', 404);
      }
      resolve(book);
    });
  }

  addBook(book): Promise<any> {
    return new Promise(resolve => {
      book.id = Number(book.id);
      this.books.push(book);
      resolve(this.books);
    });
  }

  deleteBook(bookID): Promise<any> {
    const id = Number(bookID);
    return new Promise(resolve => {
      const index = this.books.findIndex($book => $book.id === id);
      if (index === -1) {
        throw new HttpException('Book does not exist!', 404);
      }
      this.books.splice(index, 1);
      resolve(this.books);
    });
  }
}
