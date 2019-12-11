import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ComerceResquestModel } from 'projects/ngx-admin/src/model/comerce/request/comerce-request.model';
import { ToasterConfig } from 'angular2-toaster';
import { NbGlobalPosition, NbGlobalPhysicalPosition, NbComponentStatus, NbToastrService } from '@nebular/theme';
import { AdminService } from '../../admin.service';
import { Router } from '@angular/router';
import { ComerceService } from 'projects/ngx-admin/src/service/comerce.service';
import { UserModel } from 'projects/ngx-admin/src/model/user/response/userModel.model';

@Component({
  selector: 'app-edit-commerce',
  templateUrl: './edit-commerce.component.html',
  styleUrls: ['./edit-commerce.component.scss']
})
export class EditCommerceComponent implements OnInit {

  public editForm: FormGroup;
  public editRequest: ComerceResquestModel;
  public commerce: ComerceResquestModel;
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
              private toastrService: NbToastrService, 
              public commerceService: ComerceService) {

  }

  ngOnInit() {
    this.adminService.getCommerce().subscribe(data => {this.commerce = data});
    
    this.editForm = this.formBuilder.group({
      name: [{ value: this.commerce['name'], disabled: true }, Validators.compose([Validators.required, Validators.minLength(3)])],
      description: [{ value: this.commerce['description'], disabled: true }, Validators.compose([Validators.required, Validators.minLength(3)])],
      email: [{ value: this.commerce['email'], disabled: true }, Validators.required],
      legal_id: [{ value: this.commerce['legal_id'], disabled: true }, Validators.required],
      web_site: [{value: this.commerce['web_site'], disabled: true}, Validators.required],
      phone: [{ value: this.commerce['phone'], disabled: true }, Validators.required],
      manager_name: [{ value: this.commerce['manager_name'], disabled: true }, Validators.required],
      cellphone: [{ value: this.commerce['cellphone'], disabled: true }, Validators.required],
      user_id: [{value: this.commerce['user_id'], disabled: true},  Validators.required],
    });

    this.adminService.getUsers().subscribe(data =>{
      this.users = data['data']['users'];
    })

  }

  editCommerce() {
    this.editRequest = new ComerceResquestModel();
    this.editRequest.name = this.editForm.controls.name.value;
    this.editRequest.description = this.editForm.controls.description.value;
    this.editRequest.web_site = this.editForm.controls.web_site.value;
    this.editRequest.email = this.editForm.controls.email.value;
    this.editRequest.phone = this.editForm.controls.phone.value;
    this.editRequest.legal_id = this.editForm.controls.legal_id.value;
    this.editRequest.cellphone = this.editForm.controls.cellphone.value;
    this.editRequest.manager_name = this.editForm.controls.manager_name.value;
    this.editRequest.user_id = this.editForm.controls.user_id.value;

    this.save(this.editRequest);

    this.editForm.controls.name.disable();
    this.editForm.controls.description.disable();
    this.editForm.controls.web_site.disable();
    this.editForm.controls.email.disable();
    this.editForm.controls.legal_id.disable();
    this.editForm.controls.phone.disable();
    this.editForm.controls.manager_name.disable();
    this.editForm.controls.cellphone.disable();
    this.editForm.controls.user_id.disable();

    this.isValid = false;
  }

  save(editRequest: ComerceResquestModel) {

    this.commerceService.updateCommerce(this.commerce.id, editRequest);

  }

  enableEdit() {
    this.editForm.controls.name.enable();
    this.editForm.controls.description.enable();
    this.editForm.controls.user_id.enable();
    this.editForm.controls.email.enable();
    this.editForm.controls.web_site.enable();
    this.editForm.controls.legal_id.enable();
    this.editForm.controls.phone.enable();
    this.editForm.controls.manager_name.enable();
    this.editForm.controls.cellphone.enable();
    this.isValid = true;
  }


}
