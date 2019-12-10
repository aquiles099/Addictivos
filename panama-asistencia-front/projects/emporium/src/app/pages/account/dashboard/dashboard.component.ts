import { Component, OnInit } from '@angular/core';
import { User } from 'projects/ngx-admin/src/app/app.models';
import { UserModel } from 'projects/ngx-admin/src/model/user/response/userModel.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public user: UserModel

  constructor() { 
    this.user= JSON.parse(localStorage.getItem("user"))
  }

  ngOnInit() {
  }

}
