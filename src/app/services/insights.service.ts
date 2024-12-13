import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Observable } from 'rxjs';
interface InsightResponse {
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderRadius: number;
  }[];
}
@Injectable({
  providedIn: 'root'
})

export class InsightsService {

  constructor(private http: HttpClient) { }

  
  getInsights(data:any): Observable<InsightResponse> {
    let params = new HttpParams();
    if (data) {
      Object.keys(data).forEach(key => {
        params = params.set(key, data[key]);
      });
    }

    return this.http.get<InsightResponse>(`${environment.apiUrl}/public/kpi/orders`, { params });
  }
}
