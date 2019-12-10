import {environment} from '../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

export class BaseService {
  public url: string;

  constructor() {
    this.url = environment.url;
  }

  get(http: HttpClient, servicio: string, request?: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Access-Control-Allow-Origin', '*');
    const o = { headers: headers};
    console.log(this.url + servicio);
    return http.get(this.url + servicio,  o);
  }

  post(http: HttpClient, servicio: string, request: any): Observable<any> {
    
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Access-Control-Allow-Methods', 'POST');
    headers = headers.append('accept', 'application/json');
    headers = headers.append('Access-Control-Allow-Origin', '*');
    const o = { headers: headers};
    return http.post(this.url + servicio, request, o);
  }

  postimg(http: HttpClient, servicio: string, request: any): Observable<any> {
    
    let headers = new HttpHeaders();
    headers = headers.append('Access-Control-Allow-Methods', 'POST');
    headers = headers.append('accept', 'application/json');
    headers = headers.append('Access-Control-Allow-Origin', '*');
    const o = { headers: headers};
    return http.post(this.url + servicio, request, o);
  }
/*
  patch(http: HttpClient, servicio: string, request: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    const o = { headers: headers};
    return http.patch(this.url + servicio, request, o);

  }


  view(http: HttpClient, servicio: string, reuqest: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Access-Control-Allow-Methods', 'HEAD');
    headers = headers.append('Access-Control-Allow-Origin', '*');
    const o = { headers: headers};
    return http.head(this.url + servicio, );
  }*/

  private getParameters(request) {
    const respuesta = Object.keys(request).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(request[k])).join('&');
    return respuesta;
  }
}

