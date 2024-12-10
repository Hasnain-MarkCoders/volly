// home.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountsService } from 'src/app/services/accounts.service';

@Component({
  selector: 'app-home',
  template: ``
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, private accountsService: AccountsService) {}

  ngOnInit() {
    const currentUser = this.accountsService.currentUserValue;
    if (currentUser && currentUser.roleId < 3) {
      // Admin user
      this.router.navigate(['/kpis-across-brands']);
    } else {
      // Brand user or anyone else
      this.router.navigate(['/orders']);
    }
  }
}
