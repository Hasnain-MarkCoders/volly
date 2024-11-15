import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AccountsService } from '../services/accounts.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AccountsService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        const rememberMe = localStorage.getItem('rememberMe');
        // const loggedInTime = local.getItem('loggedIn');
        let loggedIn = false;
        if (currentUser) {
            // logged in so return true
            if (rememberMe == 'true') {
                return true
                // this.authenticationService.accessTokenlogin().subscribe(response => {
                //     // console.log(response);
                // });
            }
            return true;
        }
        setTimeout(() => {
            // this.authenticationService.logout();
            // not logged in so redirect to login page with the return url
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        }, 1000);
        return false;
    }
}
