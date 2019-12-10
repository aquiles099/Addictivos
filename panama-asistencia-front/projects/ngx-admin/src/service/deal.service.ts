import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { DealResquestModel } from '../model/deal/request/deal-request.model';


@Injectable()
export class DealService extends BaseService {
  private servicio = 'deal/create';
  private servicioget = 'deal/deals';

  constructor(private http: HttpClient) {
    super();
  }

  saveDeal(request: DealResquestModel): Observable<any> {
    console.log('entro aqui');
    return this.post(this.http, this.servicio, request);
  }

  getDeals(): Observable<any> {
    return this.get(this.http, this.servicioget);
  }


}
