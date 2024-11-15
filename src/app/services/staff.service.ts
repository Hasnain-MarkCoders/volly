import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import { map, catchError, publishReplay, refCount } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(private http: HttpClient) { }

  list(reqTablesParameters: any) {
    return this.http.post<any>(
        `${environment.apiUrl}/staff/list`,
        reqTablesParameters, {}
      ).pipe(
        map(response => {
            return response;
        },
        catchError(err => {
            return [];
        })
    ));
}

add(body: any) {
    return this.http.post<any>(`${environment.apiUrl}/staff/add`, body)
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


update(body: any) {
    return this.http.put<any>(`${environment.apiUrl}/staff/edit`, body)
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

delete(id: number) {
    return this.http.delete<any>(`${environment.apiUrl}/staff/delete?id=${id}`)
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

resetPassword(id: number, password: string) {
    return this.http.put<any>(`${environment.apiUrl}/staff/resetPassword`, {id, password})
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
