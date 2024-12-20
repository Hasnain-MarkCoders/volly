import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, catchError } from 'rxjs/operators';


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

  getAllStates() {
    return this.http.get(`${environment.apiUrl}/states/all`);

  }

  getFilteredLocations(stateId:string,productId:string) {
    return this.http.get(`${environment.apiUrl}/rule/available-locations?stateId=${stateId}&productId=${productId}`);

  }

  getProductsForSpecificLocation(locId:string,) {
    return this.http.get(`${environment.apiUrl}/rule/available-products?locationId=${locId}`);

  }

  getStatesForSpecificProductAndLocation(prodId:string, locId:string,) {
    return this.http.get(`${environment.apiUrl}/rule/available-states?locationId=${locId}&productIds=${JSON.stringify(prodId)}`);

  }
  getFilteredLocationsForProductRule(productId:string) {
    return this.http.get(`${environment.apiUrl}/rule/available-locations2?productId=${productId}`);

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


  
  request_cms_retailer(body: any) {
    return this.http.post<any>(`${environment.apiUrl}/request-cms-retailer`, body)
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
  saveRatings(body: any) {
    return this.http.post<any>(`${environment.apiUrl}/public/brand/rate-retailer`, body)
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

  // Update Retailer
  updateBusiness(body: any) {

    return this.http.put<any>(`${environment.apiUrl}/account/edit`, body).pipe(
      map(response => {
        return response;
      }, catchError(err => {
        return JSON.parse(err.message);
      })
    ));
  }

  updateRequestedRetailer(body: any) {

    return this.http.post<any>(`${environment.apiUrl}/update-retailer-request`, body).pipe(
      map(response => {
        return response;
      }, catchError(err => {
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
  get_cms_retailers() {
    return this.http.get(`${environment.apiUrl}/get-cms-retailers`);

  }

  unassignLocation(id) {
    return this.http.put(`${environment.apiUrl}/account/unlink`, { id });
  }


  deleteBusinsess(id) {
    return this.http.post(`${environment.apiUrl}/account/delete`, { id });
  }
  deleteRequestedRetailer(id) {
    return this.http.delete(`${environment.apiUrl}/delete-retailer-request?id=${id}`);
  }
  requestedRetailerStatusToggle(id:number){
    return this.http.post(`${environment.apiUrl}/toggle-retailer-status`, { id });
  }

  fetchTrackingInfo(fulfillmentId) {
    return this.http.get(`${environment.apiUrl}/tracking-info/${fulfillmentId}`);
  }

  getPayouts(pageSize, pageNo, status, sort, orderNumber:string, retailer:string, brandName:string , createdDate:string) {
    return this.http.get(`${environment.apiUrl}/payouts?pageSize=${pageSize}&page=${pageNo}&status=${(status) ? status : ''}&sort=${sort}&orderNumber=${orderNumber}&retailer=${retailer}&brandName=${brandName}&createdDate=${createdDate}`);
  }

  getFulfillments(pageSize, pageNo, status, sort, daterange, shopifyTrackingStatus, retailer:string, brandName:string , createdDate:string) {
    const url = `${environment.apiUrl}/fulfillments?pageSize=${pageSize}&page=${pageNo}&status=${(status) ? status : ''}&sort=${sort}&daterange=${daterange}&shopifyTrackingStatus=${shopifyTrackingStatus}&retailer=${retailer}&brandName=${brandName}&createdDate=${createdDate}`;
    return this.http.get(url);
  }

  getFulfillmentTrackingDetail(shopifyOrderId, fulfillmentId, indexKey) {
    const url = `${environment.apiUrl}/fulfillment/trackingdetail?fulfillmentId=${fulfillmentId}&orderId=${shopifyOrderId}&indexKey=${indexKey}`;
    return this.http.get(url);
  }

  getBalances(pageSize, pageNo, status, sort) {
    return this.http.get(`${environment.apiUrl}/balances?pageSize=${pageSize}&page=${pageNo}&status=${(status) ? status : ''}&sort=${sort}`);
  }

  changeInHouseBusiness(id: any) {
    return this.http.put(`${environment.apiUrl}/account/change-in-house-business`, { id });
  }

  createAccountLink(body: any) {
    return this.http.post<any>(`${environment.apiUrl}/stripe/send-account-link`, body)
      .pipe(
        map(response => {
          return response;
        },
          catchError(err => {
            return JSON.parse(err.message);
          })
        ));
  }
}
