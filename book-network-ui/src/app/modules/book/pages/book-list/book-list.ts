import { Component, OnInit, signal } from '@angular/core';
import { BookService } from '../../../../services/services';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PageResponseBookResponse } from '../../../../services/models';
import { BookCard } from '../../components/book-card/book-card';

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
  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit(): void {
    this.findAllBooks();
  }
  private findAllBooks() {
    this.bookService
      .findAllBooks({ page: this.page, size: this.size })
      .then((res) => {
        console.log(res);
        this.bookResponse.set(res);
      })
      .catch((err) => console.error(err));
  }
}
