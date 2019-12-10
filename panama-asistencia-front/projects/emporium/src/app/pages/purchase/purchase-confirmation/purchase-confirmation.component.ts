import { Component, OnInit } from '@angular/core';
import { DataPaService } from '../../../services/data-pa.service';
import { Deal, OptionPrice } from '../../../app.models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-purchase-confirmation',
  templateUrl: './purchase-confirmation.component.html',
  styleUrls: ['./purchase-confirmation.component.scss']
})
export class PurchaseConfirmationComponent implements OnInit {
  public sub: any;
  public deal: Deal;
  public deals: Deal;
  public selected: OptionPrice;
  public response:any;
  constructor( public dataPaService: DataPaService,
               public activatedRoute: ActivatedRoute) { 
                this.response = JSON.parse(localStorage.getItem('response'));
               }

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => { 
      this.getDealById(params['id'], params['opId']); 
    }); 
    this.getDeals();
    //console.log(this.response);
  }

  public getDeals(){
    this.dataPaService.getData().subscribe(
      data => {
        this.deals = data['deals'];
      },
      (err) => {
        console.log (err.message);
      }
    );
  }

  public getDealById(id,opId){
    this.dataPaService.getData().subscribe(data=>{
      let aux:Array<Deal> = data['deals'];
      for (let i = 0; i < aux.length; i++) {
        if (aux[i].id == id) {
          this.deal = aux[i];
          let aux2:Array<OptionPrice> = this.deal.option_pricings;
          for (let j = 0; j < aux2.length; j++){
            if(aux2[j].id==opId){
              this.selected = this.deal.option_pricings[j];
              j = aux2.length;
            }
          }
          i = aux.length;
        }
      }
    })
  }

}
