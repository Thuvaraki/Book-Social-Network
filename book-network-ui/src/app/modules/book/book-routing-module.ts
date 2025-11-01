import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Main } from './pages/main/main';
import { BookList } from './pages/book-list/book-list';
import { MyBooks } from './pages/my-books/my-books';
import { ManageBooks } from './pages/manage-books/manage-books';

const routes: Routes = [
  {
    path: '',
    component: Main,
    children: [
      {
        path: '',
        component: BookList,
      },
      {
        path: 'my-books',
        component: MyBooks,
      },
      {
        path: 'manage',
        component: ManageBooks,
      },
      {
        path: 'manage/:bookId',
        component: ManageBooks,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookRoutingModule {}
