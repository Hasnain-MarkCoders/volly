import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map, catchError} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HelperService {

  BASE_URL = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  getLocations() {
    return this.http.get(`${environment.apiUrl}/locations`);

  }

  getState() {
    return this.http.get(`${environment.apiUrl}/states`);

  }

  getProducts() {
    return this.http.get(`${environment.apiUrl}/products`);

  }

  addTracking(body: any) {
    return this.http.post<any>(`${environment.apiUrl}/add-tracking`, body)
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

  addBusiness(body: any) {
    return this.http.post<any>(`${environment.apiUrl}/stripe/create-account`, body)
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

  activateAccount(body: any) {
    return this.http.put<any>(`${environment.apiUrl}/account/activate`, body)
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

  assignLocation(body: any) {
    return this.http.put<any>(`${environment.apiUrl}/account/link`, body)
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

  getRetailer() {
    return this.http.get(`${environment.apiUrl}/account/list`);

  }

  unassignLocation(id) {
    return this.http.put(`${environment.apiUrl}/account/unlink`, {id});
  }


  deleteBusinsess(id) {
    return this.http.post(`${environment.apiUrl}/account/delete`, {id});
  }

  fetchTrackingInfo(fulfillmentId) {
    return this.http.get(`${environment.apiUrl}/tracking-info/${fulfillmentId}`);
  }

  getPayouts(pageSize, pageNo, status, sort) {
    return this.http.get(`${environment.apiUrl}/payouts?pageSize=${pageSize}&page=${pageNo}&status=${(status) ? status :  ''}&sort=${sort}`);
  }

  getFulfillments(pageSize, pageNo, status, sort) {
    const url = `${environment.apiUrl}/fulfillments?pageSize=${pageSize}&page=${pageNo}&status=${(status) ? status :  ''}&sort=${sort}`;
    return this.http.get(url);
  }

  getBalances(pageSize, pageNo, status, sort) {
    return this.http.get(`${environment.apiUrl}/balances?pageSize=${pageSize}&page=${pageNo}&status=${(status) ? status :  ''}&sort=${sort}`);
  }
}
