import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../../shared/shared.module';
import { PipesModule } from '../../theme/pipes/pipes.module';
import { PromoDetailsComponent } from './promo-details.component';
import { PromoComponent } from './promo/promo.component';
import { PromoZoomComponent } from './promo/promo-zoom/promo-zoom.component';
import { SlugifyPipe } from '../../theme/utils/slugify.pipe';

export const routes = [
  { path: '', component: PromoDetailsComponent, pathMatch: 'full' },
  { path: ':name', component: PromoDetailsComponent },
  { path: ':id/:short_title', component: PromoComponent }
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
    PromoDetailsComponent,
    PromoComponent,
    PromoZoomComponent
  ],
  entryComponents:[
    PromoZoomComponent
  ],
  providers:[
    SlugifyPipe
  ]
})
export class PromoDetailsModule { }
