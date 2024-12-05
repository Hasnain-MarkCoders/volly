import { BrandsService } from './../../services/brands.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import * as moment from 'moment';
import * as $ from 'jquery';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  currentBrandId: string;
  constructor(
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private helperService: BrandsService,
    private toastr: ToastrService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.fetchData(false);
    this.initializeCommissionForm();
  }



  initializeCommissionForm(): void {
    this.commissionForm = this.fb.group({
      commission: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?%$/)]], // Validate percentage like 50% or 10.5%
    });
  }

  // Open the modal to edit the commission of a specific brand
  openEditCommissionModal(data, content) {
    this.currentBrandId = data?.id; // Get the ID of the brand
    this.commissionForm.patchValue({
      commission: data.commission || '' // Pre-fill the commission input
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
      id: this.currentBrandId,
      commission: updatedCommission,
    };

    // Call the API to update the commission (assuming saveCommission is an API service method)
    this.saveCommission(updatedData);
  }

  // Simulated API call to save the commission
  saveCommission(data): void {
    // Simulating backend call success:
    // In your actual implementation, call the backend service to save the updated commission
    this.toastr.success('Commission updated successfully!');
    // Update the corresponding brand in payoutData array
    const index = this.payoutData.findIndex((item) => item.id === this.currentBrandId);
    if (index !== -1) {
      this.payoutData[index].commission = data.commission;
    }
    this.modalService.dismissAll();
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
