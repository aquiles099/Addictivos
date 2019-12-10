import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import './ckeditor.loader';
import 'ckeditor';
import {DealResquestModel} from '../../../../../model/deal/request/deal-request.model';
import { DealService } from '../../../../../service/deal.service';
import { ComerceService } from '../../../../../service/comerce.service';
import { CategoryService } from '../../../../../service/category.service';
import { CompanyService } from '../../../../../service/company.service';

import {
  NbComponentStatus,
  NbGlobalLogicalPosition,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
} from '@nebular/theme';

import { ToasterConfig } from 'angular2-toaster';


@Component({
  selector: 'app-deals-form',
  styleUrls: ['./form-deals.component.scss'],
  templateUrl: './form-deals.component.html',
})
export class FormDealsComponent {

  dealForm: FormGroup;
  comerces = [];
  categorys = [];
  companys = [];
  private dealRequest: DealResquestModel;
  constructor(private fb: FormBuilder, 
              private dealService: DealService, 
              private toastrService: NbToastrService,
              private comerce_service: ComerceService,
              private category_service: CategoryService,
              private company_service: CompanyService,
              
              ) {

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
    this.dealForm = this.fb.group({
      short_title: ['', Validators.required],
      long_title: ['', Validators.required],
      effective_date: ['', Validators.required],
      deal_total_limit: ['', Validators.required],
      user_purchase_limit: ['', Validators.required],
      short_description: ['', Validators.required],
      long_description: ['', Validators.required],
      restrictions: ['', Validators.required],
      commerce_id: ['', Validators.required],
      category_id: ['', Validators.required],
      //slug: ['', Validators.required],
      closing_date: ['', Validators.required],
      is_public: ['', Validators.required],
      available_until: ['', Validators.required],
      gift_title: ['', Validators.required],
      user_gift_limit: ['', Validators.required],
      discount: ['', Validators.required],
      payment_type: ['', Validators.required],
      deal_type_id: ['', Validators.required],
      commission: ['', Validators.required],
      seller_id: ['', Validators.required],
      company_id: ['', Validators.required],

    });



    this.comerce_service.getComerce().toPromise().then(
      response => {
        console.log(response);
        
        this.comerces = response.data.commerce.original;

        console.log(this.comerces);
        
        
      }
    ).catch(
      /*error => {
        this.spinner_service.close();
        this.notification_service.showError('Error', error.error);
      }*/
    );

    this.category_service.getCategories().toPromise().then(
      response => {
        console.log(response);
        
        this.categorys = response.data.categories;
        
      }
    ).catch(
      /*error => {
        this.spinner_service.close();
        this.notification_service.showError('Error', error.error);
      }*/
    );

    this.company_service.getCompany().toPromise().then(
      response => {
        console.log(response);
        
        this.companys = response.data.company.original;
        
      }
    ).catch(
      /*error => {
        this.spinner_service.close();
        this.notification_service.showError('Error', error.error);
      }*/
    );


  }


  getValues() {

    /*console.log(this.dealForm.controls.commerce_id.value);
    console.log(this.dealForm.controls.category_id.value);
    console.log(this.dealForm.controls.company_id.value);*/
    
    this.dealRequest = new DealResquestModel();
    this.dealRequest.short_title=this.dealForm.controls.short_title.value;
    this.dealRequest.long_title=this.dealForm.controls.long_title.value;
    this.dealRequest.effective_date= this.convertDate(this.dealForm.controls.effective_date.value);
    this.dealRequest.deal_total_limit=this.dealForm.controls.deal_total_limit.value;
    this.dealRequest.user_purchase_limit=this.dealForm.controls.user_purchase_limit.value;
    this.dealRequest.short_description=this.dealForm.controls.short_description.value;
    this.dealRequest.long_description=this.dealForm.controls.long_description.value;
    this.dealRequest.restrictions=this.dealForm.controls.restrictions.value;
    this.dealRequest.commerce_id=this.dealForm.controls.commerce_id.value;
    this.dealRequest.category_id=this.dealForm.controls.category_id.value;
    this.dealRequest.is_public=this.dealForm.controls.is_public.value;
    this.dealRequest.available_until=this.convertDate(this.dealForm.controls.available_until.value); 
    this.dealRequest.gift_title=this.dealForm.controls.gift_title.value;
    this.dealRequest.commission=this.dealForm.controls.commission.value;    
    this.dealRequest.closing_date=this.convertDate(this.dealForm.controls.closing_date.value);       
    //this.dealRequest.user_gift_limit=this.dealForm.controls.user_gift_limit.value;
    //this.dealRequest.discount=this.dealForm.controls.discount.value;
    this.dealRequest.deal_type_id=this.dealForm.controls.deal_type_id.value;
    this.dealRequest.payment_type=this.dealForm.controls.payment_type.value;
//    this.dealRequest.seller_id=this.dealForm.controls.seller_id.value;
    this.dealRequest.company_id=this.dealForm.controls.company_id.value;

    console.log(this.dealRequest);      
    this.saveDeal(this.dealRequest);
  }


  saveDeal(dealRequest: DealResquestModel) {
    /*console.log(this.dealForm.controls.short_title.value);
    console.log(this.dealForm.controls.long_title.value);
    console.log(this.dealForm.controls.effective_date.value);
    console.log(this.dealForm.controls.deal_total_limit.value);
    console.log(this.dealForm.controls.user_purchase_limit.value);
    console.log(this.dealForm.controls.short_description.value);
    console.log(this.dealForm.controls.long_description.value);
    console.log(this.dealForm.controls.restrictions.value);
    console.log(this.dealForm.controls.commerce_id.value);
    console.log(this.dealForm.controls.category_id.value);    
    console.log(this.dealForm.controls.closing_date.value);
    console.log(this.dealForm.controls.is_public.value);
    console.log(this.dealForm.controls.available_until.value);
    console.log(this.dealForm.controls.gift_title.value);
    console.log(this.dealForm.controls.user_gift_limit.value);
    console.log(this.dealForm.controls.discount.value);
    console.log(this.dealForm.controls.deal_type_id.value);
    console.log(this.dealForm.controls.payment_type.value);
    console.log(this.dealForm.controls.seller_id.value);
    console.log(this.dealForm.controls.company_id.value);*/

    /*this.dealService.saveDeal(dealRequest).subscribe((result) => {

      console.log(result);
      
    });*/

    this.dealService.saveDeal(dealRequest).toPromise().then(output => {

      console.log(output);
      
    }).catch((error) => {
      this.makeToast();
      console.log(error);
    });

    




   
    /*if (this.dealForm.status === 'VALID') {
      console.log('hola');
    } else {
      console.log('hola2222');
    }*/
  }

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


  convertDate(date){
    var splittedHours = date.toString().split(" ", 7); 
    var splittedDate = date.toLocaleString().split("/", 7); 
    console.log(splittedHours[3]+"-"+splittedDate[0]+"-"+splittedDate[1]+" "+splittedHours[4]);
    return splittedHours[3]+"-"+splittedDate[1]+"-"+splittedDate[0]+" "+splittedHours[4];
  }

}


