import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  BASE_URL = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  getFulfillments(pageSize, pageNo, retailer:string, brandName:string , createdDate:string) {
    console.log(pageSize, pageNo)
    const url = `${environment.apiUrl}/public/brand/all?pageSize=${pageSize}&page=${pageNo}&retailer=${retailer}&brandName=${brandName}&createdDate=${createdDate}`;
    return this.http.get(url);
  }

 updateCommision (body:any){

  return this.http.post<any>(`${environment.apiUrl}/public/brand/handle-commission`, body)
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
 updateBrand (body:any){
  return this.http.post<any>(`${environment.apiUrl}/public/brand/update-details`, body)
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
}
