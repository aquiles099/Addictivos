import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { ComerceResquestModel } from '../model/comerce/request/comerce-request.model';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { NbComponentStatus, NbGlobalPosition, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { ToasterConfig } from 'angular2-toaster';


@Injectable()
export class ComerceService extends BaseService {
  private servicio = 'commerce/commerces';
  public urlC = environment.url + 'commerce/';

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

  save(request: ComerceResquestModel): Observable<any> {
    return this.post(this.http, this.servicio, request);
  }

  getComerce(): Observable<any> {
    return this.get(this.http, this.servicio);
  }

  public updateCommerce(commerceId: number, commerce: ComerceResquestModel): void {
    console.log('sending patch request to add an item');

    this.http.put(this.urlC + commerceId, commerce).subscribe(
      res => {
        console.log(res);
        this.showToast("success", "Proceso Exitoso", "Comercio actualizado con exitos");
        setTimeout(() => {
          this.router.navigate(['/pages/admin/table-commerce']);
        }, 300);
      },
      error => {
        console.log(error);
        this.showToast("danger", "Ups Sucedio Algo", "Este comercio no se ha podido actualizar, revisar los campos");

      });

    console.log('request sent. Waiting for response...');
  }

  public deleteCommerce(id: number) {
    return this.http.delete(this.urlC + id).subscribe(
      (response) => {
        console.log(response);
        this.showToast("success", "Proceso Exitoso", "Comercio eliminado con exito");
        setTimeout(() => {
            this.router.navigate(['/pages/admin/table-commerce']);
        }, 3000);
      },
      (error) => {
        console.log(error);
        this.showToast("danger", "Ups Sucedio Algo", "Este comercio no se ha podido eliminar. Intente de nuevo");
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
