import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment'
import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
   }

   public get currentUserValue(): any {
    return this.currentUserSubject.value;
}
  
  login(email: string, password: string, rememberMe: boolean) {
    return this.http.post<any>(`${environment.apiUrl}/public/super/admin/login`, { email, password })
        .pipe(map(response => {
            if (response.data.accessToken) {
                const user = response.data;
                // login successful if there's a jwt token in the response
                if (user && user.accessToken) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    // local.setItem('loggedIn', moment());
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    localStorage.setItem('rememberMe', `${rememberMe}`);
                    // console.log(user);
                    this.currentUserSubject.next(user);
                }
                return user;
            }
        }));
}

logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('currentUser');
  localStorage.removeItem('rememberMe');
  this.currentUserSubject.next(null);
}
}
