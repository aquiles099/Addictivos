import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../../shared/shared.module';
import { PipesModule } from '../../theme/pipes/pipes.module';

import { DealsDetailsComponent } from './deals-details.component';
import { DealComponent } from './deal/deal.component';
import { DealZoomComponent } from './deal/deal-zoom/deal-zoom.component';
import { SlugifyPipe } from '../../theme/utils/slugify.pipe';

export const routes = [
  { path: '', component: DealsDetailsComponent, pathMatch: 'full' },
  { path: ':name', component: DealsDetailsComponent },
  { path: ':id/:short_title', component: DealComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    SwiperModule,
    NgxPaginationModule,
    SharedModule,
    PipesModule
  ],
  declarations: [
    DealsDetailsComponent,
    DealComponent,
    DealZoomComponent
  ],
  entryComponents:[
    DealZoomComponent
  ],
  providers:[
    SlugifyPipe
  ]
})
export class DealsDetailsModule { }
