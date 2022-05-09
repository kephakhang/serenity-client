import { Component } from '@angular/core';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {

  menu = MENU_ITEMS;

  constructor(public auth: AuthServiceProvider) {
    this.auth.getjwt()
  }
}
