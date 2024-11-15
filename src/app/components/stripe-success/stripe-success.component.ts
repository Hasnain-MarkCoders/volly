import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { HelperService } from '../../services/helper.service'
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-stripe-success',
  templateUrl: './stripe-success.component.html',
  styleUrls: ['./stripe-success.component.scss']
})
export class StripeSuccessComponent implements OnInit {
  success = false;
  error = false;
  constructor(private route: ActivatedRoute,private helperService: HelperService,private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((res: any) => {
      console.log(res.successId)
      if (res.successId) {
        const body = {
            accountId : res.successId
        } 
        // TODO: send data to  stripe success API
        this.helperService.activateAccount(body).subscribe((response) => {
          this.success = true;
          this.toastr.success('Account has been activated','', {
            timeOut: 2000,
          });
        }, (error) => {
          this.toastr.error(error, '',{
            timeOut: 2000,
          })
          this.error = true;
        });
      }else{
        this.error = true;
      }
    });
  }

}
