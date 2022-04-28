import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { RequestPasswordComponent } from './request-password.component';


@NgModule({
  declarations: [RequestPasswordComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: RequestPasswordComponent
      }
    ])
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class RequestPasswordModule { }
