import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, Router} from '@angular/router';
import {HelperService} from '../../services/helper.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-balances',
  templateUrl: './balances.component.html',
  styleUrls: ['./balances.component.scss']
})
export class BalancesComponent implements OnInit {

  dataLength = 0;
  pageSize = 10;
  pageNumber = 1;
  pages = [];
  total = 0;
  numPages = 0;
  balanceData: any;
  status = '';
  sortField = '';
  sortToggle = false;

  constructor(private modalService: NgbModal, private router: Router, private route: ActivatedRoute, private helperService: HelperService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.fetchData();
  }

  navigateToPage(idx) {
    this.pageNumber = idx;
    this.fetchData();
  }


  fetchData() {
    this.helperService.getBalances(this.pageSize, this.pageNumber, this.status, this.sortField).subscribe((res) => {
      // console.log(res);
      this.balanceData = res['records'];
      if (this.balanceData) {
        this.dataLength = this.balanceData.length;
      }
      this.pageSize = res['pageSize'];
      this.total = res['total'];
      this.numPages = Math.ceil(res['total'] / res['pageSize']);
      this.pages = Array(this.numPages).fill(1).map((x, i) => i + 1);
    });
  }

  toggleSort(fieldName) {
    this.sortField = `${fieldName} ${this.sortToggle ? 'ASC' : 'DESC'}`;
    this.fetchData();
    if (this.sortToggle === true) {
      this.sortToggle = false;
    } else {
      this.sortToggle = true;
    }
  }
}
