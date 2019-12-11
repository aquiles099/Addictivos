import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from "rxjs/index";
import { User } from '../../app.models';
import { environment } from '../../../environments/environment'
import { tap, catchError } from 'rxjs/operators';
import { UserModel } from 'projects/ngx-admin/src/model/user/response/userModel.model';
import { ComerceResquestModel } from 'projects/ngx-admin/src/model/comerce/request/comerce-request.model';
import { CompanyModel } from 'projects/ngx-admin/src/model/company/response/companyModel.model';
//import { ApiResponse } from "../model/api.response";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
//const apiUrl = "/api/v1/products";
const baseUrl = environment.url;

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private urlRole = environment.url + 'user/user_by_role/';

  private userEdit = new BehaviorSubject<UserModel>(null);
  private commerceEdit = new BehaviorSubject<ComerceResquestModel>(null);
  private companyEdit = new BehaviorSubject<CompanyModel>(null);

  constructor(private http: HttpClient) { }

  //Enviar usuario de TableUserComponent a EditUserComponent
  updateUser(user: UserModel) {
    this.userEdit.next(user)
  }

  //Obtener usuario enviado a EditUserComponent
  getUser(): Observable<UserModel> {
    return this.userEdit.asObservable();
  }

  //Enviar usuario de TableComerceComponent a EditCommerceComponent
  updateCommerce(commerce: ComerceResquestModel) {
    this.commerceEdit.next(commerce);
  }

  //Obtener usuario enviado a EditCommerceComponent
  getCommerce(): Observable<ComerceResquestModel> {
    return this.commerceEdit.asObservable();
  }

  //Enviar usuario de TableCompanyComponent a EditCompanyComponent
  updateCompany(company: CompanyModel) {
    this.companyEdit.next(company);
  }

  //Obtener usuario enviado a EditCompanyComponent
  getCompany(): Observable<CompanyModel> {
    return this.companyEdit.asObservable();
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getUsers(): Observable<User> {
    return this.http.get<User>(baseUrl + 'user/users');
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(baseUrl + 'user/' + id);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(baseUrl + 'user/create', user);
  }

  addProduct(user: User): Observable<User> {
    return this.http.post<User>(baseUrl + 'user/create', user, httpOptions).pipe(
      tap((usr: User) => console.log(`added product w/ id=${user.id}`)),
      catchError(this.handleError<User>('addProduct'))
    );
  }

  public userByRole(id_role: number): Observable<any>{
    return this.http.get<any>(this.urlRole + id_role);
  }


}
