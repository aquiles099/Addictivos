import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AuthRoutingModule } from './auth-routing.module';
import { NbAuthModule, NbTokenStorage, NbTokenLocalStorage } from '@nebular/auth';
import {
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbInputModule,
  NbLayoutModule,
  NbCardModule,
  NbIconModule,
} from '@nebular/theme';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';
import { RegisterComponent } from './register/register.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NbAuthModule,
    NbLayoutModule,
    NbCardModule,
    NbIconModule,
    FlexLayoutModule,
  ],
  exports: [
    LoginComponent,
    AuthComponent,
    RegisterComponent    
  ],
  declarations: [
    // ... here goes our new components
    LoginComponent,
    AuthComponent,
    RegisterComponent,
    LogoutComponent,
  ],
  providers:[
    { provide: NbTokenStorage, useClass: NbTokenLocalStorage },

  ],
}) 
export class AuthModule {
}
