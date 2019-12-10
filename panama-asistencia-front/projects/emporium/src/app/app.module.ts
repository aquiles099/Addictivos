import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AgmCoreModule } from '@agm/core';
import { DeviceDetectorModule } from 'ngx-device-detector';

import { OverlayContainer, Overlay } from '@angular/cdk/overlay';
import { MAT_MENU_SCROLL_STRATEGY, MatRadioModule } from '@angular/material';
import { CustomOverlayContainer } from './theme/utils/custom-overlay-container';
import { menuScrollStrategy } from './theme/utils/scroll-strategy';

import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { TopMenuComponent } from './theme/components/top-menu/top-menu.component';
import { MenuComponent } from './theme/components/menu/menu.component';
import { SidenavMenuComponent } from './theme/components/sidenav-menu/sidenav-menu.component';
import { BreadcrumbComponent } from './theme/components/breadcrumb/breadcrumb.component';

import { AppSettings } from './app.settings';
import { AppService } from './app.service';
import { AppInterceptor } from './theme/utils/app-interceptor';
import { OptionsComponent } from './theme/components/options/options.component';
import { FooterComponent } from './theme/components/footer/footer.component';

import { DataPaService } from './services/data-pa.service';
import { UserService } from './services/user.service';
import { NgModel, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HomePageComponent } from './theme/components/home-page/home-page.component';
import { SlugifyPipe } from './theme/utils/slugify.pipe';


const providers = [
  AppSettings,
  AppService,   
  { provide: OverlayContainer, useClass: CustomOverlayContainer },
  { provide: MAT_MENU_SCROLL_STRATEGY, useFactory: menuScrollStrategy, deps: [Overlay] },
  { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },
  DataPaService,
  UserService,
  NgModel,
  SlugifyPipe
]

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxSpinnerModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBNcjxo_35qnEG17dQvvftWa68eZWepYE0'
    }),
    SharedModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatRadioModule,
    DeviceDetectorModule.forRoot()

  ],
  declarations: [
    AppComponent,
    PagesComponent,
    NotFoundComponent,
    TopMenuComponent,
    MenuComponent,
    SidenavMenuComponent,
    BreadcrumbComponent,
    OptionsComponent,
    FooterComponent,
    HomePageComponent,
  ], 
  exports:[
    TopMenuComponent,
  ],
  providers: providers,
  bootstrap: [AppComponent]
})
export class AppModule { }

@NgModule({})
export class EmporiumSharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppModule,
      providers: [
        AppSettings,
        AppService,   
        { provide: OverlayContainer, useClass: CustomOverlayContainer },
        { provide: MAT_MENU_SCROLL_STRATEGY, useFactory: menuScrollStrategy, deps: [Overlay] },
        { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },
        DataPaService,
        UserService,
        NgModel,
        SlugifyPipe
      ]
    }
  }
}