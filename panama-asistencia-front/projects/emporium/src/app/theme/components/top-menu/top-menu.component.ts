import { Component, OnInit, ViewChild } from '@angular/core';
import { Data, AppService } from '../../../app.service';
import { MatMenuTrigger } from '@angular/material';
import { UserModel } from 'projects/ngx-admin/src/model/user/response/userModel.model';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html'
})
export class TopMenuComponent implements OnInit {

  //@ViewChild('currencyMenuTrigger', {static: true}) currencyMenuTrigger:MatMenuTrigger;
  public show: boolean;
  public currencies = ['USD', 'EUR'];
  public currency:any;
  public flags = [
    { name:'Inglés', image: 'assets/images/flags/gb.svg' },
    { name:'Español', image: 'assets/images/flags/es.svg' },
  ]
  public flag:any;
  public user: UserModel;

  constructor(public appService:AppService) {
    this.user= JSON.parse(localStorage.getItem("user"));
  
  }

  ngOnInit() {
    this.currency = this.currencies[0];
    this.flag = this.flags[0];  
    this.showAdmin();
  }

  public changeCurrency(currency){
    this.currency = currency;
  }

  public changeLang(flag){
    this.flag = flag;
  }

  public showAdmin(){
    if (this.user.role == 'Root' || this.user.role == 'Administrador'){
      this.show = true;
    } else{
      this.show = false;
    }
  }
  
//  public closeMenu(){this.currencyMenuTrigger.closeMenu();}

}
