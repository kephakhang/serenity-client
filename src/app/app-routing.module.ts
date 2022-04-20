import { ExtraOptions, RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'
import { NbAuthComponent } from './auth/auth.component'
import { NbLoginComponent } from './auth/login/login.component'
import { NbLogoutComponent } from './auth/logout/logout.component'
import { NbRegisterComponent } from './auth/register/register.component'
import { NbRequestPasswordComponent } from './auth/request-password/request-password.component'
import { NbResetPasswordComponent } from './auth/reset-password/reset-password.component'

export const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
  },
  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        component: NbLoginComponent,
      },
      {
        path: 'login',
        component: NbLoginComponent,
      },
      {
        path: 'register',
        component: NbRegisterComponent,
      },
      {
        path: 'logout',
        component: NbLogoutComponent,
      },
      {
        path: 'request-password',
        component: NbRequestPasswordComponent,
      },
      {
        path: 'reset-password',
        component: NbResetPasswordComponent,
      },
    ],
  },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
]

const config: ExtraOptions = {
  useHash: false,
}

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
