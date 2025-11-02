import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BookRequest } from '../../../../services/models';
import { BookService } from '../../../../services/services/book.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-manage-books',
  imports: [FormsModule, CommonModule],
  templateUrl: './manage-books.html',
  styleUrl: './manage-books.scss',
})
export class ManageBooks implements OnInit {
  errMsg = signal<String[]>([]);
  selectedPicture = signal<string | undefined>(undefined);
  bookRequest: BookRequest = {
    authorName: '',
    isbn: '',
    synopsis: '',
    title: '',
    shareable: false,
  };
  selectedBookCover: any;

  constructor(
    private bookService: BookService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const bookId = Number(this.activatedRoute.snapshot.params['bookId']);
    if (bookId) {
      this.bookService.findById({ 'book-id': bookId }).then((book) => {
        this.bookRequest = {
          id: book.id,
          title: book.title as string,
          authorName: book.authorName as string,
          isbn: book.isbn as string,
          synopsis: book.synopsis as string,
          shareable: book.shareable,
        };
        this.selectedPicture.set('data:image/jpg;base64,' + book.cover);
      });
    }
  }

  saveBook() {
    this.bookService
      .saveBook({
        body: this.bookRequest,
      })
      .then((bookId) => {
        this.bookService
          .uploadBookCoverPicture({
            'book-id': bookId,
            body: {
              file: this.selectedBookCover,
            },
          })
          .then(() => {
            this.router.navigate(['/books/my-books']);
          });
      })
      .catch((err) => {
        console.log(err.error);
        this.errMsg.set(err.error.validationErrors);
      });
  }

  // Converts file → Base64 so preview image can show
  onFileSelected(event: any) {
    this.selectedBookCover = event.target.files[0];
    console.log('this.selectedBookCover', this.selectedBookCover);
    if (this.selectedBookCover) {
      const reader: FileReader = new FileReader();
      reader.onload = () => {
        // reader.onload is called when the file is fully read.
        this.selectedPicture.set(reader.result as string);
      };
      reader.readAsDataURL(this.selectedBookCover); // Converts the file to a Base64 string.
    }
  }
}

// FileReader is a built-in browser API to read file contents. Can read files as:
// Data URL → Base64 encoded string
// Text → plain text
// ArrayBuffer → binary data
