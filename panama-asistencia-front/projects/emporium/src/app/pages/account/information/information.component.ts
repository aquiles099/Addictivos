import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { emailValidator, matchingPasswords } from '../../../theme/utils/app-validators';
import { UserModel } from 'projects/ngx-admin/src/model/user/response/userModel.model';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {
  user:UserModel;

  infoForm: FormGroup;
  passwordForm: FormGroup;
  constructor(public formBuilder: FormBuilder, public snackBar: MatSnackBar) {
    this.user = JSON.parse(localStorage.getItem('user'));
   }

  ngOnInit() {
    this.infoForm = this.formBuilder.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'last_name': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'email': ['', Validators.compose([Validators.required, emailValidator])],
      'currentPassword': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      'newPassword': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      'confirmNewPassword': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    },
    {validator: matchingPasswords('newPassword', 'confirmNewPassword')});
/*
    this.passwordForm = this.formBuilder.group({

    },);*/
  }

  public onInfoFormSubmit(values:Object):void {
    if (this.infoForm.valid) {
      this.snackBar.open('Your account information updated successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
    }
  }

  public onPasswordFormSubmit(values:Object):void {
    if (this.passwordForm.valid) {
      this.snackBar.open('Your password changed successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
    }
  }

}
