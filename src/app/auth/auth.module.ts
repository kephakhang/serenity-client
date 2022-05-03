import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { ThemeModule } from '../@theme/theme.module';
import { LoginComponent } from './login/login.component';
import { NB_WINDOW, NbAlertModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbIconModule, NbInputModule, NbLayoutModule } from '@nebular/theme';
// import { LoginModule } from './login/login.module.ts.bak';
// import { RegisterModule } from './register/register.module';
// import { LogoutModule } from './logout/logout.module';
// import { RequestPasswordModule } from './request-password/request-password.module';
// import { ResetPasswordModule } from './reset-password/reset-password.module';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ThemeModule,
    FormsModule,
    NbAlertModule,
    NbButtonModule,
    NbCardModule,
    NbCheckboxModule,
    NbIconModule,
    NbInputModule,
    NbLayoutModule
    // LoginModule,
    // RegisterModule,
    // LogoutModule,
    // RequestPasswordModule,
    // ResetPasswordModule
  ],
  exports: [
    CommonModule,
    FormsModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AuthModule {
}
