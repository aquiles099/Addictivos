import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: NbAuthService, private router: Router) {
  }

  canActivate() {
    return this.authService.isAuthenticated().pipe(
      tap(authenticated => {
        if (!authenticated) {
          this.router.navigate(['auth/login']);
        }/* else {
          console.log('aqui');
          let user = JSON.parse(localStorage.getItem('user'));
          console.log(user.role);
          this.router.navigate(['pages/dashboard']);
          
                      if (user.role !== 'Root' || user.role !== 'Administrador') {
                        console.log(user.role);
                        //this.router.navigate(['/']);
                      }
                    }
        }*/
      }),
    );
  }

}

