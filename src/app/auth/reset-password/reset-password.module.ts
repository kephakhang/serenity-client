import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ResetPasswordComponent } from './reset-password.component';


@NgModule({
  declarations: [ResetPasswordComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: ResetPasswordComponent
      }
    ])
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class ResetPasswordModule { }
