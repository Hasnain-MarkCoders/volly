import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AccountsService } from '../services/accounts.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PreventLoggedInGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AccountsService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
            this.router.navigate(['/']);
            return false;
        }
        return true;
    }
}
