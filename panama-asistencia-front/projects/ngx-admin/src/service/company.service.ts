import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { CompanyResquestModel } from '../model/company/request/company-request.model';
import { CompanyModel } from '../model/company/response/companyModel.model';
import { environment } from '../environments/environment.prod';
import { Router } from '@angular/router';
import { NbComponentStatus, NbGlobalPosition, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { ToasterConfig } from 'angular2-toaster';

@Injectable()
export class CompanyService extends BaseService {
  private servicio = 'company/companies';
  public urlC = environment.url + 'company/';

  //Toast
  config: ToasterConfig;
  index = 1;
  destroyByClick = true;
  duration = 3000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status: NbComponentStatus = 'primary';

  constructor(private http: HttpClient, private toastrService: NbToastrService, public router: Router) {
    super();
  }


  save(request: CompanyResquestModel): Observable<any> {
    return this.post(this.http, this.servicio, request);
  }

  getCompany(): Observable<any> {
    //return this.http.get(this.http + this.categories);
    return this.get(this.http, this.servicio);
  }

  public updateCompany(id: number, company: CompanyModel): void {
    console.log('sending patch request to add an item');

    this.http.put(this.urlC + id, company).subscribe(
      res => {
        console.log(res);
        this.showToast("success", "Proceso Exitoso", "Compañía actualizada con exitos");
        setTimeout(() => {
          this.router.navigate(['/pages/admin/table-company']);
        }, 300);
      },
      error => {
        this.showToast("danger", "Ups Sucedio Algo", "Esta compañía no se ha podido actualizar, revisar los campos");
        console.log(error);
      });

    console.log('request sent. Waiting for response...');
  }


  public deleteCompany(id: number) {
    return this.http.delete(this.urlC + id).subscribe(
      (response) => {
        console.log(response);
        this.showToast("success", "Proceso Exitoso", "Compáñía eliminada con exito");
        setTimeout(() => {
          this.router.navigate(['/pages/admin/table-company']);
        }, 3000);
      },
      (error) => {
        console.log(error);
        this.showToast("danger", "Ups Sucedio Algo", "Esta compañía no se ha podido eliminar. Intente de nuevo");
      }
    );
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
    this.toastrService.show(body, `${titleContent}`, config);
  }


}
