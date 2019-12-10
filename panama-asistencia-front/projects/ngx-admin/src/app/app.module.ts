/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
//import { NgxLoadingModule } from 'ngx-loading';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
  
} from '@nebular/theme';

import { AuthModule } from './auth/auth.module';
import { NbPasswordAuthStrategy, NbAuthModule } from '@nebular/auth';
import { AuthOptions } from './auth/auth.options';
import { AuthGuard } from './auth/auth-guard.service';
//import { HomePageComponent } from './home-page/home-page.component';
import { SharedModule } from 'projects/emporium/src/app/shared/shared.module';
import { PagesGuard } from './pages/pages-guard.service';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,

    ThemeModule.forRoot(),

    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
    NbAuthModule.forRoot(AuthOptions),
    AuthModule,
    SharedModule,
    //NgxLoadingModule
  ],
  bootstrap: [AppComponent],
  providers:[
    AuthGuard, 
    PagesGuard
  ]
})
export class AppModule {
}

@NgModule({})
export class NgxAdminSharedModule{
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppModule,
      providers: [
        AuthGuard,
        PagesGuard
      ]
    }
  }
}