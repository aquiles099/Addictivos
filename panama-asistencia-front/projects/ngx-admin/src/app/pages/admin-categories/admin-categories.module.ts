import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminCategoriesComponent } from './admin-categories.component';
import { FormCategoriesComponent } from './form-categories/form-categories.component';
import { TableCategoriesComponent } from './table-categories/table-categories.component';
import { RouterModule } from '@angular/router';
import { AdminCategoriesRoutingModule } from './admin-categories-routing.module';
import { ThemeModule } from '../../@theme/theme.module';
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
  NbAlertModule } from '@nebular/theme';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTableModule, 
         MatPaginatorModule, 
         MatFormFieldModule, 
         MatInputModule, 
         MatIconModule, 
         MatMenuModule} from '@angular/material';
import { CategoryService } from 'projects/ngx-admin/src/service/category.service';
import { EditCategoryComponent } from './edit-category/edit-category.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AdminCategoriesRoutingModule,

    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    NbSelectModule,
    NbIconModule,
    NbSelectModule,
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule
  ],
  declarations: [
    AdminCategoriesComponent,
    FormCategoriesComponent,
    TableCategoriesComponent,
    EditCategoryComponent
  ],
  providers: [
    CategoryService
  ],
})
export class AdminCategoriesModule { }
