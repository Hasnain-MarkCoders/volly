import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  getOrders(pageInfo) {
    return this.http.get(`${environment.apiUrl}/orders?pageInfo=${pageInfo ? pageInfo : ''}`);

  }

  getDetail(id:any) {
    return this.http.get(`${environment.apiUrl}/order/${id}`);

  }
}
