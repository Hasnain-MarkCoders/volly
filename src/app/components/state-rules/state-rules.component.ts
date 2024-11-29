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
  state_dropdownSettings={};
  product_dropdownSettings={};
  update_data = [];
  locations_for_update = [];
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
      locationId: new FormControl([]),
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
      locationId: new FormControl([], []),
    });

    this.helperService.getLocations().subscribe((resp: any) => {
      this.locations = resp;
      this.locations_for_update = resp.map((item) => ({
        id: item?.id?.toString(),
        name: item?.name,
      }));
    });

    this.helperService.getState().subscribe((resp: any) => {
      this.states = resp;
    });

    this.helperService.getProducts().subscribe((resp: any) => {
      this.products = resp.products;
    });

    this.list();
    this.dropdownSettings = {
      noDataAvailablePlaceholderText:
        'All locations already have a state rule.',
      singleSelection: false,
      idField: 'id', // Correct field name for item ID
      textField: 'name', // Correct field name for item text
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };

    this.state_dropdownSettings = {
      noDataAvailablePlaceholderText:
        'All locations already have a state rule.',
      singleSelection: false,
      idField: 'id', // Correct field name for item ID
      textField: 'name', // Correct field name for item text
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };

    this.product_dropdownSettings = {
      noDataAvailablePlaceholderText:
        'All locations already have a product rule.',
      singleSelection: false,
      idField: 'id', // Correct field name for item ID
      textField: 'name', // Correct field name for item text
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };




    // this.ruleService.getRuleList().subscribe((data: any) => {
    //   console.log(data);
    //   this.rulesList = data;
    // });
  }

  getAllLocations() {
    this.helperService.getLocations().subscribe((resp: any) => {
      this.locations = resp;
    });
  }

  getFilteredLocationsForProductRule( productId: string){
    if ( productId) {
      this.helperService
        .getFilteredLocationsForProductRule(productId)
        .subscribe((resp: any) => {
          console.log('resp==============>', resp);
          this.locations = resp;
        });
    }
  }

  getFilteredLocations(stateId: string, productId: string) {
    if (stateId && productId) {
      this.helperService
        .getFilteredLocations(stateId, productId)
        .subscribe((resp: any) => {
          console.log('resp==============>', resp);
          this.locations = resp;
        });
    }
  }
  resetSelectedItems() {
    // this.stateForm.reset();
  }
  onItemSelect(location: any) {
    const selectedItem = {
      locationId: location?.id?.toString(),
      locationName: location?.name?.toString(),
    };

    const existingIndex = this.selectedItems.findIndex(
      (item) => item.locationId === selectedItem.locationId
    );

    if (existingIndex > -1) {
      // Update existing item
      this.selectedItems[existingIndex] = selectedItem;
    } else {
      // Add new item
      this.selectedItems.push(selectedItem);
    }
  }
  onSelectAll(items: any) {
    this.selectedItems = items.reduce((acc, item) => {
      const selectedItem = {
        locationName: item?.name?.toString(),
        locationId: item?.id?.toString(),
      };
      const existingIndex = acc.findIndex(
        (sel) => sel.locationId === selectedItem.locationId
      );

      if (existingIndex > -1) {
        acc[existingIndex] = selectedItem; // Update existing item
      } else {
        acc.push(selectedItem); // Add new item
      }
      return acc;
    }, []);
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
    const keyMapping = {
      'id':'locationId' ,
      'name':'locationName',
    };
    let data = this.updateDataKeys(this.selectedItems, keyMapping);
    // this.selectedItems = data;

    const body = {
      stateId: JSON.parse(this.stateForm.value.stateId),
      productId: this.stateForm.value.productId,
      code: this.code,
      productName: this.productName,
      // locationId: this.stateForm.value.locationId,
      // locationName: this.locationName,
      locations: data,
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
        this.selectedItems=[]
        
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
      // locationId: this.productForm.value.locationId,
      locations: this.selectedItems,

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
  updateDataKeys(data: any[], keyMapping: { [oldKey: string]: string }): any[] {
    return data
      .map((item) => {
        let updatedItem: any = {};

        for (const [oldKey, newKey] of Object.entries(keyMapping)) {
          if (item.hasOwnProperty(oldKey)) {
            updatedItem[newKey] = item[oldKey]?.toString();
          }
        }

        // Only return updatedItem if it's not empty
        return Object.keys(updatedItem).length > 0 ? updatedItem : null;
      })
      .filter((item) => item !== null); // Remove any null or empty objects
  }

  stateRule(content, rule) {
    this.getAllLocations();
    const keyMapping = {
      locationId: 'id',
      locationName: 'name',
    };
    let data = this.updateDataKeys(rule.locations, keyMapping);
    console.log(data);
    this.selectedItems = data;
    // this.locations=data1
    // this.update_data=rule.locations
    // this.update_selectedItems=rule.location
    this.stateForm.patchValue({
      stateId: rule.stateId,
      // locationId: rule.locationId,
      productId: rule.productId,
    });
    // this.locationName = rule.locationName;
    // this.selectedItems=rule?.locations||[]
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

    this.getAllLocations();
    const keyMapping = {
      locationId: 'id',
      locationName: 'name',
    };
    let data = this.updateDataKeys(rule.locations, keyMapping);
    console.log(data);
    this.selectedItems = data;
    this.productForm.patchValue({
      productId: rule.productId,
      // variantId: rule.variantId,
      // locationId: rule.locationId,
    });
    // this.locationName = rule.locationName;
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
    const keyMapping = {
      id: 'locationId',
      name: 'locationName',
    };
    let data = this.updateDataKeys(this.selectedItems, keyMapping);
    const body = {
      id: this.stateId,
      stateId: JSON.parse(this.stateForm.value.stateId),
      productId: this.stateForm.value.productId,
      code: this.code,
      productName: this.productName,
      // locationId: this.stateForm.value.locationId,
      // locationName: this.locationName,
      locations: data,
    };
    this.ruleService.updateState(body).subscribe(
      (response) => {
        this.toastr.success('State Rule Updated sucessfully!', '', {
          timeOut: 2000,
        });
        this.list();
        this.modal.close();
        this.stateForm.reset();
        this.selectedItems=[]
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
