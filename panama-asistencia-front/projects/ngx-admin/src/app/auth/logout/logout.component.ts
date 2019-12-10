import { Component, OnInit } from '@angular/core';
import { NbLogoutComponent } from '@nebular/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
//export class LogoutComponent extends NbLogoutComponent implements OnInit {
  export class LogoutComponent implements OnInit {
  
    constructor(public router: Router){
      
    }

  ngOnInit() {
    
    localStorage.clear();
    localStorage.removeItem('auth_app_token');
    this.router.navigateByUrl('/auth/login');
  }
}
