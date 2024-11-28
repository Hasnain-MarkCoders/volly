import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService } from '../../services/helper.service'
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-tracking',
  templateUrl: './add-tracking.component.html',
  styleUrls: ['./add-tracking.component.scss']
})
export class AddTrackingComponent implements OnInit {
  fulfillmentId: any;
  trackingForm: FormGroup;
  submitted = false;
  success = false;
  url: any;
  visible = false;
  shippingServiceName: any = "";
  body:any;
  trackingInfo: any;
  constructor(private router: Router, private route: ActivatedRoute, private helperService: HelperService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      if (params) {
        this.fulfillmentId = parseInt(params['id']);
      }
    });
    this.helperService.fetchTrackingInfo(this.fulfillmentId).subscribe( (res) => {
      this.trackingInfo  = res;
      // console.log(res);
    })
    this.trackingForm = new FormGroup({
      trackingNo: new FormControl('', [Validators.required]),
      trackingUrl: new FormControl(''),
      shippingService: new FormControl('', [Validators.required]),
    });
  }

  selectService(event) {
    if (event.target.value == "UPS") {
      this.url = `https://www.ups.com/track?loc=null&tracknum=${this.trackingForm.value.trackingNo}&requester=WT/trackdetails`
      this.visible = false;
      this.shippingServiceName = ""
      this.trackingForm.patchValue({
        trackingUrl: this.url
      })
    }

    if (event.target.value == "FedEx") {
      this.url = `https://www.fedex.com/apps/fedextrack/?tracknumbers=${this.trackingForm.value.trackingNo}`
      this.visible = false;
      this.shippingServiceName = ""
      this.trackingForm.patchValue({
        trackingUrl: this.url
      })
    }
    if (event.target.value == "Other") {
      this.visible = true;
      this.trackingForm.patchValue({
        trackingUrl: ''
      })
    }
  }

  save() {
    this.submitted = true;
    if (this.trackingForm.invalid) {
      return;
    }

    if(this.trackingForm.value.shippingService == "Other"){
      this.body = {
        fulfillmentId: this.fulfillmentId,
        trackingNo: this.trackingForm.value.trackingNo,
        trackingUrl: this.trackingForm.value.trackingUrl,
        shippingService: this.shippingServiceName

      }
    }else{
      this.body = {
        fulfillmentId: this.fulfillmentId,
        trackingNo: this.trackingForm.value.trackingNo,
        trackingUrl: this.trackingForm.value.trackingUrl,
        shippingService: this.trackingForm.value.shippingService

      }
    }
    // console.log(this.body)
    this.helperService.addTracking(this.body).subscribe((response) => {
      this.toastr.success('Success', '', {
        timeOut: 2000
      });
      this.trackingForm.reset();
      this.success = true
    }, (error) => {
      this.toastr.error(error, '', {
        timeOut: 2000,
      })

    });
  }


}
