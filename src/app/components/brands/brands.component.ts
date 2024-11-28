import { BrandsService } from './../../services/brands.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import * as moment from 'moment';
import * as $ from 'jquery';
@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss'],
})
export class BrandsComponent implements OnInit {
  dataLength = 0;
  pageSize = 10;
  pageNumber = 1;
  pages = [];
  total = 0;
  numPages = 0;
  payoutData: any;
  loading = true;
  constructor(
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private helperService: BrandsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.fetchData(false);
  }

  navigateToPage(idx) {
    this.pageNumber = idx;
    console.log(idx);
    // this.payoutData = [];
    this.fetchData(false);
  }

  fetchData(isSearch: boolean) {
    this.loading = true;
    this.payoutData = [];


    this.helperService
      .getFulfillments(this.pageSize, this.pageNumber)
      .subscribe(async (res) => {
        this.payoutData = res['data'];
        if (this.payoutData) {
          this.dataLength = this.payoutData.length;
        }

        this.pageSize = res['pageSize'];

        if (this.pageNumber == 1) {
          this.numPages = Math.ceil(res['total'] / res['pageSize']);
          this.total = res['total'];
        }

        this.pages = Array(this.numPages)
          .fill(1)
          .map((x, i) => i + 1);
        this.loading = false;

        // added by gaurav mangukiya
      });
  }
}
