import { Component, OnInit, signal } from '@angular/core';
import { BookService } from '../../../../services/services';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  PageResponseBorrowedBookResponse,
  BorrowedBookResponse,
} from '../../../../services/models';

@Component({
  selector: 'app-return-books',
  imports: [CommonModule, FormsModule],
  templateUrl: './return-books.html',
  styleUrl: './return-books.scss',
})
export class ReturnBooks implements OnInit {
  page = 0;
  size = 5;
  returnedBooks = signal<PageResponseBorrowedBookResponse>({});
  message = signal('');
  level = signal<'success' | 'error'>('success');

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.findAllReturnedBooks();
  }

  findAllReturnedBooks() {
    this.bookService
      .findAllReturnedBooks({ page: this.page, size: this.size })
      .then((res) => {
        this.returnedBooks.set(res);
        console.log('returnedBooks', this.returnedBooks());
      })
      .catch((err) => console.error(err));
  }

  approveBookReturn(book: BorrowedBookResponse) {
    if (!book.returned) {
      return;
    }
    this.bookService
      .approveReturnBorrowBook({
        'book-id': book.id as number,
      })
      .then(() => {
        this.level.set('success');
        this.message.set('Book return approved');
        this.findAllReturnedBooks();
      })
      .catch((err) => {
        this.level.set('error');
        this.message.set('Book return not approved');
      });
  }

  gotToPage(page: number) {
    this.page = page;
    this.findAllReturnedBooks();
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllReturnedBooks();
  }

  goToPreviousPage() {
    this.page--;
    this.findAllReturnedBooks();
  }

  goToLastPage() {
    this.page = (this.returnedBooks().totalPages as number) - 1;
    this.findAllReturnedBooks();
  }

  goToNextPage() {
    this.page++;
    this.findAllReturnedBooks();
  }

  get isLastPage() {
    return this.page === (this.returnedBooks().totalPages as number) - 1;
  }
}
