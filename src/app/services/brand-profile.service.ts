import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class BrandProfileService {
  BASE_URL = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  updateBrand(data:Object) {
    return this.http.post<any>(`${environment.apiUrl}/public/brand/update-details`, { ...data,accountId:"test"})
    .pipe(map(response => {
       return response
    }));
  }
  fetchBrand (id:number){
    return this.http.get<any>(`${environment.apiUrl}/public/brand?brand_id=${id}`)
    .pipe(map(response => {
       return response
    }));
  }
}