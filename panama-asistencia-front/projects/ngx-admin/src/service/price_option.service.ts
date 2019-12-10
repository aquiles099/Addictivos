import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {Observable} from 'rxjs';
import {PriceOptionResquestModel} from '../model/price_option/request/price_option-request.model';


@Injectable()
export class PriceOptionService extends BaseService{
  private servicio = '/deal/1/optionprice/create'; 

  constructor(private http: HttpClient) {
    super();
  }

  savePriceOption(request: PriceOptionResquestModel): Observable<any> {
    return this.post(this.http, this.servicio, request);
  }

 
}
