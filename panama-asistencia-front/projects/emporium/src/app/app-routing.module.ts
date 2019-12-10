import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages/pages.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthGuard } from 'projects/ngx-admin/src/app/auth/auth-guard.service';

  export const routes: Routes = [
    // ... 
    { 
        path: '', 
        canActivate: [AuthGuard],
        component: PagesComponent
        , children: [
          { path: '', loadChildren: () => import('./pages/home/home.module')
            .then(m => m.HomeModule) 
          },
          { path: 'account',  loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule), data: { breadcrumb: 'Mi cuenta' } },
          { path: 'compare',  loadChildren: () => import('./pages/compare/compare.module').then(m => m.CompareModule), data: { breadcrumb: 'Compare' } },
          { path: 'wishlist', loadChildren: () => import('./pages/wishlist/wishlist.module').then(m => m.WishlistModule), data: { breadcrumb: 'Wishlist' } },
          { path: 'cart',     loadChildren: () => import('./pages/cart/cart.module').then(m => m.CartModule), data: { breadcrumb: 'Cart' } },
          { path: 'checkout', loadChildren: () => import('./pages/checkout/checkout.module').then(m => m.CheckoutModule), data: { breadcrumb: 'Checkout' } },
          { path: 'contact',  loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactModule), data: { breadcrumb: 'Contact' } },
          { path: 'sign-in',  loadChildren: () => import('./pages/sign-in/sign-in.module').then(m => m.SignInModule), data: { breadcrumb: 'Sign In ' } },
          { path: 'brands',   loadChildren: () => import('./pages/brands/brands.module').then(m => m.BrandsModule), data: { breadcrumb: 'Brands' } },
          { path: 'products', loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsModule), data: { breadcrumb: 'All Products' } },
          { path: 'deals',    loadChildren: () => import('./pages/deals-details/deals-details.module').then(m => m.DealsDetailsModule), data: { breadcrumb: 'Ofertas' } },
          { path: 'promos',   loadChildren: () => import('./pages/promo-details/promo-details.module').then(m => m.PromoDetailsModule), data: { breadcrumb: 'Promociones' } },
          { path: 'purchase', loadChildren: () => import('./pages/purchase/purchase.module').then(m => m.PurchaseModule), data: { breadcrumb: 'Resumen de compra' } },
        ]
    },
    // { path: 'auth', component: AuthComponent },
    // { path: 'login', component: LoginComponent },
    // { path: '**', component: NotFoundComponent },
  
    { path: 'emporium', redirectTo: '' }
  ];

  const config: ExtraOptions = {
    useHash: true,
  };

  @NgModule({
    imports: [RouterModule.forRoot(routes, config)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {
  }
  