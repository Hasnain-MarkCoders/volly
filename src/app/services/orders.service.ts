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

  resendMail(email, orderId){
    return this.http.post(`${environment.apiUrl}/order/sendTrackingLink`, {email, orderId});
  }

  fulfillOrder(order){
    return this.http.post(`${environment.apiUrl}/webhook/order`, order);
  }

  getOrdersByOrderNumber(order_number) {
    return this.http.get(`${environment.apiUrl}/orders?searchOrderNumber=${order_number ? order_number : ''}`);
  }
}
