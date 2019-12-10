import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPurchasesComponent } from './admin-purchases.component';
import { FormPurchaseComponent } from './form-purchase/form-purchase.component';
import { TablePurchaseComponent } from './table-purchase/table-purchase.component';


const routes: Routes = [
  {
    path: '',
    component: AdminPurchasesComponent,
    children: [
    
      {
        path: 'purchase',
        component: FormPurchaseComponent,
      },

      {
        path: 'table-purchase',
        component: TablePurchaseComponent,
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
export class AdminPurchasesRoutingModule {
}

