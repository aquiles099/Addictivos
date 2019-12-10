import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { map, catchError, delay } from 'rxjs/operators';
import { Card } from '../app.models';
import { MatSnackBar } from '@angular/material';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    'Authorization': 'my-auth-token'
  })
};


@Injectable({
  providedIn: 'root'
})

export class UserService {
  public url = environment.url + 'user/';

  constructor(public http: HttpClient, public snackBar: MatSnackBar) { }

  public getUserCards(id: number): Observable<any> {
    return this.http.get(this.url + id + '/card/cards', httpOptions).pipe(
      map(this.extractData), catchError(this.handleError)
    );

  }
  public saveUserCard(id: number, card: Card) {
    return this.http.post(this.url + id + '/card/create', card, httpOptions).subscribe(
      (response) => {
        console.log(response);
        this.snackBar.open('Se ha agregado una nueva tarjeta', 'Cerrar', {
          duration: 3000,
        });
      },
      (error) => console.log(error)
    );
  }

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

  //Function to extract the data when the server return some
  private extractData(res: Response) {
    let body = res['data']['user_cards'];
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


}
