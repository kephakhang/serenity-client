import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { ThemeModule } from '../@theme/theme.module';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { LogoutModule } from './logout/logout.module';
import { RequestPasswordModule } from './request-password/request-password.module';
import { ResetPasswordModule } from './reset-password/reset-password.module';

@NgModule({
  imports: [
    AuthRoutingModule,
    ThemeModule,
    LoginModule,
    RegisterModule,
    LogoutModule,
    RequestPasswordModule,
    ResetPasswordModule
  ],
  declarations: [
    AuthComponent,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AuthModule {
}
