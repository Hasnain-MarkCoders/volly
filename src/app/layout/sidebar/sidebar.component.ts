import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountsService } from '../../services/accounts.service';
declare var $: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  constructor(private router: Router,     private accountsService: AccountsService,) {

    $(document).ready(function () {
      $('.menu_btn').click(function () {
        $(this).toggleClass('active');
        $(".sidebar").toggleClass('active');
      })
    })
  }

  ngOnInit() {
  }

  logout() {
    this.accountsService.logout();
    this.router.navigate(['/login']);
}



  isSelected(route: string): boolean {
    return route === this.router.url;
  }
}
