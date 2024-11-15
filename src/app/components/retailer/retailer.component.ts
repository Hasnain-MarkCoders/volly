import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CountryISO, SearchCountryField} from 'ngx-intl-tel-input';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, Router} from '@angular/router';
import {HelperService} from '../../services/helper.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-retailer',
  templateUrl: './retailer.component.html',
  styleUrls: ['./retailer.component.scss']
})
export class RetailerComponent implements OnInit {

  businessForm: FormGroup;
  locationForm: FormGroup;
  submitted = false;
  locations: any[] = [];
  SearchCountryField = SearchCountryField;
  // TooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  retailerList = [] = [];
  id: any;
  locationName: any;
  URL_REGEX = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
  sortToggle = false;

  constructor(private modalService: NgbModal, private router: Router, private route: ActivatedRoute, private helperService: HelperService, private toastr: ToastrService) {
  }

  ngOnInit(): void {

    this.list();

    this.businessForm = new FormGroup({
      businessName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      contact: new FormControl('', [Validators.required]),
      website: new FormControl('', [Validators.required, Validators.pattern(this.URL_REGEX)]),
      stripe: new FormControl('false', [Validators.required])
    });

    this.locationForm = new FormGroup({
      locationId: new FormControl('', [Validators.required]),
    });

    this.helperService.getLocations().subscribe((resp: any) => {
      this.locations = resp;
    });
  }

  list() {
    this.helperService.getRetailer().subscribe((data: any) => {
      console.log(data);
      this.retailerList = data.account;
    });
  }

  selected(event) {
    for (let i = 0; i < this.locations.length; i++) {
      if (event.target.value == this.locations[i].id) {
        this.locationName = this.locations[i].name;
        console.log(this.locationName);
      }
    }
  }

  open(content) {

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {

    }, (reason) => {

    });
  }

  locationContent(content, list) {
    this.id = list.id;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {

    }, (reason) => {

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
      stripe: this.businessForm.value.stripe
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
    console.log(body);
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
}
