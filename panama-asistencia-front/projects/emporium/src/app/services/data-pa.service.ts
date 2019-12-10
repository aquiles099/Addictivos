import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map } from "rxjs/operators";
import { throwError } from 'rxjs/internal/observable/throwError';
import { BehaviorSubject } from 'rxjs';
import { Deal, OptionPrice } from '../app.models';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: 'root'
})
export class DataPaService {

  public json;
  public url = environment.url;
  public dealUrl: string = 'deal/deals';
  private deal = new BehaviorSubject<Deal>(null);
  private option = new BehaviorSubject<OptionPrice>(null);

  constructor(public http: HttpClient) { }
  
  //Function to extract the data from the Json
  public getData(): Observable<any> {
    
    return this.http.get(this.url + this.dealUrl, httpOptions).pipe(map(this.extractData), catchError(this.handleError));
  }

  //Function to extract the data when the server return some
  private extractData(res: Response) {
    let body = res['data'];
    return body || {};
  }

  //Function to handle error when the server return an error
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code. The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError(error);
  }

  getDeal(): Observable<Deal> {
    return this.deal.asObservable();
  }

  getOption(): Observable<OptionPrice> {
    return this.option.asObservable();
  }

  updateDeal(deal: Deal) {
    this.deal.next(deal);
  }
  updateOption(option: OptionPrice) {
    this.option.next(option);
  }
  
}

