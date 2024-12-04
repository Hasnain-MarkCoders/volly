import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor(private modalService: NgbModal, private router: Router, private route: ActivatedRoute, private helperService: HelperService, private toastr: ToastrService, private accountsService: AccountsService) {
  }

  ngOnInit(): void {

    this.list();

    this.businessForm = new FormGroup({
      businessName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      contact: new FormControl('', [Validators.required]),
      website: new FormControl('', [Validators.required, Validators.pattern(this.URL_REGEX)]),
      stripe: new FormControl('false', [Validators.required]),
      inHouseBusiness: new FormControl('false', [Validators.required])
    });

    this.updateBusinessForm = new FormGroup({
      businessName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      contact: new FormControl('', [Validators.required]),
      website: new FormControl('', [Validators.required, Validators.pattern(this.URL_REGEX)]),
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
  }

  list() {
    this.helperService.getRetailer().subscribe((data: any) => {
      // console.log(data);
      this.retailerList = data.account;
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
      // this.toastr.error(error, '', {
      //   timeOut: 2000,
      // });
      this.toastr.success('Retailer submitted sucessfully!');
      this.modalService.dismissAll();
      this.businessForm.reset();
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
    
    let contactNumber = `${this.updateBusinessForm.value.contact.dialCode} ${this.updateBusinessForm.value.contact.number.replace(/ /g, '').replace(this.updateBusinessForm.value.contact.dialCode, '')}`;
    
    const body = {
      id: this.id,
      businessName: this.updateBusinessForm.value.businessName,
      email: this.updateBusinessForm.value.email,
      contact: contactNumber,
      website: this.updateBusinessForm.value.website,
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
