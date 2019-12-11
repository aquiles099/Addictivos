import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModel } from 'projects/ngx-admin/src/model/user/response/userModel.model';
import { AdminService } from '../../admin.service';
import { UserResquestModel } from 'projects/ngx-admin/src/model/user/request/user-request.model';
import { Router } from '@angular/router';
import { UserService } from 'projects/ngx-admin/src/service/user.service';
import { matchingPasswords } from 'projects/emporium/src/app/theme/utils/app-validators';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  public editForm: FormGroup;
  public editRequest: UserResquestModel;
  public user: UserModel;

  isValid: boolean = false;

  public userType: { id: number, name: string }[] = [
    { "id": 1, "name": "Root" },
    { "id": 2, "name": "Administrador" },
    { "id": 3, "name": "Empleado" },
    { "id": 4, "name": "Cliente" },
    { "id": 5, "name": "Contable" },
    { "id": 6, "name": "Analista" },
    { "id": 7, "name": "Vendedor" },
    { "id": 8, "name": "Marketing" }
  ];

  constructor(public formBuilder: FormBuilder,
    public adminService: AdminService,
    public router: Router,
    public userService: UserService) { }

  ngOnInit() {
    this.adminService.getUser().subscribe(data => this.user = data);

    this.editForm = this.formBuilder.group({
      name: [{ value: this.user['name'], disabled: true }, Validators.compose([Validators.required, Validators.minLength(3)])],
      last_name: [{ value: this.user['last_name'], disabled: true }, Validators.compose([Validators.required, Validators.minLength(3)])],
      email: [{ value: this.user['email'], disabled: true }, Validators.required],
      username: [{ value: this.user['username'], disabled: true }, Validators.required],
      'password': [{ value: '', disabled: true }, Validators.compose([Validators.minLength(6)])],
      'confirmPassword': [{ value: '', disabled: true }, Validators.compose([Validators.minLength(6)])],
      dni: [{ value: this.user['dni'], disabled: true }, Validators.required],
      phone: [{ value: this.user['phone'], disabled: true }, Validators.required],
      role: [{ value: this.user['role'], disabled: true }, Validators.required],
      address: [{ value: this.user['address'], disabled: true }, Validators.required],
      policy: [{ value: this.user['policy'], disabled: true }, Validators.required],
      avatar_file_name: [{ value: this.user['avatar_file_name'], disabled: true }, Validators.required]
    },
      { validators: matchingPasswords('password', 'confirmPassword') });

  }

  editUser() {
    this.editRequest = new UserResquestModel();
    this.editRequest.name = this.editForm.controls.name.value;
    this.editRequest.last_name = this.editForm.controls.last_name.value;
    this.editRequest.dni = this.editForm.controls.dni.value;
    this.editRequest.email = this.editForm.controls.email.value;
    if (this.editForm.controls.password.value != '') {
      this.editRequest.password = this.editForm.controls.password.value;
    }
    this.editRequest.phone = this.editForm.controls.phone.value;
    this.editRequest.username = this.editForm.controls.username.value;
    this.editRequest.address = this.editForm.controls.address.value;
    this.editRequest.role = this.editForm.controls.role.value;
    this.editRequest.policy = this.editForm.controls.policy.value;
    this.editRequest.avatar_file_name = this.editForm.controls.avatar_file_name.value;
    this.save(this.editRequest);


    this.editForm.controls.name.disable();
    this.editForm.controls.last_name.disable();
    this.editForm.controls.password.disable();
    this.editForm.controls.confirmPassword.disable();
    this.editForm.controls['email'].disable();
    this.editForm.controls['username'].disable();
    this.editForm.controls['phone'].disable();
    this.editForm.controls['role'].disable();
    this.editForm.controls['address'].disable();
    this.editForm.controls.policy.disable();
    this.editForm.controls['avatar_file_name'].disable();

    this.isValid = false;
  }

  save(editRequest: UserResquestModel) {
    this.userService.updateUser(this.user['id'], editRequest);
  }

  enableEdit() {
    this.editForm.controls.name.enable();
    this.editForm.controls['last_name'].enable();
    this.editForm.controls['policy'].enable();
    this.editForm.controls['email'].enable();
    this.editForm.controls['password'].enable();
    this.editForm.controls['confirmPassword'].enable();
    this.editForm.controls['username'].enable();
    this.editForm.controls['phone'].enable();
    this.editForm.controls['role'].enable();
    this.editForm.controls['address'].enable();
    this.editForm.controls['avatar_file_name'].enable();

    this.isValid = true;
  }

  matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let password = group.controls[passwordKey];
      let passwordConfirmation = group.controls[passwordConfirmationKey];
      if (password.value !== passwordConfirmation.value) {
        return passwordConfirmation.setErrors({ mismatchedPasswords: true })
      }
    }
  }

}
