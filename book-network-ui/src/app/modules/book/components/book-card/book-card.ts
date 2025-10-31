import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookResponse } from '../../../../services/models';
import { CommonModule } from '@angular/common';
import { Rating } from '../rating/rating';

@Component({
  selector: 'app-book-card',
  imports: [CommonModule, Rating],
  templateUrl: './book-card.html',
  styleUrl: './book-card.scss',
})
export class BookCard {
  private _book: BookResponse = {};
  private _manage: boolean = false;
  private _bookCover: string | undefined;

  get book(): BookResponse {
    return this._book;
  }

  @Input()
  set book(value: BookResponse) {
    this._book = value;
  }

  get bookCover(): string | undefined {
    if (this._book.cover) {
      return 'data:image/jpg;base64,' + this._book.cover;
    }
    return 'https://pngimg.com/uploads/book/book_PNG2111.png';
  }

  get manage(): boolean {
    return this._manage;
  }

  @Input()
  set manage(value: boolean) {
    this._manage = value;
  }

  // Passing data from child component to parent component via @Output and EventEmitter
  // EventEmitter<BookResponse> here EventEmitter is just a special kind of Observable that Angular uses for component events.
  // The <BookResponse> part means it will emit data of that specific type
  @Output() share: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() archive: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() addToWaitingList: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() borrow: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() edit: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() details: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();

  onShare() {
    this.share.emit(this._book);
  }

  onArchive() {
    this.archive.emit(this._book);
  }

  onAddToWaitingList() {
    this.addToWaitingList.emit(this._book);
  }

  onBorrow() {
    this.borrow.emit(this._book);
  }

  onEdit() {
    this.edit.emit(this._book);
  }

  onShowDetails() {
    this.details.emit(this._book);
  }
}
