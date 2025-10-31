import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [RouterModule],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu implements OnInit {
  ngOnInit(): void {
    const linkColor: NodeListOf<Element> = document.querySelectorAll('.nav-link');
    linkColor.forEach((link) => {
      // window.location.href -> This gives the full URL of current page.
      // link.getAttribute('href') -> This gets the value of the href attribute on each <a> tag.
      if (window.location.href.endsWith(link.getAttribute('routerLink') || '')) {
        link.classList.add('active');
      }
      link.addEventListener('click', () => {
        linkColor.forEach((l) => l.classList.remove('active'));
        link.classList.add('active');
      });
    });
  }

  logout(): void {}
}
