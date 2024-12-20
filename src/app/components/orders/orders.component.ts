import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrdersService } from '../../services/orders.service';
import { ToastrService } from 'ngx-toastr';
import { AccountsService } from 'src/app/services/accounts.service';
import { BrandProfileService } from './../../services/brand-profile.service';

import * as $ from 'jquery';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  currentUserValue: any = null;
  loading: any;
  orders: any[] = [];
  orderDetails: any;
  date: any;
  propertyAddedDate: any;
  pageInfo = '';
  navInfo = { next: false, prev: false };
  email: string;
  search_order: string;
  id: number;
  storeName:string

  constructor(
    private orderService: OrdersService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private accountsService: AccountsService,
    private brandService: BrandProfileService,

  ) {}

  ngOnInit(): void {
    this.loading = true;

    this.orderService.getOrders(this.pageInfo).subscribe((resp: any) => {
      this.orders = resp.orders;
      this.navInfo = resp.nav;
      this.loading = false;
    });
    this.accountsService.currentUser.subscribe(user => {
      this.currentUserValue = user;
      this.id = this.currentUserValue?.user?.id;
    })
    this.FetchData()
  }

  open(content, order) {
    this.orderService.getDetail(order.id).subscribe((resp: any) => {
      this.orderDetails = resp.order;
      this.date = new Date(this.orderDetails.created_at);
      let year = this.date.getFullYear();
      let month = this.date.getMonth() + 1;
      let dt = this.date.getDate();

      if (dt < 10) {
        dt = '0' + dt;
      }
      if (month < 10) {
        month = '0' + month;
      }
      this.propertyAddedDate = dt + '-' + month + '-' + year;
      this.modalService
        .open(content, { ariaLabelledBy: 'modal-basic-title' })
        .result.then(
          (result) => {},
          (reason) => {}
        );
    });
  }


  
  openSendMail(content, order) {
    this.orderService.getDetail(order.id).subscribe((resp: any) => {
      this.orderDetails = resp.order;
      this.date = new Date(this.orderDetails.created_at);
      let year = this.date.getFullYear();
      let month = this.date.getMonth() + 1;
      let dt = this.date.getDate();

      if (dt < 10) {
        dt = '0' + dt;
      }
      if (month < 10) {
        month = '0' + month;
      }
      this.propertyAddedDate = dt + '-' + month + '-' + year;
      this.modalService
        .open(content, { ariaLabelledBy: 'modal-basic-title' })
        .result.then(
          (result) => {},
          (reason) => {}
        );
    });
  }

  nextPage() {
    this.pageInfo = this.navInfo['nextInfo'];
    this.ngOnInit();
  }

  prevPage() {
    this.pageInfo = this.navInfo['prevInfo'];
    this.ngOnInit();
  }

  searchOrder(value) {
    if (value) {
      if (!this.search_order || this.search_order == '') {
        $('.invalid-search-order').show();
        $('.input-search-order').css('border', '1px solid #FF0000');
        return false
      }

      $('.invalid-search-order').hide();
      $('.input-search-order').css('border', '1px solid #ced4da');

      this.loading = true;
      this.orderService
        .getOrdersByOrderNumber(this.search_order)
        .subscribe((resp: any) => {
          this.orders = resp.orders;
          this.navInfo = resp.nav;
          this.loading = false;
        });
    } else {
      this.search_order = '';
      this.pageInfo = '';
      this.ngOnInit();
    }
  }

  resendEmail(email: string, id: any) {
    this.orderService.resendMail(email, id).subscribe(
      (res) => {
        this.toastr.success('Email has been resent');
        this.email = '';
      },
      (error1) => {
        this.toastr.error(error1);
      }
    );
  }

  FetchData() {
    this.brandService.fetchBrand(this.id).subscribe(
      (res) => {
        this.id = res?.data.id;
        this.storeName = res?.data.storeName;
      },
      (error) => {
        this.toastr.error(error ? error : error?.error?.message, 'Error');
      }
    );
  }
  fulfillOrder(order) {
    console.log("this.storeName==================================>", this.storeName)
    this.orderService.fulfillOrder(order, this.storeName).subscribe((resp: any) => {
      // console.log("resp", resp);
      this.ngOnInit();
    });
  }
}
