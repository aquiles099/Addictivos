import { Component, OnInit, ChangeDetectorRef, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Platform } from '../../../app.models';
import { PaymentRequestModel } from 'projects/ngx-admin/src/model/payment/request/payment-request.model';
import { PaymentService } from 'projects/ngx-admin/src/service/payment.service';

import {
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
} from '@nebular/theme';

import { ToasterConfig } from 'angular2-toaster';

@Component({
  selector: 'app-form-payment',
  templateUrl: './form-payment.component.html',
  styleUrls: ['./form-payment.component.scss']
})
export class FormPaymentComponent implements OnInit {
  
  platformForm: FormGroup;
  platform: Platform;

  showMessages: any = {};
  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  trueimg:Boolean = false;
  loader:Boolean = false;
  myimg:string;
  final:Boolean = true;
  msn:string;

  //Toast
  config: ToasterConfig;
  index = 1;
  destroyByClick = true;
  duration = 3000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  imagen;
  public loading = false;

  private platformRequest: PaymentRequestModel;

  public statusType: Array<string> = ['Inactivo', 'Activo'];
  
  constructor( protected cd: ChangeDetectorRef,
    protected router: Router,
    private formBuilder: FormBuilder,
    private toastrService: NbToastrService,
    private paymentService: PaymentService) { }

  ngOnInit() {
    this.platformForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      avatar_file_name: [null, Validators.required],
      status: [0, Validators.required],
    });
  }

  uploadFile(event) {
    console.log(event);
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    this.imagen=file;
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.platformForm.patchValue({
          
          avatar_file_name: reader.result
        });
        console.log(this.platformForm.controls.avatar_file_name.value);
      }
      this.cd.markForCheck();        
    }
  }
  /*subiendoando(ev){
    let img:any = ev.target;
    if(img.files.length > 0){
      this.loader = true;
      let form = new FormData();
      form.append('file',img.files[0]);
      console.log(img.files[0]);
      this.imagen=img.files[0];
      
    }

}*/
  createPlatform(){

    console.log(this.platformForm.controls.name.value);
    console.log(this.platformForm.controls.description.value);
    console.log(this.platformForm.controls.avatar_file_name.value);
    console.log(this.imagen);
    

     this.platformRequest = new PaymentRequestModel;
     this.platformRequest.name = this.platformForm.controls.name.value;
     this.platformRequest.description = this.platformForm.controls.description.value;
    // this.platformRequest.avatar = this.platformForm.controls.avatar_file_name.value;
     this.platformRequest.status = this.platformForm.controls.status.value;

     var payload = new FormData();

    this.platformRequest = new PaymentRequestModel;
    this.platformRequest.name = this.platformForm.controls.name.value;
    this.platformRequest.description = this.platformForm.controls.description.value;
    this.platformRequest.avatar_file_name = this.platformForm.controls.avatar_file_name.value;
    this.platformRequest.status = this.platformForm.controls.status.value;
    console.log(this.platformRequest);
    //this.save(this.platformRequest);

  }

  save(platformRequest: FormData) {
    this.loading = true;
    this.paymentService.savePayment(platformRequest).toPromise().then(output => {
      console.log(output);
      this.loading = false;
      this.showToast("success", "Proceso Exitoso", "Plataforma de pago agregada con exitos");
      setTimeout(() => {
        this.router.navigate(['/pages/admin-payment/table-payment']);
      }, 300);


    }).catch((error) => {
      this.loading = false;
      // this.makeToast();
      this.showToast("danger", "Ups Sucedio Algo", "Esta plataforma de pago no lo hemos podido agregar, revisar los campos");
      console.log(error);
    });
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
