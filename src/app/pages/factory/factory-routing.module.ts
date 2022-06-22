import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FactoryComponent } from './factory.component';
import { CounterTableComponent } from './counter/counter.component';

const routes: Routes = [{
  path: '',
  component: FactoryComponent,
  children: [
    {
      path: 'counters',
      component: CounterTableComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FactoryRoutingModule { }

export const routedComponents = [
  FactoryComponent,
  CounterTableComponent
];
