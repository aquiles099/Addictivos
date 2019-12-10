import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { UserResquestModel } from '../model/user/request/user-request.model';
import { environment } from '../environments/environment';
import { NbComponentStatus, NbGlobalPosition, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { ToasterConfig } from 'angular2-toaster';
import { Router } from '@angular/router';


@Injectable()
export class UserService extends BaseService {

  //Toast
  config: ToasterConfig;
  index = 1;
  destroyByClick = true;
  duration = 3000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status: NbComponentStatus = 'primary';

  private servicio = 'user/create';
  public url = environment.url + 'user/';

  constructor( private http: HttpClient, 
               private toastrService: NbToastrService, 
               public router: Router) {
    super();
  }

  save(request: UserResquestModel): Observable<any> {
    return this.post(this.http, this.servicio, request);
  }
  /*
    updateUser(id: number, request: UserResquestModel) {
      return this.patch(this.http +'user/'+id, request);
    }
  */

  public updateUser(userId: number, user: UserResquestModel): void {

    this.http.patch(this.url + userId, user).subscribe(
      res => {
        console.log(res);
        this.showToast("success", "Proceso Exitoso", "Usuario Agregado con exitos");
        setTimeout(() => {
          this.router.navigate(['/pages/admin/table-user']);
        }, 300);
      },
      error => {
        this.showToast("danger", "Ups Sucedio Algo", "Este usuario no lo hemos podido agregar, revisar los campos");
        console.log(error);
        console.log(error);
      });

    console.log('request sent. Waiting for response...');
  }


  public deleteUser(idUser: number) {
    return this.http.delete(this.url + idUser).subscribe(
      (response) => {
        this.showToast("success", "Proceso Exitoso", "Usuario eliminado con exitos");
        setTimeout(() => {
          this.router.navigate(['/pages/admin/table-user']);
        }, 300);
        console.log(response);
        this.showToast("danger", "Ups Sucedio Algo", "Este usuario no lo hemos podido elimanr. Intente de nuevo.");
      },
      (error) => console.log(error)
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
    this.toastrService.show(
      body,
      `${titleContent}`,
      config);
  }

}