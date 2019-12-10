import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MatSnackBar } from '@angular/material';
import { Purchase } from '../app.models';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  public url = environment.url + 'purchase/';

  constructor(public http: HttpClient, public snackBar: MatSnackBar) { }
/*
  public getUserCards(id: number): Observable<any> {
    return this.http.get(this.url + id + '/card/cards', httpOptions).pipe(
      map(this.extractData), catchError(this.handleError)
    );
  }
*/
  public savePurchase(purchase: Purchase) {
    return this.http.post(this.url + 'create', purchase, httpOptions).subscribe(
      (response) => {
        console.log(response);
        localStorage.setItem('response', JSON.stringify(response['data']['purchase']));
        this.snackBar.open('Se ha registrado su compra', 'Cerrar', {
          duration: 3000,
        });
      },
      (error) => {
        console.log(error);
        this.snackBar.open('Lo sentimos, hubo un error. Intente de nuevo', 'Cerrar', {
          duration: 3000,
        });}
    );
  }

  /*
  public deleteUserCard(idUser: number, idCard: number){
    return this.http.delete(this.url + idUser + '/card/'+ idCard, httpOptions).subscribe(
      (response) => {
        console.log(response);
        this.snackBar.open('Se ha eliminado una tarjeta', 'Cerrar', {
          duration: 3000,
        });
      },
      (error) => console.log(error)
    );
  }
*/

  //Function to extract the data when the server return some
  private extractData(res: Response) {
    let body = res;
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


public getIPAddress(){
  return this.http.get("http://api.ipify.org/?format=json").pipe(
    map(this.extractData), catchError(this.handleError)
  );
}
}
