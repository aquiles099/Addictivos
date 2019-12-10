import { Component, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ComerceResquestModel} from '../../../../../model/comerce/request/comerce-request.model';
import {ComerceService } from '../../../../../service/comerce.service';

import {
  NbComponentStatus,
  NbGlobalLogicalPosition,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
} from '@nebular/theme';

import { ToasterConfig } from 'angular2-toaster';


@Component({
  selector: 'app-commerces-form',
  styleUrls: ['./form-commerce.component.scss'],
  templateUrl: './form-commerce.component.html',
})
export class FormCommerceComponent {

  comerceForm: FormGroup;
  private comerceRequest: ComerceResquestModel;
  constructor(private fb: FormBuilder, private comerceService: ComerceService, private toastrService: NbToastrService ) {

  }
  submitted = false;

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
    this.comerceForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      legal_id: ['', Validators.required],
      web_site: ['', Validators.required],
      manager_name: ['', Validators.required],
      phone: ['', Validators.required],
      cellphone: ['', Validators.required],
      email: ['', Validators.required],
      user_id: ['', Validators.required],

    });

  }


  getValues() {
    this.comerceRequest = new ComerceResquestModel();
    this.comerceRequest.name=this.comerceForm.controls.name.value;
    this.comerceRequest.manager_name=this.comerceForm.controls.manager_name.value;
    this.comerceRequest.description=this.comerceForm.controls.description.value;
    this.comerceRequest.email=this.comerceForm.controls.email.value;
    this.comerceRequest.phone=this.comerceForm.controls.phone.value;
    this.comerceRequest.web_site=this.comerceForm.controls.web_site.value;
    this.comerceRequest.cellphone=this.comerceForm.controls.cellphone.value;
    this.comerceRequest.legal_id=this.comerceForm.controls.legal_id.value;
    this.comerceRequest.user_id=this.comerceForm.controls.user_id.value;
    this.save(this.comerceRequest);
  }


  save(comerceRequest: ComerceResquestModel) {
    
    this.comerceService.save(comerceRequest).toPromise().then(output => {

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

  seleccionEspecialidad() {

    //this.especialidadSeleccionada = this.especialidadesSeleccion.find(o => o.nombre == this.especialidadSeleccion.value);

  }




}
