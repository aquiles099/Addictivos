import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';
import { LoginComponent } from './auth/login/login.component';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './auth/auth-guard.service';
import { LogoutComponent } from './auth/logout/logout.component';
import { HomePageComponent } from 'projects/emporium/src/app/theme/components/home-page/home-page.component';
import { PagesGuard } from './pages/pages-guard.service';

const routes: Routes = [

  {
    path: 'HomePage',
    component: HomePageComponent,
  },
  { 
    path: 'pages',
    canActivate: [AuthGuard],
    canActivateChild: [PagesGuard],
    loadChildren: () => import('./pages/pages.module') 
      .then(m => m.PagesModule)
  },
  {
    path: 'auth',
    component: AuthComponent, 
    children: [
      { 
        path: '',
        component: LoginComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'logout',
        component: NbLogoutComponent,
      },
      {
        path: 'log-out',
        component: LogoutComponent,
      },
      {
        path: 'request-password',
        component: NbRequestPasswordComponent,
      },
      {
        path: 'reset-password',
        component: NbResetPasswordComponent,
      },
    ],
  },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: 'ngx-admin', redirectTo: 'pages' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
