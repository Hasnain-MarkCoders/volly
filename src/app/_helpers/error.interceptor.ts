import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
// import { AuthenticationService } from '../services';
// import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor( private router: Router,) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
          console.log(err)
            if (err.status === 401) {
                this.router.navigate(['/login'])
            }else if([504].indexOf(err.status)!==-1){
              alert('Network connection is low')
                // Swal.fire({
                //     title: 'Oops!',
                //     text:  'Network connection is low',
                //     buttonsStyling: false,
                //     confirmButtonClass: 'btn btn-danger',
                //     type: 'error'
                //   });
              }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }));
    }
}