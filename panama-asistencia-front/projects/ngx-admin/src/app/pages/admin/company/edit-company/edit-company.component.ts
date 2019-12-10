import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompanyModel } from 'projects/ngx-admin/src/model/company/response/companyModel.model';
import { ToasterConfig } from 'angular2-toaster';
import { NbGlobalPhysicalPosition, NbGlobalPosition, NbComponentStatus, NbToastrService } from '@nebular/theme';
import { AdminService } from '../../admin.service';
import { Router } from '@angular/router';
import { CompanyResquestModel } from 'projects/ngx-admin/src/model/company/request/company-request.model';
import { CompanyService } from 'projects/ngx-admin/src/service/company.service';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.scss']
})
export class EditCompanyComponent implements OnInit {
  
  public editForm: FormGroup;
  public editRequest: CompanyModel;
  public company: CompanyModel;

  isValid: boolean = false;
  
  //Toast
  config: ToasterConfig;
  index = 1;
  destroyByClick = true;
  duration = 3000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status: NbComponentStatus = 'primary';


  constructor(public formBuilder: FormBuilder,
              public adminService: AdminService,
              public router: Router,
              private toastrService: NbToastrService,
              public companyService: CompanyService) {

  }

  ngOnInit() {
    this.adminService.getCompany().subscribe(data => {this.company = data});
    
    this.editForm = this.formBuilder.group({
      business_name: [{ value: this.company.business_name, disabled: true }, Validators.compose([Validators.required, Validators.minLength(3)])],
      description: [{ value: this.company.description, disabled: true }, Validators.compose([Validators.required, Validators.minLength(3)])],
      email: [{ value: this.company.email, disabled: true }, Validators.required],
      dni: [{ value: this.company.dni, disabled: true }, Validators.required],
      address: [{value: this.company.address, disabled: true}, Validators.required],
      phone: [{ value: this.company.phone, disabled: true }, Validators.required],
      logo: [{ value: this.company.logo, disabled: true }, Validators.required],
    });

  }


  editCompany() {
    this.editRequest = new CompanyModel();
    this.editRequest.business_name = this.editForm.controls.business_name.value;
    this.editRequest.description = this.editForm.controls.description.value;
    this.editRequest.dni = this.editForm.controls.dni.value;
    this.editRequest.email = this.editForm.controls.email.value;
    this.editRequest.phone = this.editForm.controls.phone.value;
    this.editRequest.address = this.editForm.controls.address.value;
    //this.editRequest.logo = this.editForm.controls.logo.value;

    this.save(this.editRequest);

    this.editForm.controls.business_name.disable();
    this.editForm.controls.description.disable();
    this.editForm.controls.dni.disable();
    this.editForm.controls.email.disable();
    this.editForm.controls.phone.disable();
    this.editForm.controls.address.disable();
    this.editForm.controls.logo.disable();

    this.isValid = false;
  }

  save(editRequest: CompanyModel) {

    this.companyService.updateCompany(this.company.id, editRequest);
    //this.userService.updateUser(this.user['id'], editRequest);
    /*.toPromise().then(output => {

      this.showToast("success", "Proceso Exitoso", "Usuario Agregado con exitos");
      setTimeout(() => {
        this.router.navigate(['/pages/admin/table-user']);
      }, 300);

    }).catch((error) => {
      this.showToast("danger", "Ups Sucedio Algo", "Este usuario no lo hemos podido agregar, revisar los campos");
      console.log(error);
    });
    */

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

  enableEdit() {
    this.editForm.controls.business_name.enable();
    this.editForm.controls.description.enable();
    this.editForm.controls.dni.enable();
    this.editForm.controls.email.enable();
    this.editForm.controls.phone.enable();
    this.editForm.controls.address.enable();
    this.editForm.controls.logo.enable();;
    this.isValid = true;
  }

}
