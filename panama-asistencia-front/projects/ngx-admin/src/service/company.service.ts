import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {Observable} from 'rxjs';
import {CompanyResquestModel} from '../model/company/request/company-request.model';
import { CompanyModel } from '../model/company/response/companyModel.model';
import { environment } from '../environments/environment.prod';


@Injectable()
export class CompanyService extends BaseService{
  private servicio = 'company/companies'; 
  public urlC = environment.url + 'company/';

  constructor(private http: HttpClient) {
    super();
  }

  save(request: CompanyResquestModel): Observable<any> {
    return this.post(this.http, this.servicio, request);
  }

  getCompany() : Observable <any> {
    //return this.http.get(this.http + this.categories);
    return this.get(this.http,this.servicio);
  }

  public updateCompany(id: number, company: CompanyModel): void { 
    console.log('sending patch request to add an item');
  
    this.http.put(this.urlC+id, company).subscribe(
      res => { 
        console.log(res, 'received ok response from patch request');
      },
      error => {
        console.error('There was an error during the request');
        console.log(error);
      });
  
    console.log('request sent. Waiting for response...');
  }


  public deleteCompany(id: number){
    return this.http.delete(this.urlC + id).subscribe(
      (response) => {
        console.log("Compañia eliminada", response);
      },
      (error) => console.log("Hubo un error..", error)
    );
  }

 
}
