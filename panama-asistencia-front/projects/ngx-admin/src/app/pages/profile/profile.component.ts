import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserResquestModel } from 'projects/ngx-admin/src/model/user/request/user-request.model';
import { UserService } from 'projects/ngx-admin/src/service/user.service';
import { ToasterConfig } from 'angular2-toaster';
import { NbGlobalPosition, NbGlobalPhysicalPosition, NbComponentStatus, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @ViewChild('fileInput', { static: false }) el: ElementRef;

  editForm: FormGroup;
  private editRequest: UserResquestModel;
  
  //Toast
  config: ToasterConfig;
  index = 1;
  destroyByClick = true;
  duration = 3000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status: NbComponentStatus = 'primary';
  user: any;

  isValid: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private toastrService: NbToastrService ) { 
      this.user= JSON.parse(localStorage.getItem("user"));
    }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      name: [{value: this.user['name'], disabled: true}, Validators.compose([Validators.required, Validators.minLength(3)])],
      last_name: [{value: this.user['last_name'], disabled: true}, Validators.compose([Validators.required, Validators.minLength(3)])],
      email: [{value: this.user['email'], disabled: true}, Validators.required],
      username: [{value: this.user['username'], disabled: true}, Validators.required],
      //password: [{value: '', disabled: true}, Validators.required],
      phone: [{value: this.user['phone'], disabled: true}, Validators.required],
      role: [{value: this.user['role'], disabled: true}, Validators.required],
      address: [{value: this.user['address'], disabled: true}, Validators.required],
      avatar_file_name: [{value: this.user['avatar_file_name'], disabled: true}, Validators.required]
    });

  }

  editUser() {
    this.editRequest = new UserResquestModel();
    this.editRequest.name = this.editForm.controls.name.value;
    this.editRequest.last_name = this.editForm.controls.last_name.value;
    //this.editRequest.dni = this.editForm.controls.dni.value;
    this.editRequest.email = this.editForm.controls.email.value;
    //this.editRequest.password = this.editForm.controls.password.value;
    this.editRequest.phone = this.editForm.controls.phone.value;
    this.editRequest.username = this.editForm.controls.username.value;
    this.editRequest.address = this.editForm.controls.address.value;
    //this.editRequest.policy = this.editForm.controls.dni.value;
    this.editRequest.role = this.editForm.controls.role.value;
    this.editRequest.avatar_file_name = this.editForm.controls.avatar_file_name.value;
    //this.save(this.editRequest);


    this.editForm.controls.name.disable();
    this.editForm.controls['last_name'].disable();
    this.editForm.controls['email'].disable();
    this.editForm.controls['username'].disable();
    this.editForm.controls['phone'].disable();
    this.editForm.controls['role'].disable();
    this.editForm.controls['address'].disable();
    this.editForm.controls['avatar_file_name'].disable();
    
    this.isValid=false;
  }

  save(editRequest: UserResquestModel) {

    this.userService.save(editRequest).toPromise().then(output => {

      this.showToast("success", "Proceso Exitoso", "Usuario Agregado con exitos");
      setTimeout(() => {
        this.router.navigate(['/pages/admin/table-user']);
      }, 300);

    }).catch((error) => {
      this.showToast("danger", "Ups Sucedio Algo", "Este usuario no lo hemos podido agregar, revisar los campos");
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

  enableEdit(){
/*
    this.editForm = this.formBuilder.group({
      name: [{value: '', disabled: true}, Validators.compose([Validators.required, Validators.minLength(3)])],
      last_name: [{value: '', disabled: true}, Validators.compose([Validators.required, Validators.minLength(3)])],
      email: [{value: '', disabled: true}, Validators.required],
      username: [{value: '', disabled: true}, Validators.required],
      password: [{value: '', disabled: true}, Validators.required],
      phone: [{value: '', disabled: true}, Validators.required],
      role: [{value: '', disabled: true}, Validators.required],
      address: [{value: '', disabled: true}, Validators.required],
      avatar_file_name: [{value: null, disabled: true}, Validators.required]
    }); 
*/
   
    this.editForm.controls.name.enable();
    this.editForm.controls['last_name'].enable();
    //this.editForm.controls['dni'].enable;
    this.editForm.controls['email'].enable();
    //this.editForm.controls.password.enable;
    this.editForm.controls['username'].enable();
    this.editForm.controls['phone'].enable();
    this.editForm.controls['role'].enable();
    this.editForm.controls['address'].enable();
    this.editForm.controls['avatar_file_name'].enable();

    this.isValid=true;
    
  }
}
