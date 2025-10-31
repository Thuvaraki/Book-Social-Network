import { Component, OnInit, signal } from '@angular/core';
import { BookService } from '../../../../services/services';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BookResponse, PageResponseBookResponse } from '../../../../services/models';
import { BookCard } from '../../components/book-card/book-card';
import e from 'express';

@Component({
  selector: 'app-book-list',
  imports: [CommonModule, BookCard],
  templateUrl: './book-list.html',
  styleUrl: './book-list.scss',
})
export class BookList implements OnInit {
  bookResponse = signal<PageResponseBookResponse>({});
  page = 0;
  size = 5;
  message = signal<string>('');
  level = signal<string>('success');

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit(): void {
    this.findAllBooks();
  }

  private findAllBooks() {
    this.bookService
      .findAllBooks({ page: this.page, size: this.size })
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

  borrowBook(book: BookResponse) {
    this.message.set('');
    this.bookService
      .borrowBook({
        'book-id': book.id as number,
      })
      .then((res) => {
        this.level.set('success');
        this.message.set('Book successfully added to your list.');
      })
      .catch((err) => {
        console.log(err);
        this.level.set('error');
        this.message.set(err.error.error);
      });
  }
}
