import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { PurchaseComponent } from './purchase.component';
import { PurchaseConfirmationComponent } from './purchase-confirmation/purchase-confirmation.component';

export const routes = [
  { path: '', component: PurchaseComponent, pathMatch: 'full' },
  { path: ':name', component: PurchaseComponent },
  { path: ':id/:short_title/:opId', component: PurchaseConfirmationComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    PurchaseComponent,
    PurchaseConfirmationComponent
  ], 
  exports:[
    SharedModule
  ]
  
})

export class PurchaseModule {}