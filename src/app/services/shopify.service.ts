import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShopifyService {
  BASE_URL = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  saveShopifyInfo(STORE_URL:string, STORE_PASSWORD:string, STORE_ACCESS_ID:string, API_VERSION:string) {
    return this.http.post<any>(`${environment.apiUrl}/public/brand/save-shopify-info`, { STORE_URL, STORE_PASSWORD , STORE_ACCESS_ID, API_VERSION})
    .pipe(map(response => {
       return response
    }));
  }
  fetchShopifyData (){
    return this.http.post<any>(`${environment.apiUrl}/public/brand/fetch-shopify-data`,{})
    .pipe(map(response => {
       return response
    }));
  }

 
}
