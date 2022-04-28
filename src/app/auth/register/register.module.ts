import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './register.component';


@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: RegisterComponent
      }
    ])
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class RegisterModule { }
