import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule, NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
  NbAlertModule,

} from '@nebular/theme';

import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { FormCommerceComponent } from './commerce/form-commerce/form-commerce.component';
import { FormCompanyComponent } from './company/form-company/form-company.component';
import { TableCompanyComponent } from './company/table-company/table-company.component';
import { TableCommerceComponent } from './commerce/table-commerce/table-commerce.component';
import { FormUserComponent } from './user/form-user/form-user.component';
import { TableUserComponent } from './user/table-user/table-user.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NbAuthModule } from '@nebular/auth';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ComerceService } from '../../../service/comerce.service';
import { AdminService } from './admin.service';
import { MatTableModule,
        MatPaginatorModule, 
        MatFormFieldModule, 
        MatInputModule, 
        MatIconModule, 
        MatMenuModule,
        MatProgressSpinnerModule} from '@angular/material';
import { UserService } from 'projects/ngx-admin/src/service/user.service';
import {CompanyService } from '../../../service/company.service';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { EditCommerceComponent } from './commerce/edit-commerce/edit-commerce.component';
import { EditCompanyComponent } from './company/edit-company/edit-company.component';


@NgModule({
  imports: [
    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    AdminRoutingModule,
    NbSelectModule,
    NbIconModule,
    Ng2SmartTableModule,
    NbSelectModule,
    CommonModule,
    FormsModule,
    RouterModule,
    NbAuthModule,
    NbAlertModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatMenuModule

    
  ],
  declarations: [
    AdminComponent,
    FormCommerceComponent,
    FormCompanyComponent,
    TableCommerceComponent,
    TableCompanyComponent,
    FormUserComponent,
    TableUserComponent,
    EditUserComponent,
    EditCommerceComponent,
    EditCompanyComponent,
  ],
  providers: [
    ComerceService,
    AdminService,
    UserService,
    CompanyService


  ],
})
export class AdminModule { }
