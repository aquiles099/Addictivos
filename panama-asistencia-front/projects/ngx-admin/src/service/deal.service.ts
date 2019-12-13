import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable, BehaviorSubject } from 'rxjs';
import {environment} from '../environments/environment';


@Injectable()
export class DealService extends BaseService {
  private servicio = 'deal/create';
  private servicioget = 'deal/deals';
  private types = 'deal/types';
  public urlC = environment.url + 'deal/';

  private dealEdit = new BehaviorSubject<any>(null);
  constructor(private http: HttpClient) {
    super();
    this.url = environment.url;
  }

  saveDeal(request: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Access-Control-Allow-Methods', 'POST');
    headers = headers.append('Access-Control-Allow-Origin', '*');
    return this.http.post(this.url + this.servicio, request, { headers: headers});
  }
  getTypes(): Observable<any> {
        return this.get(this.http, this.types);
    }
  getDeals(): Observable<any> {
    return this.get(this.http, this.servicioget);
  }

    //Enviar usuario de TableDealComponent a EditDealComponent
    setDeal(deal: any) {
        this.dealEdit.next(deal);
    }

    //Obtener usuario enviado a EditCategoryComponent
    getDeal(): Observable<any> {
        return this.dealEdit.asObservable();
    }
    public updateDeal(id: number, deal: any):  Observable<any>  {
      return this.http.put(this.urlC + id, deal);
    }
}
