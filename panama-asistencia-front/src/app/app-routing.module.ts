import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmporiumSharedModule } from 'projects/emporium/src/app/app.module';
import { NgxAdminSharedModule } from 'projects/ngx-admin/src/app/app.module';


const routes: Routes = [
  {path: 'ngx-admin', 
    loadChildren: () => import('../../projects/ngx-admin/src/app/app.module')
    .then(m => m.NgxAdminSharedModule)
  },
  {path: 'emporium', 
  loadChildren: () => import('../../projects/emporium/src/app/app.module')
    .then(m => m.EmporiumSharedModule)
  },
  { path: '**', redirectTo: '/emporium'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    EmporiumSharedModule.forRoot(),
    NgxAdminSharedModule.forRoot()  
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
