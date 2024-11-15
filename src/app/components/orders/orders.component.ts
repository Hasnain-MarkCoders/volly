import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrdersService } from '../../services/orders.service'
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  orderDetails: any;
  date: any;
  propertyAddedDate: any;
  pageInfo = '';
  navInfo = {next: false, prev: false};
  constructor(private orderService: OrdersService, private modalService: NgbModal) { }

  ngOnInit(): void {

    this.orderService.getOrders(this.pageInfo).subscribe((resp: any) => {
      this.orders = resp.orders;
      this.navInfo = resp.nav;
    });
  }

  open(content, order) {
    this.orderService.getDetail(order.id).subscribe((resp: any) => {
      this.orderDetails = resp.order;
      this.date = new Date(this.orderDetails.created_at)
      let year = this.date.getFullYear();
      let month = this.date.getMonth() + 1;
      let dt = this.date.getDate();

      if (dt < 10) {
        dt = '0' + dt;
      }
      if (month < 10) {
        month = '0' + month;
      }
      this.propertyAddedDate = dt + '-' + month + '-' + year
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {

      }, (reason) => {

      });
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
}
