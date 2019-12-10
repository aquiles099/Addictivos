import { Component, OnInit, ViewChild  } from '@angular/core';
import { DataPaService } from '../../services/data-pa.service';
import { OptionPrice, Deal, Card, Purchase } from '../../app.models';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AppService } from '../../app.service';
import { MatExpansionPanel } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { PurchaseService } from '../../services/purchase.service';
import { User } from 'projects/ngx-admin/src/app/app.models';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss'],
})
export class PurchaseComponent implements OnInit {
  
  @ViewChild(MatExpansionPanel, { static: true }) addCard: MatExpansionPanel;
  public subscription;
  public subscription2;
  public deal: Deal;
  public option: OptionPrice;
  public count: number;
  public sub: any;
  public cards: Array<Card>;
  public user: User;
  public userCard: Card;
  public purchase: Purchase;
  public submitted= false;
  public totalAmount:number;
  public ip:string;
  public deviceInfo:any;

  public card: Card;
  options: FormGroup;
  paymentForm: FormGroup;
  months = [];
  years = [];

  constructor(public dataPaService: DataPaService, 
              public appService:AppService,
              public formBuilder: FormBuilder, 
              fb: FormBuilder,
              public activatedRoute: ActivatedRoute,
              public userService: UserService,
              public purchaseService: PurchaseService,
              public router: Router,
              private deviceService: DeviceDetectorService) {
    //this.subscription = this.dataPaService.getDeal().subscribe(data => this.deal = data);
    //this.subscription2 = this.dataPaService.getOption().subscribe(option => this.option = option);
    //this.options = fb.group({ quantity: [1, Validators.min(1)], });
    this.deal = JSON.parse(localStorage.getItem("deal"));
    this.option = JSON.parse(localStorage.getItem("option"));
    this.user= JSON.parse(localStorage.getItem("user"));
    this.deviceInfo = this.deviceService.getDeviceInfo();
  }

  ngOnInit() {
    this.cards = [];
    this.submitted = false;
    this.count = 1;
    this.sub = this.activatedRoute.params.subscribe(params => {
      //console.log(params['name']);
    });
    
    this.months = this.appService.getMonths();
    this.years = this.appService.getYears();
    //this.cards = this.currentUser.cards;

    this.paymentForm = this.formBuilder.group({
      cardHolderName: ['', Validators],
      cardNumber: ['', Validators.compose([Validators.required, Validators.minLength(16), Validators.maxLength(16), Validators.pattern('[0-9]*')]) ],
      cardType: [null , Validators.required],
      expiredMonth: ['', Validators.required],
      expiredYear: ['', Validators.required],
      //cvv: ['', Validators.required]
    });

    this.getCards(this.user.id);
    this.purchaseService.getIPAddress().subscribe(data=>{ 
      this.ip = data['ip'];
    });
    
  }

  public getCards(id:number){
    this.userService.getUserCards(id).subscribe(
      data =>{
        this.cards = data;
        this.userCard = this.cards[0];
        //console.log(this.cards);
      },
      (err) => {
        console.log (err.message);
      }
    );
  }

  public addUserCard(){
    this.submitted = true
    let date: string = this.paymentForm.controls.expiredMonth.value+'/'+this.paymentForm.controls.expiredYear.value;
    this.card = new Card(
      this.user.id, 
      this.paymentForm.controls.cardNumber.value,
      this.paymentForm.controls.cardType.value,
      1,
      '0',
      date 
    );

    this.userService.saveUserCard(this.user.id, this.card);
    this.addCard.close();
    setTimeout(() => {
      this.ngOnInit();
  }, 200);
    
  }

  public addCount() {
    this.count++;
  }

  public subCount() {
    if (this.count > 1) {
      this.count--;
    }
  }
  public hideToggle() {

  }

  public async deleteCard(idCard: number){
    this.userService.deleteUserCard(this.user.id, idCard);
    this.cards = [];
     setTimeout(() => {
         this.ngOnInit();
     }, 500);

  }

  public createPurchase(){
    let total = this.option.discount * this.count;
    this.purchase = new Purchase(
      total,
      this.userCard['id'],
      this.deal.id,
      this.option.id,
      this.count,
      this.user.id,
      this.user.name,
      this.user.email,
      'the note',
      this.getDevice(),
      this.deviceInfo['os'],
      1,
      'version',
      this.ip,
      this.deviceInfo['browser'],
      1
    );
    this.purchaseService.savePurchase(this.purchase);

    this.router.navigate(['/purchase', this.deal.id, this.deal.short_title, this.option.id]);
  }

  public getDevice(){
    if (this.deviceService.isDesktop() == true) {
      return 'desktop';
    }else{
      if (this.deviceService.isMobile() ==true) {
        return 'movil';
      }else{
        if (this.deviceService.isTablet() == true) {
          return 'tablet';
        }else{
          return 'unknown';
        }
      }
    }
  }

}
