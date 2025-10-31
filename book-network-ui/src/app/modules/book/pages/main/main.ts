import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Menu } from '../../components/menu/menu'; // It is necessary to import menu component and add it in th eimports array

@Component({
  selector: 'app-main',
  imports: [Menu, RouterModule],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {}
