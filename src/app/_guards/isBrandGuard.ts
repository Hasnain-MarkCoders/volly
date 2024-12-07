import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AccountsService } from '../services/accounts.service';

@Injectable({
  providedIn: 'root'
})
export class IsBrandGuard implements CanActivate {

  constructor(private router: Router, private accountsService: AccountsService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUser = this.accountsService.currentUserValue;

    // Check if the user is authenticated and roleId < 3 to access /brands
    if (currentUser && currentUser.roleId >= 3) {
      return true;
    }

    // If roleId >= 3 or not authenticated, redirect to another route (e.g., dashboard)
    this.router.navigate(['/']);  // Adjust the redirection as needed
    return false;
  }
}
