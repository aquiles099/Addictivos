import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {Observable} from 'rxjs';
import {ComerceResquestModel} from '../model/comerce/request/comerce-request.model';
import { environment } from '../environments/environment.prod';


@Injectable()
export class ComerceService extends BaseService{
  private servicio = 'commerce/commerces'; 
  public urlC = environment.url +'commerce/';

  constructor(private http: HttpClient) {
    super();
  }

  save(request: ComerceResquestModel): Observable<any> {
    return this.post(this.http, this.servicio, request);
  }
  
  getComerce() : Observable <any> {
    return this.get(this.http,this.servicio);
  }

  public updateCommerce(commerceId: number, commerce:ComerceResquestModel): void { 
    console.log('sending patch request to add an item');
  
    this.http.put(this.urlC+commerceId, commerce).subscribe(
      res => { 
        console.log(res, 'received ok response from patch request');
      },
      error => {
        console.error('There was an error during the request');
        console.log(error);
      });
  
    console.log('request sent. Waiting for response...');
  }

  public deleteCommerce(id: number){
    return this.http.delete(this.urlC + id).subscribe(
      (response) => {
        console.log("Comercio eliminado", response);
      },
      (error) => console.log("Hubo un error..", error)
    );
  }
 
}
