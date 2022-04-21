import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { RequestPasswordComponent } from './request-password.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: RequestPasswordComponent
      }
    ])
  ]
})
export class RequestPasswordModule { }
