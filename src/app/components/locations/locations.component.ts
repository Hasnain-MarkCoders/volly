import { Component, OnInit } from '@angular/core';
import { HelperService } from '../../services/helper.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RuleService } from '../../services/rule.service'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {

  constructor(private modalService: NgbModal, private ruleService: RuleService, private helperService: HelperService, private toastr: ToastrService) { }
  stateForm: FormGroup;
  zipForm: FormGroup;
  productForm: FormGroup;
  submitted = false;
  states: any[] = [];
  products: any[] = [];
  variants: any[] = [];
  modal: NgbModalRef;
  code: any;
  locationData = [];
  locationName: any;
  productName: any;
  sortToggle = false;

  ngOnInit(): void {
    this.helperService.getLocations().subscribe((res: any) => {
      this.locationData = res;
    });
    this.stateForm = new FormGroup({
      stateId: new FormControl('', [Validators.required]),
      locationId: new FormControl('', [Validators.required]),
      productId: new FormControl('', [Validators.required]),
    });

    this.zipForm = new FormGroup({
      minZip: new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.maxLength(5)]),
      maxZip: new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.maxLength(5)]),
      locationId: new FormControl('', [Validators.required]),
    });
    this.productForm = new FormGroup({
      productId: new FormControl('', [Validators.required]),
      // variantId: new FormControl('', [Validators.required]),
      locationId: new FormControl('', [Validators.required]),
    });

    this.helperService.getState().subscribe((resp: any) => {
      this.states = resp;
    });

    this.helperService.getProducts().subscribe((resp: any) => {
      this.products = resp.products;
    });
  }

  selected(event) {
    for (let i = 0; i < this.locationData.length; i++) {
      if (event.target.value == this.locationData[i].id) {
        this.locationName = this.locationData[i].name;
      }
    }
  }

  selectProduct(event): void {
    for (let i = 0; i < this.products.length; i++) {
      if (event.target.value == this.products[i].id) {
        this.productName = this.products[i].title;
      }
    }
  }

  selectcode(event): void {
    for (let i = 0; i < this.states.length; i++) {
      if (event.target.value == this.states[i].id) {
        this.code = this.states[i].code;
      }
    }
  }

  state(content) {
    this.modal = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    this.modal.result.then((result) => {
      this.modal = null;
    });
  }

  zip(content) {
    this.modal = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', });
    this.modal.result.then((result) => {
      this.modal = null;
    });
  }

  product(content) {

    this.modal = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', });
    this.modal.result.then((result) => {
      this.modal = null;
    });
  }

  saveState() {
    this.submitted = true;
    if (this.stateForm.invalid) {
      return;
    }

    const body = {
      stateId: JSON.parse(this.stateForm.value.stateId),
      locationId: this.stateForm.value.locationId,
      productId: this.stateForm.value.productId,
      code: this.code,
      locationName: this.locationName,
      productName: this.productName
    }
    this.ruleService.addStateRule(body).subscribe((response) => {
      this.toastr.success('State Rule Added sucessfully!', '', {
        timeOut: 2000,
      });
      this.modal.close();
      this.modal = null;
      this.stateForm.reset();
    }, (error) => {
      this.toastr.error(error, '', {
        timeOut: 2000,
      })

    });
  }

  saveZip() {
    // console.log(this.zipForm.value);
    this.submitted = true;
    if (this.zipForm.invalid) {
      return;
    }

    const body = {
      zipMin: this.zipForm.value.minZip,
      zipMax: this.zipForm.value.maxZip,
      locationId: this.zipForm.value.locationId
    }

    this.ruleService.addZipRule(body).subscribe((response) => {
      this.zipForm.reset();
      if (this.modal) {
        this.modal.close();
        this.modal = null;
      }
    }, (error) => {

    });
  }

  saveProduct() {
    // console.log(this.productForm.value);
    this.submitted = true;
    if (this.productForm.invalid) {
      return;
    }

    const body = {
      productId: this.productForm.value.productId,
      locationName: this.locationName,
      productName: this.productName,
      locationId: this.productForm.value.locationId
    }

    this.ruleService.addProductRule(body).subscribe((response) => {
      this.toastr.success('Product Rule Added sucessfully!', '', {
        timeOut: 2000,
      });
      this.ngOnInit();
      this.modal.close();
      this.modal = null;

      this.productForm.reset();
    }, (error) => {
      this.toastr.error(error, '', {
        timeOut: 2000,
      });

    });
  }

  toggleSort() {
    if (this.sortToggle) {
      this.locationData.sort((a, b) => {
        const na = a.name.toLowerCase();
        const nb = b.name.toLowerCase();
        if (na < nb) {
          return -1;
        }
        if (nb < na) {
          return 1;
        }
        return 0;
      });
      this.sortToggle = !this.sortToggle;
    }
    else {
      this.locationData.sort((a, b) => {
        const na = a.name.toLowerCase();
        const nb = b.name.toLowerCase();
        if (nb < na) {
          return -1;
        }
        if (na < nb) {
          return 1;
        }
        return 0;
      });
      this.sortToggle = !this.sortToggle;
    }
  }
}
