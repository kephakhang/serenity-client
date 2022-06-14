import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { UserTableComponent } from './user/user.component';
import { TenantTableComponent } from './tenant/tenant.component';

const routes: Routes = [{
  path: '',
  component: AdminComponent,
  children: [
    {
      path: 'users',
      component: UserTableComponent,
    },
    {
      path: 'tenants',
      component: TenantTableComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }

export const routedComponents = [
  AdminComponent,
  UserTableComponent,
  TenantTableComponent,
];
