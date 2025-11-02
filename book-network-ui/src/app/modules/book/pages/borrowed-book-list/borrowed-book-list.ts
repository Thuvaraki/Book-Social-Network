import { Component, signal, OnInit } from '@angular/core';
import {
  BorrowedBookResponse,
  FeedbackRequest,
  PageResponseBorrowedBookResponse,
} from '../../../../services/models';
import { BookService, FeedbackService } from '../../../../services/services';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Rating } from '../../components/rating/rating';

@Component({
  selector: 'app-borrowed-book-list',
  imports: [CommonModule, FormsModule, Rating],
  templateUrl: './borrowed-book-list.html',
  styleUrl: './borrowed-book-list.scss',
})
export class BorrowedBookList implements OnInit {
  page = 0;
  size = 5;
  borrowedBooks = signal<PageResponseBorrowedBookResponse>({});
  selectedBook = signal<BorrowedBookResponse | undefined>(undefined);
  feedbackRequest: FeedbackRequest = { bookId: 0, comment: '', note: 0 };

  constructor(private bookService: BookService, private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    console.log('selectedBook', this.selectedBook());
    this.findAllBorrowedBooks();
  }

  findAllBorrowedBooks() {
    this.bookService
      .findAllBorrowedBooks({ page: this.page, size: this.size })
      .then((res) => {
        this.borrowedBooks.set(res);
      })
      .catch((err) => console.error(err));
  }

  returnBorrowedBook(book: BorrowedBookResponse) {
    this.selectedBook.set(book);
    this.feedbackRequest.bookId = book.id as number;
  }

  returnBook(withFeedback: boolean) {
    this.bookService
      .returnBorrowBook({
        'book-id': this.selectedBook()?.id as number,
      })
      .then((res) => {
        if (withFeedback) {
          this.giveFeedback();
        }
        this.selectedBook.set(undefined);
        this.findAllBorrowedBooks();
      });
  }

  private giveFeedback() {
    this.feedbackService
      .saveFeedback({
        body: this.feedbackRequest,
      })
      .then((res) => {});
  }

  gotToPage(page: number) {
    this.page = page;
    this.findAllBorrowedBooks();
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllBorrowedBooks();
  }

  goToPreviousPage() {
    this.page--;
    this.findAllBorrowedBooks();
  }

  goToLastPage() {
    this.page = (this.borrowedBooks().totalPages as number) - 1;
    this.findAllBorrowedBooks();
  }

  goToNextPage() {
    this.page++;
    this.findAllBorrowedBooks();
  }

  get isLastPage() {
    return this.page === (this.borrowedBooks().totalPages as number) - 1;
  }
}
