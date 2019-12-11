import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminDealComponent } from './admin-deal.component';
import { FormDealsComponent } from './deals/form-deals/form-deals.component';
import { TableDealsComponent } from './deals/table-deals/table-deals.component';
import { TableOptionsComponent } from './pricing-options/table-pricing-options/table-options.component';
import { FormOptionsComponent } from './pricing-options/form-pricing-options/form-options.component';


const routes: Routes = [
  {
    path: '',
    component: AdminDealComponent,
    children: [
    
      {
        path: 'deals',
        component: FormDealsComponent,
      },

      {
        path: 'table-deals',
        component: TableDealsComponent,
      },
      {
        path: 'table-option',
        component: TableOptionsComponent,
      },
      {
        path: 'table-option-create',
        component: FormOptionsComponent,
      },
    ],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminDealRoutingModule {
}

