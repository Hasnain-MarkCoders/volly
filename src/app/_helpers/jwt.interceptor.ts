import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountsService } from '../services/accounts.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private accountsService: AccountsService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const currentUser = this.accountsService.currentUserValue;
    if (currentUser && currentUser.accessToken) {
      if (!request.url.includes('https://volleyapi.konnectshift.com/add-tracking')) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${currentUser.accessToken}`,
          }
        });
      }
    }


    return next.handle(request);
  }
}
