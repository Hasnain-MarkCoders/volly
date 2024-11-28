import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { RuleService } from '../../services/rule.service';
import { HelperService } from '../../services/helper.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-state-rules',
  templateUrl: './state-rules.component.html',
  styleUrls: ['./state-rules.component.scss'],
})
export class StateRulesComponent implements OnInit {
  stateForm: FormGroup;
  zipForm: FormGroup;
  productForm: FormGroup;
  submitted = false;
  locations: any[] = [];
  states: any[] = [];
  products: any[] = [];
  variants: any[] = [];
  modal: NgbModalRef;
  code: any;
  rulesList = [];
  stateId: any;
  productId: any;
  locationName: any;
  productName: any;
  sortToggle = false;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  constructor(
    private modalService: NgbModal,
    private ruleService: RuleService,
    private helperService: HelperService,
    private toastr: ToastrService
  ) {}


  

  ngOnInit(): void {
    

    this.stateForm = new FormGroup({
      stateId: new FormControl('', [Validators.required]),
      productId: new FormControl('', [Validators.required]),
      locationId: new FormControl('', [Validators.required]),
    });

    this.zipForm = new FormGroup({
      minZip: new FormControl('', [
        Validators.required,
        Validators.pattern(/^-?(0|[1-9]\d*)?$/),
        Validators.maxLength(5),
      ]),
      maxZip: new FormControl('', [
        Validators.required,
        Validators.pattern(/^-?(0|[1-9]\d*)?$/),
        Validators.maxLength(5),
      ]),
      locationId: new FormControl('', [Validators.required]),
    });

    this.productForm = new FormGroup({
      productId: new FormControl('', [Validators.required]),
      // variantId: new FormControl('', [Validators.required]),
      locationId: new FormControl('', [Validators.required]),
    });

    this.helperService.getLocations().subscribe((resp: any) => {
      this.locations = resp;
    });

    this.helperService.getState().subscribe((resp: any) => {
      this.states = resp;
    });

    this.helperService.getProducts().subscribe((resp: any) => {
      this.products = resp.products;
    });

    this.list();
    this.dropdownList = [
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' }
    ];

    this.selectedItems = [
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' }
    ];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',    // Correct field name for item ID
      textField: 'item_text', // Correct field name for item text
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  
    // this.ruleService.getRuleList().subscribe((data: any) => {
    //   console.log(data);
    //   this.rulesList = data;
    // });
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  list() {
    this.ruleService.getStateRules().subscribe((data: any) => {
      // console.log(data);
      this.rulesList = data.stateRules;
    });
  }

  selected(event) {
    for (let i = 0; i < this.locations.length; i++) {
      if (event.target.value == this.locations[i].id) {
        this.locationName = this.locations[i].name;
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
    this.stateForm.patchValue({
      stateId: '',
      locationId: '',
      productId: '',
    });
    this.modal = this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
    });
    this.modal.result.then((result) => {
      this.modal = null;
    });
  }

  zip(content) {
    this.modal = this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
    });
    this.modal.result.then((result) => {
      this.modal = null;
    });
  }

  product(content) {
    this.modal = this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
    });
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
      productId: this.stateForm.value.productId,
      locationId: this.stateForm.value.locationId,
      code: this.code,
      productName: this.productName,
      locationName: this.locationName,
    };
    this.ruleService.addStateRule(body).subscribe(
      (response) => {
        this.toastr.success('State Rule Added sucessfully!', '', {
          timeOut: 2000,
        });
        this.list();
        this.modal.close();
        this.modal = null;
        this.locationName = null;
        this.productName = null;
        this.stateForm.reset();
      },
      (error) => {
        this.toastr.error(error, '', {
          timeOut: 2000,
        });
      }
    );
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
      locationId: this.zipForm.value.locationId,
    };

    this.ruleService.addZipRule(body).subscribe(
      (response) => {
        this.modal.close();
        this.modal = null;
        this.zipForm.reset();
      },
      (error) => {}
    );
  }

  saveProduct() {
    // console.log(this.productForm.value);
    this.submitted = true;
    if (this.productForm.invalid) {
      return;
    }

    const body = {
      productId: this.productForm.value.productId,
      // variantId: this.productForm.value.variantId,
      productName: this.productName,
      locationName: this.locationName,
      locationId: this.productForm.value.locationId,
    };

    this.ruleService.addProductRule(body).subscribe(
      (response) => {
        this.toastr.success('Product Rule Added sucessfully!', '', {
          timeOut: 2000,
        });
        this.list();
        this.modal.close();
        this.locationName = null;
        this.productName = null;
        this.modal = null;
        this.productForm.reset();
      },
      (error) => {
        this.toastr.error(error, '', {
          timeOut: 2000,
        });
      }
    );
  }

  stateRule(content, rule) {
    this.stateForm.patchValue({
      stateId: rule.stateId,
      locationId: rule.locationId,
      productId: rule.productId,
    });
    this.locationName = rule.locationName;
    this.productName = rule.productName;
    this.code = rule.code;
    this.stateId = rule.id;
    this.modal = this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
    });
    this.modal.result.then((result) => {
      this.modal = null;
    });
  }

  productRule(content, rule) {
    // for (let i = 0; i < this.products.length; i++) {
    //   if (rule.productId == this.products[i].id) {
    //     this.variants = this.products[i].variants;
    //   }
    // }
    this.productForm.patchValue({
      productId: rule.productId,
      // variantId: rule.variantId,
      locationId: rule.locationId,
    });
    this.locationName = rule.locationName;
    this.productId = rule.id;
    this.modal = this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
    });
    this.modal.result.then((result) => {
      this.modal = null;
    });
  }

  deleteStateRule(rule: any) {
    this.ruleService.deleteStateRule(rule.id).subscribe(
      (response) => {
        this.toastr.success('State Rule Deleted sucessfully!', '', {
          timeOut: 2000,
        });
        this.list();
        this.ngOnInit();
      },
      (error) => {
        this.toastr.error(error, '', {
          timeOut: 2000,
        });
      }
    );
  }

  updateStateRule() {
    this.submitted = true;
    if (this.stateForm.invalid) {
      return;
    }

    const body = {
      id: this.stateId,
      stateId: JSON.parse(this.stateForm.value.stateId),
      locationId: this.stateForm.value.locationId,
      productId: this.stateForm.value.productId,
      code: this.code,
      productName: this.productName,
      locationName: this.locationName,
    };
    this.ruleService.updateState(body).subscribe(
      (response) => {
        this.toastr.success('State Rule Updated sucessfully!', '', {
          timeOut: 2000,
        });
        this.list();
        this.modal.close();
        this.stateForm.reset();
      },
      (error) => {
        this.toastr.error(error, '', {
          timeOut: 2000,
        });
      }
    );
  }

  updateProductRule() {
    this.submitted = true;
    if (this.productForm.invalid) {
      return;
    }

    const body = {
      id: this.productId,
      productId: this.productForm.value.productId,
      // variantId: this.productForm.value.variantId,
      locationId: this.productForm.value.locationId,
      locationName: this.locationName,
    };

    this.ruleService.updateProductRule(body).subscribe(
      (response) => {
        this.toastr.success('Product Rule Updated sucessfully!', '', {
          timeOut: 2000,
        });
        this.list();
        this.modal.close();
        this.modal = null;
        this.productForm.reset();
      },
      (error) => {
        this.toastr.error(error, '', {
          timeOut: 2000,
        });
      }
    );
  }

  deleteProductRule(id: any) {
    const that = this;
    this.ruleService.deleteProductRule(id).subscribe(
      (response) => {
        this.toastr.success('Product Rule deleted sucessfully!', '', {
          timeOut: 2000,
        });
        this.list();
        this.ngOnInit();
      },
      (error) => {
        this.toastr.error(error, '', {
          timeOut: 2000,
        });
      }
    );
  }

  toggleSort() {
    if (this.sortToggle) {
      this.rulesList.sort((a, b) => {
        const na = a.code.toLowerCase();
        const nb = b.code.toLowerCase();
        if (na < nb) {
          return -1;
        }
        if (nb < na) {
          return 1;
        }
        return 0;
      });
      this.sortToggle = !this.sortToggle;
    } else {
      this.rulesList.sort((a, b) => {
        const na = a.code.toLowerCase();
        const nb = b.code.toLowerCase();
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

  sortLocation() {
    if (this.sortToggle) {
      this.rulesList.sort((a, b) => {
        const na = a.locationName.toLowerCase();
        const nb = b.locationName.toLowerCase();
        if (na < nb) {
          return -1;
        }
        if (nb < na) {
          return 1;
        }
        return 0;
      });
      this.sortToggle = !this.sortToggle;
    } else {
      this.rulesList.sort((a, b) => {
        const na = a.locationName.toLowerCase();
        const nb = b.locationName.toLowerCase();
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

  sortProduct() {
    if (this.sortToggle) {
      this.rulesList.sort((a, b) => {
        const na = a.productName ? a.productName.toLowerCase() : a.productName;
        const nb = b.productName ? b.productName.toLowerCase() : b.productName;
        if (na < nb) {
          return -1;
        }
        if (nb < na) {
          return 1;
        }
        return 0;
      });
      this.sortToggle = !this.sortToggle;
    } else {
      this.rulesList.sort((a, b) => {
        const na = a.productName ? a.productName.toLowerCase() : a.productName;
        const nb = b.productName ? b.productName.toLowerCase() : b.productName;
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