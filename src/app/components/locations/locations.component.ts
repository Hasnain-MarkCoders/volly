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
  locationTableData = [];
  locationName: any;
  productName: any;
  sortToggle = false;
  dropdownList = [];
  selectedItems = [];
  state_dropdownSettings={};
  product_dropdownSettings={};
  dropdownSettings = {};
  AddStateRuleDropDownSetting = {}
  allStates = []
  allStatesList = []
  allSelectedStates = []
  AddProductRuleDropDownSetting = {}
  allProductsList = []
  allSelectedProducts = []

  ngOnInit(): void {
    this.helperService.getLocations().subscribe((res: any) => {
      this.locationData = res;
      this.locationTableData = res;
    });
    this.stateForm = new FormGroup({
      stateId: new FormControl([],  [Validators.required]),
      productId: new FormControl('', [Validators.required]),
      locationId: new FormControl('', [Validators.required]),
    });

    this.zipForm = new FormGroup({
      minZip: new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.maxLength(5)]),
      maxZip: new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.maxLength(5)]),
      locationId: new FormControl('', [Validators.required]),
    });
    this.productForm = new FormGroup({
      productId: new FormControl('', [Validators.required]),
      // variantId: new FormControl('', [Validators.required]),
      locationId: new FormControl([], []),
    });

    this.helperService.getState().subscribe((resp: any) => {
      this.states = resp;
      this.allStates = resp?.map(item=>({id:item?.id, name:item?.name}))
    });

    this.helperService.getProducts().subscribe((resp: any) => {
      this.products = resp.products;
    });


    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',    // Correct field name for item ID
      textField: 'name', // Correct field name for item text
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.AddStateRuleDropDownSetting={
      singleSelection: false,
      idField: 'id',    // Correct field name for item ID
      textField: 'name', // Correct field name for item text
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    }

    this.AddProductRuleDropDownSetting={
      singleSelection: false,
      idField: 'id',    // Correct field name for item ID
      textField: 'title', // Correct field name for item text
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    }
  

  }

  
  getFilteredLocations(stateId:string, productId:string){
    if (stateId && productId){
      this.helperService.getFilteredLocations(stateId, productId).subscribe((resp: any) => {
        console.log("resp==============>", resp)
        this.locationData = resp;
      });
    }
  }

  getFilteredLocationsForProductRule( productId: string){
    if ( productId) {
      this.helperService
        .getFilteredLocationsForProductRule(productId)
        .subscribe((resp: any) => {
          console.log('resp filtered locations==============>', resp);
          this.locationData = resp;
        });
    }
  }
  resetSelectedItems() {
    // this.stateForm.reset();
  }
  onItemSelect(location: any) {
    const existingItem = this.selectedItems.find(item => item.locationId === location.id);
  
    if (existingItem) {
      // Update existing item
      existingItem.locationId = location?.id?.toString();
      existingItem.locationName = location?.name?.toString();
    } else {
      // Add new item
      this.selectedItems.push({ locationId: location?.id?.toString(), locationName: location?.name.toString() });
    }
  }
  onSelectAll(items: any) {
    console.log(items);
    this.selectedItems = items.map(item => ({ locationName: item?.name?.toString(), locationId: item?.id?.toString() }));
    console.log("this.selectedItems", this.selectedItems)
  }




  getProductsForSpecificLocation (locId:string){
    this.allProductsList = []
    this.allSelectedProducts = []
    this.helperService.getProductsForSpecificLocation(locId).subscribe((resp: any) => {
      this.allProductsList = resp;
    });
  
  }
    getStatesForSpecificProductAndLocation(prodId:string, locId:string){
      this.helperService.getStatesForSpecificProductAndLocation(prodId, locId).subscribe((resp: any) => {
        this.allStatesList = resp
      });
    }
  
    onSelectProduct(item:any){
  
    }
    onAllSelectProduct(items:any){
  
    }
    onStateSelect(item: any) {
      console.log(item);
    }
    onAllStatesSelect(items: any) {
      console.log(items);
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
    this.allSelectedStates=[]
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
      states: this.stateForm.value.stateId,
      productId: this.stateForm.value.productId,
      locationId: this.stateForm.value.locationId,
      code: this.code,
      productName: this.productName,
      locationName: this.locationName,
    }
    this.ruleService.addStateRule(body).subscribe((response) => {
      this.toastr.success('State Rule Added sucessfully!', '', {
        timeOut: 2000,
      });
      this.modal.close();
      this.modal = null;
      this.allStatesList = []
      this.allSelectedStates = []
      this.stateForm.reset();
    }, (error) => {
      this.toastr.error( error?.error?error?.error:error?.error?.message? error?.error?.message:error ? error :"Something went wrong!", 'Error',{
        timeOut: 2000,
      });
      // this.toastr.error(error, '', {
      //   timeOut: 2000,
      // })

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
  getAllLocations() {
    this.helperService.getLocations().subscribe((resp: any) => {
      this.locationData = resp;
    });
  }
  saveProduct() {
    // console.log(this.productForm.value);
    this.submitted = true;
    if (this.productForm.invalid) {
      return;
    }
    this.submitted = true;
    if (this.productForm.invalid) {
      return;
    }

    const body = {
      // productId: this.productForm.value.productId,
      // variantId: this.productForm.value.variantId,
      // productName: this.productName,
      locationName: this.locationName,
      locationId: this.productForm.value.locationId,
      products:this.productForm.value.productId
    };
    this.ruleService.addProductRule(body).subscribe((response) => {
      this.toastr.success('Product Rule Added sucessfully!', '', {
        timeOut: 2000,
      });
      this.ngOnInit();
      this.modal.close();
      this.modal = null;
      this.locationName = null;
      this.productName = null;
      this.allProductsList = []
      this.allSelectedProducts = []
      this.productForm.reset();
      this.selectedItems = [];
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