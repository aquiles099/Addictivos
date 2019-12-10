import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPaymentComponent } from './admin-payment.component';
import { FormPaymentComponent } from './form-payment/form-payment.component';
import { TablePaymentComponent } from './table-payment/table-payment.component';
import { AdminPaymentRoutingModule } from './admin-payment-routing.module';
import { ThemeModule } from '../../@theme/theme.module';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule, MatTableModule, MatPaginatorModule, MatInput, MatInputModule } from '@angular/material';
import { NbCardModule, NbInputModule, NbButtonModule, NbActionsModule, NbUserModule, NbCheckboxModule, NbRadioModule, NbDatepickerModule, NbSelectModule, NbIconModule, NbAlertModule, NbToastrModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbAuthModule } from '@nebular/auth';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PaymentService } from 'projects/ngx-admin/src/service/payment.service';
//import { NgxLoadingModule } from 'ngx-loading';

@NgModule({

  imports: [
    AdminPaymentRoutingModule,
    CommonModule,
    ThemeModule,
    RouterModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    NbSelectModule,
    NbIconModule,
    FormsModule,
    NbAuthModule,
    NbAlertModule,
    NbToastrModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    //NgxLoadingModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule
  ],

  declarations: [
    AdminPaymentComponent,
    FormPaymentComponent,
    TablePaymentComponent,
   
  ],
  providers: [
    PaymentService
  ],
 
})
export class AdminPaymentModule { }
