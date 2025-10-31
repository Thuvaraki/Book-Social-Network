import { Component, OnInit, signal } from '@angular/core';
import { BookService } from '../../../../services/services';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BookResponse, PageResponseBookResponse } from '../../../../services/models';
import { BookCard } from '../../components/book-card/book-card';

@Component({
  selector: 'app-my-books',
  imports: [CommonModule, BookCard],
  templateUrl: './my-books.html',
  styleUrl: './my-books.scss',
})
export class MyBooks implements OnInit {
  bookResponse = signal<PageResponseBookResponse>({});
  page = 0;
  size = 2;

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit(): void {
    this.findAllBooks();
  }

  private findAllBooks() {
    this.bookService
      .findAllBooksByOwner({ page: this.page, size: this.size })
      .then((res) => {
        this.bookResponse.set(res);
      })
      .catch((err) => console.error(err));
  }

  gotToPage(page: number) {
    this.page = page;
    this.findAllBooks();
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllBooks();
  }

  goToPreviousPage() {
    this.page--;
    this.findAllBooks();
  }

  goToLastPage() {
    this.page = (this.bookResponse().totalPages as number) - 1;
    this.findAllBooks();
  }

  goToNextPage() {
    this.page++;
    this.findAllBooks();
  }

  get isLastPage() {
    return this.page === (this.bookResponse().totalPages as number) - 1;
  }

  archiveBook(book: BookResponse) {}

  shareBook(book: BookResponse) {}

  editBook(book: BookResponse) {}
}
