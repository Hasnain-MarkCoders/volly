import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CountryISO, SearchCountryField } from 'ngx-intl-tel-input';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService } from '../../services/helper.service';
import { ToastrService } from 'ngx-toastr';
import { AccountsService } from 'src/app/services/accounts.service';

@Component({
  selector: 'app-retailer',
  templateUrl: './retailer.component.html',
  styleUrls: ['./retailer.component.scss']
})
export class RetailerComponent implements OnInit {

  currentUserValue: any = null;
  businessForm: FormGroup;
  updateBusinessForm: FormGroup;
  locationForm: FormGroup;
  inhouseForm: FormGroup;
  submitted = false;
  locations: any[] = [];
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  retailerList = [] = [];
  id: any;
  locationName: any;
  URL_REGEX = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
  sortToggle = false;
  ratingForm: FormGroup;
  communicationRating: number = 0;
  speedRating: number = 0;
  priceRating: number = 0;
  stars: boolean[] = [true, true, true, true, true]; // 5 stars
  retailerId: string;
  fulfillment_id: string;
  allStates = []
  allSelectedStates = []
  stateSetting={}
  constructor(private modalService: NgbModal,private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private helperService: HelperService, private toastr: ToastrService, private accountsService: AccountsService) {
  }

  ngOnInit(): void {
    this.initializeRatingForm();
    this.list();

    this.businessForm = new FormGroup({
      businessName: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$') // Corrected pattern
      ]),
      contact: new FormControl('', [Validators.required]),
      website: new FormControl('', [Validators.required, Validators.pattern(this.URL_REGEX)]),
      stripe: new FormControl('false', [Validators.required]),
      inHouseBusiness: new FormControl('false', [Validators.required]),
      states: new FormControl([]),

    });

    this.updateBusinessForm = new FormGroup({
      businessName: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$') // Corrected pattern
      ]),
      contact: new FormControl('', [Validators.required]),
      website: new FormControl('', [Validators.required, Validators.pattern(this.URL_REGEX)]),
      states: new FormControl([]),
    });

    this.locationForm = new FormGroup({
      locationId: new FormControl('', [Validators.required]),
    });

    this.inhouseForm = new FormGroup({
      id: new FormControl('', [Validators.required]),
    });

    this.helperService.getLocations().subscribe((resp: any) => {
      this.locations = resp;
    });
    this.accountsService.currentUser.subscribe(user => {
      this.currentUserValue = user;

    })
    this.stateSetting={
      singleSelection: false,
      idField: 'id',    // Correct field name for item ID
      textField: 'name', // Correct field name for item text
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    }
  }

  initializeRatingForm(): void {
    this.ratingForm = this.fb.group({
      communication: [1, Validators.required],
      speed: [1, Validators.required],
      price: [1, Validators.required]
    });
  }

  onAllStatesSelect(){

  }
  onStateSelect (){

  }
  // Open Rating Modal
  openRatingModal(content, retailer) {
    console.log("retailer", retailer)
    this.retailerId = retailer?.id;  // retailer object with id and other details
    this.fulfillment_id = retailer.accountId
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

  // Example function to save ratings (call your API here)
  saveRatings(ratingData: any): void {
    console.log(ratingData)
    // API call to save the ratings
    this.helperService.saveRatings(ratingData).subscribe(response => {
      this.toastr.success(response?.message);
      this.modalService.dismissAll();
    this.list();

    }, error => {
      this.toastr.error('Failed to save ratings');
    });

  }





   starGenerator=(num:number)=>num===0?"no rating":Array.from({length:num}).fill("⭐").join("")

  list() {
    this.helperService.getRetailer().subscribe((data: any) => {
      // console.log(data);
      this.retailerList = data.account;
    });
    this.helperService.getAllStates().subscribe((data: any) => {
      this.allStates = data.states.map(item=>({id:item.id, name : item.name, }));
      console.log("this.allStates==============================================>",this.allStates)
    });
  }

  selected(event) {
    for (let i = 0; i < this.locations.length; i++) {
      if (event.target.value == this.locations[i].id) {
        this.locationName = this.locations[i].name;
        // console.log(this.locationName);
      }
    }
  }

  open(content) {

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {

    }, (reason) => {

    });
  }

  locationContent(content, list) {
    console.log(list.states)
    this.id = list.id;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {

    }, (reason) => {

    });
  }

  request_cms_retailer() {
    this.submitted = true;
    if (this.businessForm.invalid) {
      return;
    }
    let contactNumber =
      `${this.businessForm.value.contact.dialCode} ${this.businessForm.value.contact.number.replace(/ /g, '')
        .replace(this.businessForm.value.contact.dialCode, '')}`;
    const body = {
      businessName: this.businessForm.value.businessName,
      email: this.businessForm.value.email,
      contact: contactNumber,
      website: this.businessForm.value.website,
      stripe: this.businessForm.value.stripe,
      inHouseBusiness: this.businessForm.value.inHouseBusiness
    };
    this.helperService.request_cms_retailer(body).subscribe((response) => {
      this.toastr.success('Retailer submitted sucessfully!');
      this.list();
      this.modalService.dismissAll();
      this.businessForm.reset();
    }, (error) => {
      this.toastr.error(error, '', {
        timeOut: 2000,
      });
      // this.toastr.success('Retailer submitted sucessfully!');
      // this.modalService.dismissAll();
      // this.businessForm.reset();
    });
  }






  save() {
    this.submitted = true;
    if (this.businessForm.invalid) {
      return;
    }
    let contactNumber =
      `${this.businessForm.value.contact.dialCode} ${this.businessForm.value.contact.number.replace(/ /g, '')
        .replace(this.businessForm.value.contact.dialCode, '')}`;
    const body = {
      businessName: this.businessForm.value.businessName,
      email: this.businessForm.value.email,
      contact: contactNumber,
      website: this.businessForm.value.website,
      stripe: this.businessForm.value.stripe,
      inHouseBusiness: this.businessForm.value.inHouseBusiness
    };
    this.helperService.addBusiness(body).subscribe((response) => {
      this.toastr.success('Retailer Added sucessfully!');
      this.list();
      this.modalService.dismissAll();
      this.businessForm.reset();
    }, (error) => {
      this.toastr.error(error, '', {
        timeOut: 2000,
      });

    });
  }

  // Start - Added By Sigma Solve(Rajendra) 10-March-2021
  udpateModal(content, account) {
    this.allSelectedStates = account.states.map(item=>({id:item.id, name:item?.name}));
    console.log(account)
    this.id = account.id;

    this.updateBusinessForm.patchValue({
      businessName: account.businessName,
      email: account.email,
      contact: account.contact,
      website: account.website
    });

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    }, (reason) => {
    });
  }

  udpateRetailer() {
    this.submitted = true;
    if (this.updateBusinessForm.invalid) {
      return;
    }
    const statesIds = this.updateBusinessForm?.value?.states?.map(item=>item?.id)
    
    let contactNumber = `${this.updateBusinessForm.value.contact.dialCode} ${this.updateBusinessForm.value.contact.number.replace(/ /g, '').replace(this.updateBusinessForm.value.contact.dialCode, '')}`;
    
    const body = {
      id: this.id,
      businessName: this.updateBusinessForm.value.businessName,
      email: this.updateBusinessForm.value.email,
      contact: contactNumber,
      website: this.updateBusinessForm.value.website,
      states:statesIds
    };
    this.helperService.updateBusiness(body).subscribe((response) => {
      this.toastr.success('Retailer Updated sucessfully!');
      this.list();
      this.modalService.dismissAll();
      this.updateBusinessForm.reset();
      this.submitted = false;
    }, (error) => {
      this.toastr.error(error, '', {
        timeOut: 2000,
      });
    });
  }
  // End

  assignLocation() {
    this.submitted = true;
    if (this.locationForm.invalid) {
      return;
    }
    const body = {
      id: this.id,
      locationId: this.locationForm.value.locationId,
      locationName: this.locationName
    };
    // console.log(body);
    this.helperService.assignLocation(body).subscribe((response) => {
      this.toastr.success('Location updated sucessfully!', '', {
        timeOut: 2000,
      });
      this.list();
      this.modalService.dismissAll();
      this.locationName = null;
      this.locationForm.reset();
    }, (error) => {
      this.toastr.error(error, '', {
        timeOut: 2000,
      });

    });
  }

  unlink(id: any) {
    this.helperService.unassignLocation(id).subscribe(() => {
      this.list();
    });
  }

  toggleSort() {
    if (this.sortToggle) {
      this.retailerList.sort((a, b) => {
        const na = a.businessName.toLowerCase();
        const nb = b.businessName.toLowerCase();
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
      this.retailerList.sort((a, b) => {
        const na = a.businessName.toLowerCase();
        const nb = b.businessName.toLowerCase();
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

  deleteRetailer(id: any) {
    this.helperService.deleteBusinsess(id).subscribe((res) => {
      this.toastr.info('Account deleted');
      this.list();
    }, error => this.toastr.error(error));

  }

  inHouseModal(inhousecontent, list) {
    this.id = list.id;
    this.modalService.open(inhousecontent, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    }, (reason) => {
    });
  }

  changeInHouseBusiness() {
    var id = this.id;
    this.helperService.changeInHouseBusiness(id).subscribe(() => {
      this.modalService.dismissAll();
      this.list();
    });
  }

  createAccountLink(accountId) {
    const body = {
      accountId: accountId,
    };
    this.helperService.createAccountLink(body).subscribe((response) => {
      this.toastr.success('Email sent sucessfully!');
    }, (error) => {
    });
  }

}
