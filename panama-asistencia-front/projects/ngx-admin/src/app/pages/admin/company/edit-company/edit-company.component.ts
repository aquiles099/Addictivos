import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompanyModel } from 'projects/ngx-admin/src/model/company/response/companyModel.model';
import { ToasterConfig } from 'angular2-toaster';
import { NbGlobalPhysicalPosition, NbGlobalPosition, NbComponentStatus, NbToastrService } from '@nebular/theme';
import { AdminService } from '../../admin.service';
import { Router } from '@angular/router';
import { CompanyResquestModel } from 'projects/ngx-admin/src/model/company/request/company-request.model';
import { CompanyService } from 'projects/ngx-admin/src/service/company.service';
import { UserModel } from 'projects/ngx-admin/src/model/user/response/userModel.model';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.scss']
})
export class EditCompanyComponent implements OnInit {
  
  public editForm: FormGroup;
  public editRequest: CompanyModel;
  public company: CompanyModel;
  public users: Array<UserModel>;

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
      user_id: [{ value: this.company.user_id, disabled: true }, Validators.required],
    });

    this.adminService.getUsers().subscribe(data =>{
      this.users = data['data']['users'];
    })

  }

  editCompany() {
    this.editRequest = new CompanyModel();
    this.editRequest.business_name = this.editForm.controls.business_name.value;
    this.editRequest.description = this.editForm.controls.description.value;
    this.editRequest.dni = this.editForm.controls.dni.value;
    this.editRequest.email = this.editForm.controls.email.value;
    this.editRequest.phone = this.editForm.controls.phone.value;
    this.editRequest.address = this.editForm.controls.address.value;
    this.editRequest.user_id = this.editForm.controls.user_id.value;
    //this.editRequest.logo = this.editForm.controls.logo.value;

    this.save(this.editRequest);

    this.editForm.controls.business_name.disable();
    this.editForm.controls.description.disable();
    this.editForm.controls.dni.disable();
    this.editForm.controls.email.disable();
    this.editForm.controls.phone.disable();
    this.editForm.controls.address.disable();
    this.editForm.controls.logo.disable();
    this.editForm.controls.user_id.disable();

    this.isValid = false;
  }

  save(editRequest: CompanyModel) {
    this.companyService.updateCompany(this.company.id, editRequest);
  }

  enableEdit() {
    this.editForm.controls.business_name.enable();
    this.editForm.controls.description.enable();
    this.editForm.controls.dni.enable();
    this.editForm.controls.email.enable();
    this.editForm.controls.phone.enable();
    this.editForm.controls.address.enable();
    this.editForm.controls.logo.enable();;
    this.editForm.controls.user_id.enable();;
    this.isValid = true;
  }

}
