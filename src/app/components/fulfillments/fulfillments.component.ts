import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService } from '../../services/helper.service';
import { ToastrService } from 'ngx-toastr';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import * as moment from 'moment';
import * as $ from 'jquery';
import { AccountsService } from 'src/app/services/accounts.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-fulfillments',
  templateUrl: './fulfillments.component.html',
  styleUrls: ['./fulfillments.component.scss'],
})
export class FulfillmentsComponent implements OnInit {
  dataLength = 0;
  pageSize = 10;
  pageNumber = 1;
  pages = [];
  total = 0;
  numPages = 0;
  payoutData: any;
  fulfillmentInterval: any;
  status = '';
  sortField = '';
  sortToggle = false;
  loading = true;
  daterange = '';
  shopifyTrackingStatus = '';
  displayExport = false;
  brandName:string=''
  retailerName:string=''
  model: NgbDateStruct;
  date: { year: number; month: number; day: number };
  unixTimestamp: string='';
  currentUserValue: any = null;
  ratingForm: FormGroup;
  communicationRating: number = 0;
  speedRating: number = 0;
  priceRating: number = 0;
  stars: boolean[] = [true, true, true, true, true]; // 5 stars
  retailerId: string;
  fulfillment_id: string;
  constructor(
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private helperService: HelperService,
    private toastr: ToastrService,
    private accountsService: AccountsService,
    private fb: FormBuilder
  ) {}


  ngOnInit(): void {
    this.initializeRatingForm()
    this.fetchData(false);
    this.accountsService.currentUser.subscribe(user => {
      this.currentUserValue = user;

    })
  }
  starGenerator=(num:number)=>num===0?"no rating":Array.from({length:num}).fill("⭐").join("")

  initializeRatingForm(): void {
    this.ratingForm = this.fb.group({
      communication: [1, Validators.required],
      speed: [1, Validators.required],
      price: [1, Validators.required]
    });
  }


    // Open Rating Modal
    openRatingModal(content, retailer) {
      console.log("retailer", retailer)
      this.retailerId = retailer?.accountId;  // retailer object with id and other details
      this.fulfillment_id = retailer?.fulfillmentId
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    }
  
    // Set rating on click (1-5 stars)
    setRating(type: string, rating: number): void {
      if (type === 'communication') {
        this.communicationRating = rating;
      } else if (type === 'speed') {
        this.speedRating = rating;
      } else if (type === 'price') {
        this.priceRating = rating;
      }
    }
  
  
    submitRating(): void {
      if (this.ratingForm.invalid) {
        return;
      }
  
      const ratingData = {
        retailer_id: this.retailerId,
        comm_rating: this.communicationRating,
        speed_rating: this.speedRating,
        price_rating: this.priceRating,
        fulfillment_id:this.fulfillment_id
      };
  
      // Call the backend service to save ratings
      this.saveRatings(ratingData);
    }

    saveRatings(ratingData: any): void {
      console.log(ratingData)
      // API call to save the ratings
      this.helperService.saveRatings(ratingData).subscribe(response => {
        this.toastr.success(response?.message);
        this.modalService.dismissAll();
        this.communicationRating=0
        this.speedRating=0
        this.priceRating=0
        this.fetchData(false);
      }, error => {
        this.toastr.error('Failed to save ratings');
      });
  
    }
  clear_search_fn(){
    this.brandName='' 
    this.retailerName=''
    this.unixTimestamp=''
    this.status=''
    this.daterange=''
    this.shopifyTrackingStatus=''
    this.model=null
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
    // this.payoutData = [];
    this.fetchData(false);
  }

  fetchData(isSearch) {
    this.displayExport = false;
    this.loading = true;
    this.payoutData = [];
    if ((this.status == '' && this.daterange == '') || this.shopifyTrackingStatus != '') {
      this.pageSize = 10;
      if (isSearch) {
        this.pageNumber = 1;
      }
    } else {
      this.pageNumber = 1;
      this.pageSize = 10;
    }

    this.helperService
      .getFulfillments(
        this.pageSize,
        this.pageNumber,
        this.status,
        this.sortField,
        this.daterange,
        this.shopifyTrackingStatus,
        this.retailerName,
         this.brandName,
          this.unixTimestamp
          // console.log(res);
      )
      .subscribe(async (res) => {
        clearInterval(this.fulfillmentInterval);
        this.payoutData = res['records'];

        if (this.payoutData) {
          this.dataLength = this.payoutData.length;
        }

        this.pageSize = res['pageSize'];
        console.log(this.pageSize);

        if(this.pageNumber == 1){
          this.numPages = Math.ceil(res['total'] / res['pageSize']);
          this.total = res['total'];
        }

        this.pages = Array(this.numPages)
          .fill(1)
          .map((x, i) => i + 1);
        this.loading = false;

        // added by gaurav mangukiya
        this.payoutData.forEach((element, index) => {
          this.payoutData[index]['shopifyTrackingStatus'] = element.shopifyTrackingStatus ? element.shopifyTrackingStatus : "-";
          let trackingDate;
          let daysOutstanding;
          var shopifyOrderDate = moment(element.createdAt);
          if(element.shopifyTrackingUpdateAt){
            trackingDate = moment(element.shopifyTrackingUpdateAt);
            daysOutstanding = trackingDate ? trackingDate.from(shopifyOrderDate, true) : '-';
          }
          this.payoutData[index]['shopifyTrackingDate'] = trackingDate;

          this.payoutData[index]['daysOutstanding'] = daysOutstanding;
        });

        this.displayExport = true;


        // if (fulfillmentLength) {
        //   let status =
        //     this.status === 'true' || this.status === '' ? true : false;

        //   if (status) {
        //     this.fulfillmentInterval = setInterval(() => {
        //       if (i < fulfillmentLength) {
        //         this.displayExport = false;
        //         const element = this.payoutData[i];

        //         if (element.status !== undefined && element.status == 1) {
        //           this.helperService
        //             .getFulfillmentTrackingDetail(
        //               element.shopifyOrderId,
        //               element.fulfillmentId,
        //               i
        //             )
        //             .subscribe((res) => {
        //               let record = res['record'];
        //               var shopifyOrderDate = moment(element.createdAt);
        //               var trackingDate: any = '-';
        //               var daysOutstanding: any = '-';

        //               if (record && record.updated_at) {
        //                 trackingDate = moment(record.updated_at);
        //                 daysOutstanding = trackingDate
        //                   ? trackingDate.from(shopifyOrderDate, true)
        //                   : '-';
        //               }

        //               if (record) {
        //                 this.payoutData[record.indexKey][
        //                   'shopifyTrackingStatus'
        //                 ] = record.shopifyTrackingStatus;
        //                 this.payoutData[record.indexKey][
        //                   'shopifyTrackingDate'
        //                 ] = trackingDate;
        //                 this.payoutData[record.indexKey]['daysOutstanding'] =
        //                   daysOutstanding;
        //               }
        //             });
        //         } else {
        //           this.payoutData[i]['shopifyTrackingStatus'] = '-';
        //           this.payoutData[i]['shopifyTrackingDate'] = '-';
        //           this.payoutData[i]['daysOutstanding'] = '-';
        //         }

        //       } else {
        //         this.displayExport = true;
        //         clearInterval(this.fulfillmentInterval);
        //       }
        //       i++;
        //     }, 500);
        //   } else {
        //     this.displayExport = true;
        //   }
        // } else {
        //   this.displayExport = false;
        // }
      });
  }

  toggleSort(fieldName) {
    this.sortField = `${fieldName} ${this.sortToggle ? 'ASC' : 'DESC'}`;
    this.fetchData(false);
    if (this.sortToggle === true) {
      this.sortToggle = false;
    } else {
      this.sortToggle = true;
    }
  }

  exportToExcel() {
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Fullfilments');

    worksheet.columns = [
      { header: 'Order Number', key: 'orderNumber', width: 15 },
      { header: 'Order URL', key: 'shopifyOrderURL', width: 30 },
      { header: 'Amount', key: 'amount', width: 10 },
      { header: 'CMS Retailer', key: 'retailerName', width: 30 },
      { header: 'Shopify Location', key: 'locationName', width: 30 },
      { header: 'Tracking Status', key: 'status', width: 15 },
      { header: 'Tracking Number', key: 'shopifyTrackingNumber', width: 15 },
      { header: 'Tracking Link', key: 'shopifyTrackingLink', width: 40 },
      {
        header: 'Shopify Tracking Status',
        key: 'shopifyTrackingStatus',
        width: 30,
      },
      { header: 'Shopify Order Timestamp', key: 'createdAt', width: 30 },
      { header: 'Tracking Timestamp', key: 'shopifyTrackingDate', width: 30 },
      { header: 'Days Outstanding', key: 'daysOutstanding', width: 30 },
    ];

    this.payoutData.forEach((e) => {
      var row = {
        orderNumber: e.orderNumber,
        shopifyOrderURL: e.shopifyOrderURL,
        amount: e.amount.toFixed(2),
        retailerName: e.retailerName,
        locationName: e.locationName,
        status: e.status ? 'SUCCESS' : 'PENDING',
        shopifyTrackingNumber: e.shopifyTrackingNumber
          ? e.shopifyTrackingNumber
          : '-',
        shopifyTrackingLink: e.shopifyTrackingLink
          ? e.shopifyTrackingLink
          : '-',
        shopifyTrackingStatus: e.shopifyTrackingStatus
          ? e.shopifyTrackingStatus
          : '-',
        createdAt: moment(e.createdAt).format('MMMM DD YYYY'),
        shopifyTrackingDate: e.shopifyTrackingDate
          ? moment(e.shopifyTrackingDate).format('MMMM DD YYYY')
          : '-',
        daysOutstanding: e.daysOutstanding ? e.daysOutstanding : '-',
      };
      worksheet.addRow(row, 'n');
    });

    var filename =
      'Volley CMS Fulfillment Export-' +
      moment().format('MM_DD_YYYY') +
      '.xlsx';

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      fs.saveAs(blob, filename);
    });
  }
}
