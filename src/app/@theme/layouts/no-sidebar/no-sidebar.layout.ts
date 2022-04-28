import { Component } from '@angular/core';

@Component({
  selector: 'ngx-no-sidebar-layout',
  styleUrls: ['./no-sidebar.layout.scss'],
  template: `
   <ng-content select="router-outlet"></ng-content>
    <!--nb-layout windowMode>
      <nb-layout-header fixed>
        <ngx-header></ngx-header>
      </nb-layout-header>

      <nb-sidebar class="menu-sidebar" tag="menu-sidebar" responsive>
        <ng-content select="nb-menu"></ng-content>
      </nb-sidebar>

      <nb-layout-column>
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>

      <nb-layout-footer fixed>
        <ngx-footer></ngx-footer>
      </nb-layout-footer>
    </nb-layout-->
  `,
})
export class NoSidebarLayoutComponent {}
