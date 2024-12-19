import { BrandsService } from './../../services/brands.service';
import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import * as moment from 'moment';
import * as $ from 'jquery';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountsService } from 'src/app/services/accounts.service';
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
  commissionForm: FormGroup;
  editForm: FormGroup;
  currentBrandId: string;
  brandName:string=''
  retailerName:string=''
  model: NgbDateStruct;
  date: { year: number; month: number; day: number };
  unixTimestamp: string='';
  currentUserValue: any = null;
  constructor(
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private helperService: BrandsService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private accountsService: AccountsService
  ) {}

  ngOnInit(): void {
    this.fetchData(false);
    this.initializeCommissionForm();
    this.accountsService.currentUser.subscribe(user => {
      this.currentUserValue = user;

    })
  }

  clear_search_fn(){
    this.brandName='' 
    this.retailerName=''
    this.unixTimestamp=''
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
  handleNavigate (id){
    this.router.navigate(['/brand-profile'], { queryParams: { id } });
  }

  initializeCommissionForm(): void {
    this.commissionForm = this.fb.group({
      commission: ['', [Validators.required, Validators.pattern(/^\d{2}$/)]], // Validate percentage like 50% or 10.5%
    });
    this.editForm = this.fb.group({
      brandName: ['', [Validators.required]],
      email: ['', [
        Validators.required,
        Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')
      ]],
      contact: ['', [Validators.required]],
      website: ['', [Validators.required]],
      isActivated: [true, [Validators.required, Boolean]],
    });
  }

  // Open the modal to edit the commission of a specific brand
  openEditCommissionModal(data, content) {
    this.currentBrandId = data?.id; // Get the ID of the brand
    this.commissionForm.patchValue({
      commission: data.commission || '', // Pre-fill the commission input
    });
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  // Submit the form after editing the commission
  submitCommission(): void {
    if (this.commissionForm.invalid) {
      return;
    }

    const updatedCommission = this.commissionForm.value.commission;
    const updatedData = {
      brand_id: this.currentBrandId?.toString(),
      commission: updatedCommission,
    };

    // Call the API to update the commission (assuming saveCommission is an API service method)
    this.saveCommission(updatedData);
  }

  // Simulated API call to save the commission
  saveCommission(data): void {
    this.helperService.updateCommision(data).subscribe(
      (response) => {
        this.modalService.dismissAll();
        this.commissionForm.reset();
        this.fetchData(false);
        console.log("response", response)
      },
      (error) => {
        console.log(error.errro)
        this.toastr.error(error, '', {
          timeOut: 2000,
        });
      }
    );
  }

  openEditBrandModal(data: any, content) {

    this.editForm.patchValue({
      brandName: data?.brandName,
      email: data?.email,
      contact: data?.contact,
      website: data?.website,
      isActivated: data.isActivated,
    });
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
   
  }
  handleSubmitEditBrand() {
    const payload = {
      brandName: this.editForm.value?.brandName,
      email: this.editForm.value?.email,
      contact: this.editForm.value?.contact,
      website: this.editForm.value?.website,
      isActivated: this.editForm.value.isActivated,
    };
    this.saveEditFormData(payload)
  }

  saveEditFormData(data: any) {
    this.helperService.updateBrand(data).subscribe(
      (response) => {
        this.modalService.dismissAll();
        this.editForm.reset();
        this.fetchData(false);
      },
      (error) => {
        this.toastr.error(error, '', {
          timeOut: 2000,
        });
      }
    );
  }

  navigateToPage(idx) {
    this.pageNumber = idx;
    console.log(idx);
    // this.payoutData = [];
    this.fetchData(false);
  }

  fetchData(isSearch :Boolean) {
    this.loading = true;
    this.payoutData = [];
if(isSearch){
  this.pageNumber=1
}

    this.helperService
      .getFulfillments(this.pageSize, this.pageNumber,this.retailerName, this.brandName, this.unixTimestamp).subscribe((res) => {
        // console.log(res);)
      // .subscribe(async (res) => {
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
