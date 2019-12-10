import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from 'ng2-ckeditor';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import {
  NbAccordionModule,
  NbButtonModule,
  NbCardModule,
  NbListModule,
  NbRouteTabsetModule,
  NbStepperModule,
  NbTabsetModule, NbUserModule,
  NbSelectModule,
  NbInputModule,
  NbActionsModule,
  NbCheckboxModule,
  NbRadioModule,
  NbDatepickerModule,
  NbIconModule,
  
  
} from '@nebular/theme';
import { MatFormFieldModule, MatTableModule, MatPaginatorModule, MatInput, MatInputModule } from '@angular/material';


import { ThemeModule } from '../../@theme/theme.module';
import { AdminDealRoutingModule } from './admin-deal-routing.module';
import { AdminDealComponent } from './admin-deal.component';
import { FormDealsComponent } from './deals/form-deals/form-deals.component';
import { TableDealsComponent } from './deals/table-deals/table-deals.component';
import { DealService } from '../../../service/deal.service';
import {CompanyService } from '../../../service/company.service';
import { ComerceService } from '../../../service/comerce.service';
import { CategoryService } from 'projects/ngx-admin/src/service/category.service';
import { TableOptionsComponent } from './pricing-options/table-pricing-options/table-options.component';
import { FormOptionsComponent } from './pricing-options/form-pricing-options/form-options.component';



@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    NbTabsetModule,
    NbRouteTabsetModule,
    NbStepperModule,
    NbCardModule,
    NbButtonModule,
    NbListModule,
    NbAccordionModule,
    NbUserModule,
    AdminDealRoutingModule,
    NbSelectModule,
    NbInputModule,
    NbActionsModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    NbIconModule,
    CKEditorModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule
    
  
  ],
  declarations: [
    AdminDealComponent,
    FormDealsComponent,
    TableDealsComponent,
    TableOptionsComponent,
    FormOptionsComponent
  ],
  providers: [
    DealService,
    CompanyService,
    ComerceService,
    CategoryService
    
    
  ],
})
export class AdminDealModule { }
