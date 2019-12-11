import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompanyResquestModel } from 'projects/ngx-admin/src/model/company/request/company-request.model';
import { CompanyService } from 'projects/ngx-admin/src/service/company.service';
import { NbToastrService, NbGlobalPosition, NbComponentStatus, NbGlobalPhysicalPosition } from '@nebular/theme';
import { ToasterConfig } from 'angular2-toaster';
import { UserModel } from 'projects/ngx-admin/src/model/user/response/userModel.model';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-company-form',
  styleUrls: ['./form-company.component.scss'],
  templateUrl: './form-company.component.html',
})
export class FormCompanyComponent {

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

  public users: Array<UserModel>;

  companyForm: FormGroup;
  private companyRequest: CompanyResquestModel;

  constructor(private fb: FormBuilder,
              public companyService: CompanyService,
              public toastrService: NbToastrService,
              private adminService: AdminService) {

  }

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

  ngOnInit() {
    this.companyForm = this.fb.group({
      business_name: ['', Validators.required],
      dni: ['', Validators.required],
      address: ['', Validators.required],
      logo: ['', Validators.required],
      description: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      user_id: ['', Validators.required],
    });

    this.getUsers();
  }
  
  createCompany(){
    this.companyRequest = new CompanyResquestModel();
    this.companyRequest.business_name = this.companyForm.controls.business_name.value;
    this.companyRequest.dni = this.companyForm.controls.dni.value;
    this.companyRequest.address = this.companyForm.controls.address.value;
    this.companyRequest.logo = this.companyForm.controls.logo.value;
    this.companyRequest.description = this.companyForm.controls.description.value;
    this.companyRequest.phone = this.companyForm.controls.phone.value;
    this.companyRequest.email = this.companyForm.controls.email.value;
    this.companyRequest.user_id = this.companyForm.controls.user_id.value;
    this.save(this.companyRequest);

  }

  save(companyRequest: CompanyResquestModel) {
    this.companyService.save(companyRequest).toPromise().then(output => {
      console.log(output);
    }).catch((error) => {
      this.makeToast();
      console.log(error);
    });
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

  public getUsers(){
    this.adminService.getUsers().subscribe(data =>{
      this.users = data['data']['users'];
    })
  }

}
