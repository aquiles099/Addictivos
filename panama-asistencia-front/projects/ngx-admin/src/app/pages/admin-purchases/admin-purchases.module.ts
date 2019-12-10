import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPurchasesComponent } from './admin-purchases.component';
import { FormPurchaseComponent } from './form-purchase/form-purchase.component';
import { TablePurchaseComponent } from './table-purchase/table-purchase.component';
import { AdminPurchasesRoutingModule } from './admin-purchases-routing.modules';
import { ThemeModule } from '../../@theme/theme.module';
import { RouterModule } from '@angular/router';
import { NbCardModule, NbInputModule, NbActionsModule, NbButtonModule, NbCheckboxModule, NbUserModule, NbRadioModule, NbDatepickerModule, NbIconModule, NbSelectModule, NbToastrModule, NbAlertModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NbAuthModule } from '@nebular/auth';
import { MatTableModule, MatIconModule, MatPaginatorModule, MatFormFieldModule, MatInputModule } from '@angular/material';



@NgModule({
  
  imports: [
    CommonModule,
    AdminPurchasesRoutingModule,

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
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports:[

  ],
  declarations: [
    AdminPurchasesComponent,
    FormPurchaseComponent,
    TablePurchaseComponent
  ],
})
export class AdminPurchasesModule { }
