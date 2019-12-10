import { Component, OnInit } from '@angular/core';
import { NbAuthComponent } from '@nebular/auth';

@Component({
  selector: 'ngx-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent extends NbAuthComponent implements OnInit {

  // constructor() { }

  ngOnInit() {
  }

}
