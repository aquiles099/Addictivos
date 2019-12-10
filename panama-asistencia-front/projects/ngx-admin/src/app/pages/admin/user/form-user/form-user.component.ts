import { Component, OnInit, ChangeDetectorRef, Inject, ViewChild, ElementRef } from '@angular/core';
import { NbAuthService, NB_AUTH_OPTIONS, getDeepFromObject, NbAuthResult } from '@nebular/auth';
import { Router } from '@angular/router';
import { AdminService } from '../../admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserResquestModel } from '../../../../../model/user/request/user-request.model';
import { UserService } from '../../../../../service/user.service';
import {
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService } from '@nebular/theme';

import { ToasterConfig } from 'angular2-toaster';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss']
})
export class FormUserComponent implements OnInit {

  @ViewChild('fileInput', { static: false }) el: ElementRef;
  editFile: boolean = true;
  removeUpload: boolean = false;
  avatar: any;

  redirectDelay: number = 0;
  showMessages: any = {};
  strategy: string = '';
  private userRequest: UserResquestModel;
  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};

  fileData: File = null;

  formData2 = new FormData();

  userForm: FormGroup;
  private file: File | null = null;

  public userType: Array<string> = ['Root',
    'Administrador',
    'Comercio',
    'Empleado',
    'Cliente',
    'Contable',
    'Analista',
    'Vendedor',
    'Marketing'];

  public selected: String;

  //Toast
  config: ToasterConfig;
  index = 1;
  destroyByClick = true;
  duration = 3000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status: NbComponentStatus = 'primary';

  constructor(public adminService: AdminService,
    protected service: NbAuthService,
    private toastrService: NbToastrService,
    protected cd: ChangeDetectorRef,
    protected router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private http: HttpClient) {

  }

  ngOnInit() {
    this.selected = 'Cliente';
    this.userForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      last_name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      dni: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      phone: ['', Validators.required],
      username: ['', Validators.required],
      address: ['', Validators.required],
      policy: ['', Validators.required],
      role: ['', Validators.required],
      avatar_file_name: ['', Validators.required]
    });
  }

  createUser() {
    this.userRequest = new UserResquestModel();
    this.userRequest.name = this.userForm.controls.name.value;
    this.userRequest.last_name = this.userForm.controls.last_name.value;
    this.userRequest.dni = this.userForm.controls.dni.value;
    this.userRequest.email = this.userForm.controls.email.value;
    this.userRequest.password = this.userForm.controls.password.value;
    this.userRequest.phone = this.userForm.controls.phone.value;
    this.userRequest.username = this.userForm.controls.username.value;
    this.userRequest.address = this.userForm.controls.address.value;
    this.userRequest.policy = this.userForm.controls.dni.value;
    this.userRequest.role = this.userForm.controls.role.value;
    this.userRequest.avatar_file_name = this.userForm.controls.avatar_file_name.value;
    //this.userRequest.avatar_file_name = this.formData2;
    this.save(this.userRequest);

  }

  save(userRequest: UserResquestModel) {
    console.log(userRequest);

    this.userService.save(userRequest).toPromise().then(output => {

      this.showToast("success", "Proceso Exitoso", "Usuario Agregado con exitos");
      setTimeout(() => {
        this.router.navigate(['/pages/admin/table-user']);
      }, 300);
      
    }).catch((error) => {
      this.showToast("danger", "Ups Sucedio Algo", "Este usuario no lo hemos podido agregar, revisar los campos");
      console.log(error);
    });

  }

  uploadFile(event) {
    
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {

      const file = event.target.files && event.target.files[0];
      this.file = file;
      //console.log(file);
      //console.log(this.file);

      let formData = new FormData();  //line 4
      formData.append('avatar_file_name',  event.target.files[0]);  //line 5
      this.formData2=formData;

      //console.log(this.formData2);
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {

        this.userForm.patchValue({
          avatar_file_name: reader.result
        });
        console.log('hola');
        
        console.log(this.userForm.controls.avatar_file_name.value);
        this.editFile = false;
        this.removeUpload = true;
      }
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();
    }
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
