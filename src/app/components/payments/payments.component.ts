import {Component, OnInit} from '@angular/core';
import {NgbDateStruct, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, Router} from '@angular/router';
import {HelperService} from '../../services/helper.service';
import {ToastrService} from 'ngx-toastr';
import { AccountsService } from 'src/app/services/accounts.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  dataLength = 0;
  pageSize = 10;
  pageNumber = 1;
  pages = [];
  total = 0;
  numPages = 0;
  payoutData: any;
  status = '';
  sortField = '';
  sortToggle = false;
  search_order:string = ''
  brandName:string=''
  retailerName:string=''
  model: NgbDateStruct;
  date: { year: number; month: number; day: number };
  unixTimestamp: string='';
  currentUserValue: any = null;
  constructor(private modalService: NgbModal, private router: Router, private route: ActivatedRoute, private helperService: HelperService,
              private toastr: ToastrService,  private accountsService: AccountsService) {
  }

  ngOnInit(): void {
    this.fetchData(false);
    this.accountsService.currentUser.subscribe(user => {
      this.currentUserValue = user;

    })
  }
  clear_search_fn(){
    this.search_order = ''
    this.brandName='' 
    this.retailerName=''
    this.unixTimestamp=''
    this.status=''
    this.fetchData(true);
  }

  search_fn(){
    if (this.model && this.model.year && this.model.month && this.model.day) {
      const utcTimestamp = Math.floor(Date.UTC(
        this.model.year,
        this.model.month - 1, // Adjust month index
        this.model.day
      ) / 1000);
  
      this.unixTimestamp = utcTimestamp.toString();
      console.log("Unix Timestamp (UTC, seconds):", this.unixTimestamp);
    } else {
      console.error("Invalid date model:", this.model);
    }
    this.fetchData(true);

  }
  navigateToPage(idx) {
    this.pageNumber = idx;
    this.fetchData(false);
  }


  fetchData(isSearch:Boolean) {
    if (isSearch) {
      this.pageNumber = 1;
    }
    this.helperService.getPayouts(this.pageSize, this.pageNumber, this.status, this.sortField,this.search_order,  this.retailerName, this.brandName, this.unixTimestamp).subscribe((res) => {
      // console.log(res);
      this.payoutData = res['records'];
      if (this.payoutData) {
        this.dataLength = this.payoutData.length;
      }
      this.pageSize = res['pageSize'];
      this.total = res['total'];
      this.numPages = Math.ceil(res['total'] / res['pageSize']);
      this.pages = Array(this.numPages).fill(1).map((x, i) => i + 1);
    });
  }

  toggleSort(fieldName) {
    this.sortField = `${fieldName} ${this.sortToggle ? 'ASC' : 'DESC'}`;
    this.fetchData(false);
    if( this.sortToggle === true){
      this.sortToggle = false;
    }
    else {
      this.sortToggle = true;
    }
  }
}
