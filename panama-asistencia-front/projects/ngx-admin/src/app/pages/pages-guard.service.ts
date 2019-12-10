import { Injectable } from '@angular/core';
import { CanActivate, Router, CanActivateChild } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { tap } from 'rxjs/operators';

@Injectable()
export class PagesGuard implements CanActivateChild {

  constructor( private router: Router) {
  }

  canActivateChild() {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user.role == 'Root' || user.role == 'Administrador') {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}