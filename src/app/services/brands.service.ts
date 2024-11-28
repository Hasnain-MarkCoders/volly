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

  getFulfillments(pageSize, pageNo) {
    console.log(pageSize, pageNo)
    const url = `${environment.apiUrl}/public/brand/all?pageSize=${pageSize}&page=${pageNo}`;
    return this.http.get(url);
  }

 
}
