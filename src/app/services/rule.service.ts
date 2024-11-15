import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class RuleService {
  constructor(private http: HttpClient) { }


addStateRule(body:any) {
  return this.http.post<any>(`${environment.apiUrl}/rule/state-rule`, body)
  .pipe(
      map(response => {
          return response;
      },
      catchError(err => {
          // console.log('Handling error locally and rethrowing it...', err);
          return JSON.parse(err.message);
      })
  ));
}

addZipRule(body:any) {
  return this.http.post<any>(`${environment.apiUrl}/rule/zip-rule`, body)
  .pipe(
      map(response => {
          return response;
      },
      catchError(err => {
          // console.log('Handling error locally and rethrowing it...', err);
          return JSON.parse(err.message);
      })
  ));
}

addProductRule(body:any) {
  return this.http.post<any>(`${environment.apiUrl}/rule/product-rule`, body)
  .pipe(
      map(response => {
          return response;
      },
      catchError(err => {
          // console.log('Handling error locally and rethrowing it...', err);
          return JSON.parse(err.message);
      })
  ));
}

getRuleList() {
    return this.http.get(`${environment.apiUrl}/rule/get-rules`);
}

updateState(body:any) {
  return this.http.put<any>(`${environment.apiUrl}/rule/state-rule/update`, body)
  .pipe(
      map(response => {
          return response;
      },
      catchError(err => {
          // console.log('Handling error locally and rethrowing it...', err);
          return JSON.parse(err.message);
      })
  ));
}

deleteStateRule(id:any) {
  return this.http.delete<any>(`${environment.apiUrl}/rule/state-rule/remove?id=${id}`)
  .pipe(
      map(response => {
          return response;
      },
      catchError(err => {
          // console.log('Handling error locally and rethrowing it...', err);
          return JSON.parse(err.message);
      })
  ));
}

deleteProductRule(id: number) {
  return this.http.delete<any>(`${environment.apiUrl}/rule/product-rule/remove?id=${id}`)
  .pipe(
      map(response => {
          return response;
      },
      catchError(err => {
          // console.log('Handling error locally and rethrowing it...', err);
          return JSON.parse(err.message);
      })
  ));
}

updateProductRule(body:any) {
  return this.http.put<any>(`${environment.apiUrl}/rule/product-rule/update`, body)
  .pipe(
      map(response => {
          return response;
      },
      catchError(err => {
          // console.log('Handling error locally and rethrowing it...', err);
          return JSON.parse(err.message);
      })
  ));
}

getProductRules(){
  return this.http.get<any>(`${environment.apiUrl}/rule/product-rules`);
}

  getStateRules(){
    return this.http.get<any>(`${environment.apiUrl}/rule/state-rules`);
  }


}
