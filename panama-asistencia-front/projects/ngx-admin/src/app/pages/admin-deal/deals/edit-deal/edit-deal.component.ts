import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  selector: 'app-edit-deal',
  templateUrl: './edit-deal.component.html',
  styleUrls: ['./edit-deal.component.scss']
})
export class EditDealComponent implements OnInit {

  formData = new FormData();
  editForm: FormGroup;
  // upload
  fileData: File = null;
  comerces:any[] = null;
  categorys:any[] = null;
  companys:any[] = null;
  types:any[]=null;
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

  isValid: boolean = false;
  public deal: any;
  selectsDisabled:boolean=true;
  ckEditorReadOnly:boolean=true;
  effectiveDateSelected:any=null;
  closingDateSelected:any=null;
  availableUntilSelected:any=null;
  constructor(
    private router: Router,
    private fb: FormBuilder, 
    private dealService: DealService, 
    private toastrService: NbToastrService,
    private comerce_service: ComerceService,
    private category_service: CategoryService,
    private company_service: CompanyService
   ) {

  }

  ngOnInit() {

    this.dealService.getDeal().subscribe(data => {this.deal = data; console.log("this.deal:",this.deal)});
    this.effectiveDateSelected = new Date(this.deal['effective_date']);    
    this.closingDateSelected = new Date(this.deal['closing_date']);
    this.availableUntilSelected = new Date(this.deal['available_until']);    
    this.editForm = this.getFormBuilder();

    this.dealService.getTypes().toPromise().then(
      response => {
        if(response.code==200){
          this.types=response.data.types;
          this.editForm.controls['deal_type_id'].setValue(this.deal['deal_type_id']);
        }
      }
    ).catch(error => {
      console.log("error:",error);
    });
    this.comerce_service.getComerce().toPromise().then(
      response => {
        if(response.code==200){
          this.comerces = response.data.commerce.original;
          this.editForm.controls['commerce_id'].setValue(this.deal['commerce_id']);
        }
      }).catch(error => {
        console.log("error:",error);
    });
    this.category_service.getCategories().toPromise().then(
    response => {
      if(response.code==200){
        this.categorys = response.data.categories; 
        this.editForm.controls['category_id'].setValue(this.deal['category_id']);
      }
    }).catch(error => {
      console.log("error:",error);
    });
    this.company_service.getCompany().toPromise().then(response => {  
      if(response.code==200){
        this.companys = response.data.company.original;
        this.editForm.controls['company_id'].setValue(this.deal['company_id']);
      }                    
    }).catch(error => {
      console.log("error:",error);
    }); 
  }

  getFormBuilder() {
    return this.fb.group({
      short_title: [{ value: this.deal['short_title'], disabled: true }, Validators.required],
      long_title: [{ value: this.deal['long_title'], disabled: true }, Validators.required],
      effective_date: [{ value: this.deal['effective_date'], disabled: true }, Validators.required],
      deal_total_limit: [{ value: this.deal['deal_total_limit'], disabled: true }, Validators.required],
      user_purchase_limit: [{ value: this.deal['user_purchase_limit'], disabled: true }, Validators.required],
      short_description: [{ value: this.deal['short_description'], disabled: true }, Validators.required],
      long_description: [{ value: this.deal['long_description'], disabled: true }, Validators.required],
      restrictions: [{ value: this.deal['restrictions'], disabled: true }, Validators.required],
      commerce_id: [{ value: this.deal['commerce_id'], disabled: true }, Validators.required],
      category_id: [{ value: this.deal['category_id'], disabled: true }, Validators.required],
      //slug: ['', Validators.required],
      closing_date: [{ value: this.deal['closing_date'], disabled: true }, Validators.required],
      is_public: [{ value: this.deal['is_public'], disabled: true }, Validators.required],
      available_until: [{ value: this.deal['available_until'], disabled: true }, Validators.required],
      gift_title: [{ value: this.deal['gift_title'], disabled: true }, Validators.required],
      user_gift_limit: [{ value: this.deal['gift_title'], disabled: true }, Validators.required],
      discount: [{ value: this.deal['user_gift_limit'], disabled: true }, Validators.required],
      payment_type: [{ value:  this.deal['payment_type'], disabled: true }, Validators.required],
      deal_type_id: [{ value:  this.deal['deal_type_id'], disabled: true }, Validators.required],
      commission: [{ value: this.deal['commission'], disabled: true }, Validators.required],
      seller_id: [{ value: this.deal['seller_id'], disabled: true }, Validators.required],
      company_id: [{ value:  this.deal['company_id'], disabled: true }, Validators.required],
    });
  }
  getFormData() {
    this.formData.append("short_title", this.editForm.controls.short_title.value);
    this.formData.append("long_title", this.editForm.controls.long_title.value);
    this.formData.append("effective_date", this.convertDate(this.editForm.controls.effective_date.value));
    this.formData.append("closing_date", this.convertDate(this.editForm.controls.closing_date.value));
    this.formData.append("available_until",this.convertDate(this.editForm.controls.available_until.value));
    this.formData.append("deal_total_limit",this.editForm.controls.deal_total_limit.value);
    this.formData.append("user_purchase_limit",this.editForm.controls.user_purchase_limit.value);
    this.formData.append("short_description", this.editForm.controls.short_description.value);
    this.formData.append("long_description", this.editForm.controls.long_description.value);
    this.formData.append("restrictions", this.editForm.controls.restrictions.value);
    this.formData.append("is_public",this.editForm.controls.is_public.value);
    this.formData.append("gift_title", this.editForm.controls.gift_title.value);
    this.formData.append("commission", this.editForm.controls.commission.value);
    this.formData.append("payment_type", this.editForm.controls.payment_type.value);
    this.formData.append("commerce_id", this.editForm.controls.commerce_id.value);
    this.formData.append("category_id", this.editForm.controls.category_id.value);
    this.formData.append("deal_type_id", this.editForm.controls.deal_type_id.value);
    this.formData.append("company_id",this.editForm.controls.company_id.value);
    this.formData.append("main_image",this.fileData);
    return this.formData;
  }
  public editDeal(){
    this.save(this.getFormData());
    this.editForm.controls.short_title.disable();
    this.editForm.controls.long_title.disable();
    this.editForm.controls.effective_date.disable();
    this.editForm.controls.deal_total_limit.disable();
    this.editForm.controls.user_purchase_limit.disable();
    this.editForm.controls.short_description.disable();
    this.editForm.controls.long_description.disable();
    this.editForm.controls.restrictions.disable();
    this.editForm.controls.commerce_id.disable();
    this.editForm.controls.category_id.disable();
    this.editForm.controls.is_public.disable();
    this.editForm.controls.available_until.disable();
    this.editForm.controls.gift_title.disable();
    this.editForm.controls.commission.disable();
    this.editForm.controls.closing_date.disable();
    this.editForm.controls.deal_type_id.disable();
    this.editForm.controls.payment_type.disable();
    this.editForm.controls.company_id.disable();

    this.isValid = false;
  }
  public save(editRequest: any) {
  	if(this.validateDates()){
    	this.dealService.updateDeal(this.deal.id, this.getFormData()).toPromise().then(output => {
	        this.showToast("success", "Proceso Exitoso", "Oferta Actualizada con exitos");
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
  public enableEdit(){
    this.ckEditorReadOnly=false;
    this.selectsDisabled=false;
    this.editForm.controls.short_title.enable();
    this.editForm.controls.long_title.enable();
    this.editForm.controls.effective_date.enable();
    this.editForm.controls.deal_total_limit.enable();
    this.editForm.controls.user_purchase_limit.enable();
    this.editForm.controls.short_description.enable();
    this.editForm.controls.long_description.enable();
    this.editForm.controls.restrictions.enable();
    this.editForm.controls.commerce_id.enable();
    this.editForm.controls.category_id.enable();
    this.editForm.controls.is_public.enable();
    this.editForm.controls.available_until.enable();
    this.editForm.controls.gift_title.enable();
    this.editForm.controls.commission.enable();
    this.editForm.controls.closing_date.enable();
    this.editForm.controls.deal_type_id.enable();
    this.editForm.controls.payment_type.enable();
    this.editForm.controls.company_id.enable();
    this.isValid = true;
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
    if(moment(this.editForm.controls.available_until.value,"DD-MM-YYYY HH:mm").format("DD-MM-YYYY HH:mm")>=moment(this.editForm.controls.closing_date.value,"DD-MM-YYYY HH:mm").format("DD-MM-YYYY HH:mm") && moment(this.editForm.controls.closing_date.value,"DD-MM-YYYY HH:mm").format("DD-MM-YYYY HH:mm")>moment(this.editForm.controls.effective_date.value,"DD-MM-YYYY HH:mm").format("DD-MM-YYYY HH:mm")){
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
