import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import './ckeditor.loader';
import 'ckeditor';
import { Router } from '@angular/router';
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
import * as moment from "moment";

@Component({
  selector: 'app-deals-form',
  styleUrls: ['./form-deals.component.scss'],
  templateUrl: './form-deals.component.html',
})
export class FormDealsComponent {
  formData = new FormData();
  dealForm: FormGroup;
  // upload
  fileData: File = null;

  comerces:any[] = [];
  categorys:any[] = [];
  companys:any[] = [];
  types:any[]=[]
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

  private dealRequest: DealResquestModel;
  constructor(private router: Router,
              private fb: FormBuilder, 
              private dealService: DealService, 
              private toastrService: NbToastrService,
              private comerce_service: ComerceService,
              private category_service: CategoryService,
              private company_service: CompanyService,
              
              ) {

  }
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

    this.dealService.getTypes().toPromise().then(
      response => {
        if(response.code==200){
          this.types=response.data.types;
        }
       console.log("dealService gettype:",response);
      }
    ).catch(error => {
      console.log("error:",error);
        //this.spinner_service.close();
        //this.notification_service.showError('Error', error.error);
      }
    );

    this.comerce_service.getComerce().toPromise().then(
      response => {        
        this.comerces = response.data.commerce.original;        
      }
    ).catch(error => {
      console.log("error:",error);
        //this.spinner_service.close();
        //this.notification_service.showError('Error', error.error);
      }
    );

    this.category_service.getCategories().toPromise().then(
      response => {
        this.categorys = response.data.categories;
        
      }
    ).catch(error => {
      console.log("error:",error);
        //this.spinner_service.close();
        //this.notification_service.showError('Error', error.error);
      }
    );

    this.company_service.getCompany().toPromise().then(
      response => {
        
        this.companys = response.data.company.original;
      }
    ).catch(error => {
      console.log("error:",error);
        //this.spinner_service.close();
        //this.notification_service.showError('Error', error.error);
      }
    );


  }
  getFormData() {
    this.formData.append("short_title", this.dealForm.controls.short_title.value);
    this.formData.append("long_title", this.dealForm.controls.long_title.value);
    this.formData.append("effective_date", this.convertDate(this.dealForm.controls.effective_date.value));
    this.formData.append("deal_total_limit",this.dealForm.controls.deal_total_limit.value);
    this.formData.append("user_purchase_limit",this.dealForm.controls.user_purchase_limit.value);
    this.formData.append("short_description", this.dealForm.controls.short_description.value);
    this.formData.append("long_description", this.dealForm.controls.long_description.value);
    this.formData.append("restrictions", this.dealForm.controls.restrictions.value);
    this.formData.append("commerce_id", this.dealForm.controls.commerce_id.value);
    this.formData.append("category_id", this.dealForm.controls.category_id.value);
    this.formData.append("is_public",this.dealForm.controls.is_public.value);
    this.formData.append("available_until",this.convertDate(this.dealForm.controls.available_until.value));
    this.formData.append("gift_title", this.dealForm.controls.gift_title.value);
    this.formData.append("commission", this.dealForm.controls.commission.value);
    this.formData.append("closing_date", this.convertDate(this.dealForm.controls.closing_date.value));
    this.formData.append("deal_type_id", this.dealForm.controls.deal_type_id.value);
    this.formData.append("payment_type", this.dealForm.controls.payment_type.value);
    this.formData.append("company_id",this.dealForm.controls.company_id.value);
    this.formData.append("main_image",this.fileData);
    return this.formData;
  }

  saveDeal() {
    if(this.validateDates()){
      this.dealService.saveDeal(this.getFormData()).toPromise().then(output => {
        this.showToast("success", "Proceso Exitoso", "Oferta Agregada con exitos");
        setTimeout(() => {
          this.router.navigate(['/pages/admin-deal/table-deals']);
        }, 300);
      }).catch((error) => {
        this.makeToast();
        console.log(error);
      });
    }else{
        this.showToast(this.status, "Verifique las fechas", "Verifique que haya seleccionado las fechas correctamente");
    }
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
  validateDates(){
    if(moment(this.dealForm.controls.available_until.value,"DD-MM-YYYY HH:mm").format("DD-MM-YYYY HH:mm")>=moment(this.dealForm.controls.closing_date.value,"DD-MM-YYYY HH:mm").format("DD-MM-YYYY HH:mm") && moment(this.dealForm.controls.closing_date.value,"DD-MM-YYYY HH:mm").format("DD-MM-YYYY HH:mm")>moment(this.dealForm.controls.effective_date.value,"DD-MM-YYYY HH:mm").format("DD-MM-YYYY HH:mm")){
      return true;
    }
    return false;
  }

  convertDate(date){
    var splittedHours = date.toString().split(" ", 7); 
    var splittedDate = date.toLocaleString().split("/", 7); 
    return splittedHours[3]+"-"+splittedDate[1]+"-"+splittedDate[0]+" "+splittedHours[4];
  }
  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    // Only process image files.
      let errorMsj: string = "";
      if (!this.fileData.type.match("image.*")) {
        errorMsj +=
          "<div type='alert' class='invalid-feedback d-block'>Formato no permitido</div>";
        return;
      }
      let reader = new FileReader();
      // Closure to capture the file information.
      reader.onload = function(theFile: Event) {
        var image = new Image();
        image.src = `${reader.result}`;
        image.onload = function() {
          // access image size here

          if (image.width < 540 || image.height < 340) {
            if (image.width < 540) {
              errorMsj +=
                "<div type='alert' class='invalid-feedback d-block'>El ancho mínimo de la imagen debe ser de : 540  px</div>" +
                "<div type='alert' class='invalid-feedback d-block'>Ancho de la imagen: " +
                image.width +
                " px </div>";
            }
            if (image.height < 340) {
              errorMsj +=
                "<div type='alert' class='invalid-feedback d-block'>El alto mínimo de la imagen debe ser de : 340  px</div>" +
                "<div type='alert' class='invalid-feedback d-block'>Alto de la imagen: " +
                image.height +
                " px</div>";
            }
            document.getElementById("file-errors").style.display = "block";
            document.getElementById("file-errors").innerHTML = errorMsj;
            document.getElementById("save-btn").disabled = true;
          }else{
            document.getElementById("save-btn").disabled = false;
            document.getElementById("file-errors").style.display = "none";
          }
        };
      };
      reader.readAsDataURL(this.fileData);
  }

}


