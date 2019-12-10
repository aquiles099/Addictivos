import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { PaymentRequestModel } from '../model/payment/request/payment-request.model';


@Injectable()
export class PaymentService extends BaseService {
    private servicio = 'paymentplatform/create';
    private platafforms = 'paymentplatform/paymentplatforms';

    constructor(private http: HttpClient) {
        super();
    }

    savePayment(request: FormData): Observable<any> {
        console.log(request);
        return this.postimg(this.http, this.servicio, request);
    }

    getPlatafforms() : Observable < PaymentRequestModel > {
        return this.get(this.http,this.platafforms);
       // return this.http.get<PaymentRequestModel>(this.http + this.platafforms);
      }

}
