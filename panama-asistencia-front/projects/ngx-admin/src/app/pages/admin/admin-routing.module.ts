import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { FormCommerceComponent } from './commerce/form-commerce/form-commerce.component';
import { FormCompanyComponent } from './company/form-company/form-company.component';
import { TableCompanyComponent } from './company/table-company/table-company.component';
import { TableCommerceComponent } from './commerce/table-commerce/table-commerce.component';
import { TableUserComponent } from './user/table-user/table-user.component';
import { FormUserComponent } from './user/form-user/form-user.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { EditCommerceComponent } from './commerce/edit-commerce/edit-commerce.component';
import { EditCompanyComponent } from './company/edit-company/edit-company.component';



const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [

    // Rutas de Comercio
      {
        path: 'commerces',
        component: FormCommerceComponent,
      },

      {
        path: 'table-commerce',
        component: TableCommerceComponent,
      },
            
      {
        path: 'edit-commerce',
        component: EditCommerceComponent,
      },
    // Rutas de Compañías
      {
        path: 'company',
        component: FormCompanyComponent,
      },

      {
        path: 'table-company',
        component: TableCompanyComponent,
      },
      {
        path: 'edit-company',
        component: EditCompanyComponent,
      },
    // Rutas de Usuarios
      {
        path: 'users',
        component: FormUserComponent,
      },

      {
        path: 'table-user',
        component: TableUserComponent,
      },
      
      {
        path: 'edit-user',
        component: EditUserComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class AdminRoutingModule {
}

