import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import './ckeditor.loader';
import 'ckeditor';
import {
  NbComponentStatus,
  NbGlobalLogicalPosition,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
} from '@nebular/theme';

import { ToasterConfig } from 'angular2-toaster';
import { PriceOptionResquestModel } from 'projects/ngx-admin/src/model/price_option/request/price_option-request.model';
 import { PriceOptionService } from '../../../../../service/price_option.service';
 import { DealService } from '../../../../../service/deal.service';


@Component({
  selector: 'app-options-form',
  styleUrls: ['./form-options.component.scss'],
  templateUrl: './form-options.component.html',
})
export class FormOptionsComponent {

  optionPricingForm: FormGroup;
  deals: Array<any>;
  seleccionada;
  private optionPricingRequest: PriceOptionResquestModel;
  constructor(private fb: FormBuilder, private toastrService: NbToastrService,private dealService: DealService ) {
    this.dealService.getDeals().toPromise().then(
      response => {
        console.log(response);
        this.deals= new Array();
        this.deals = response.data.deals;
        
        this.optionPricingForm.controls['deals'].setValue(this.deals[0]);
      }
    ).catch(
      /*error => {
        this.spinner_service.close();
        this.notification_service.showError('Error', error.error);
      }*/
    );
  }

  config: ToasterConfig;

  index = 1;
  destroyByClick = true;
  duration = 3000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status: NbComponentStatus = 'primary';

  title = 'Oops Hemos hecho algo mal';
  content = `Oferta no se puede crear por falta de imagen!`;


  ngOnInit() {
    this.optionPricingForm = this.fb.group({
      original: ['', Validators.required],
      discount: ['', Validators.required],
      user_purchase_limit: ['', Validators.required],
      user_purchase_gift_limit: ['', Validators.required],
      purchase_activation: ['', Validators.required],
      description: ['', Validators.required],
      amount_credit: ['', Validators.required],
      effective_date: ['', Validators.required],
      closing_date: ['', Validators.required],
      status: ['', Validators.required],
      courtesy: ['', Validators.required],
      deals: ['', Validators.required]

    });

  }


  getValues() {
    console.log(this.optionPricingForm.controls.deals.value);
    
     this.optionPricingRequest = new PriceOptionResquestModel();
     this.optionPricingRequest.original=this.optionPricingForm.controls.original.value;
     this.optionPricingRequest.discount=this.optionPricingForm.controls.discount.value;
     this.optionPricingRequest.user_purchase_limit=this.optionPricingForm.controls.user_purchase_limit.value;
     this.optionPricingRequest.user_purchase_gift_limit=this.optionPricingForm.controls.user_purchase_gift_limit.value;
     this.optionPricingRequest.purchase_activation=this.optionPricingForm.controls.purchase_activation.value;
     this.optionPricingRequest.description=this.optionPricingForm.controls.description.value;
     //this.optionPricingRequest.amount_credit=this.optionPricingForm.controls.amount_credit.value;
     this.optionPricingRequest.effective_date=this.optionPricingForm.controls.effective_date.value;
     this.optionPricingRequest.closing_date=this.optionPricingForm.controls.closing_date.value;
     this.optionPricingRequest.status=this.optionPricingForm.controls.status.value;
     this.optionPricingRequest.courtesy=this.optionPricingForm.controls.courtesy.value;
     this.optionPricingRequest.deal_id=this.optionPricingForm.controls.deals.value;
     console.log(this.optionPricingRequest);
     

    
  //  // this.saveDeal(this.optionPricingRequest);
  }


  // saveDeal(optionPricingRequest: PriceOptionResquestModel) {
   
  //   this.pricingSvc.savePriceOption(optionPricingRequest).toPromise().then(output => {

  //     console.log(output);
      
  //   }).catch((error) => {
  //     this.makeToast();
  //     console.log(error);
  //   });

    




   
  //   /*if (this.optionPricingForm.status === 'VALID') {
  //     console.log('hola');
  //   } else {
  //     console.log('hola2222');
  //   }*/
  // }

  private makeToast() {
    this.showToast(this.status, this.title, this.content);
  }

  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };
    const titleContent = title ? `. ${title}` : '';

    this.index += 1;
    this.toastrService.show(
      body,
      `${titleContent}`,
      config);
  }




}
