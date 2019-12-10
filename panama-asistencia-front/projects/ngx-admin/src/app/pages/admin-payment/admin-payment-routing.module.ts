import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminPaymentComponent } from './admin-payment.component';
import { FormPaymentComponent } from './form-payment/form-payment.component';
import { TablePaymentComponent } from './table-payment/table-payment.component';


const routes: Routes = [
  {
    path: '',
    component: AdminPaymentComponent,
    children: [
    
      {
        path: 'payment',
        component: FormPaymentComponent,
      },

      {
        path: 'table-payment',
        component: TablePaymentComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
})
export class AdminPaymentRoutingModule {
}

