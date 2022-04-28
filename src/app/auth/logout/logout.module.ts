import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { LogoutComponent } from './logout.component';



@NgModule({
  declarations: [LogoutComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: LogoutComponent
      }
    ])
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class LogoutModule { }
