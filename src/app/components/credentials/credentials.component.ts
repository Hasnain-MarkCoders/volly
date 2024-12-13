import { ToastrService } from 'ngx-toastr';
import { ShopifyService } from './../../services/shopify.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-credentials',
  templateUrl: './credentials.component.html',
  styleUrls: ['./credentials.component.scss']
})
export class CredentialsComponent implements OnInit {
  STORE_ACCESS_ID:string
  STORE_PASSWORD:string
  STORE_URL:string
  API_VERSION:string
  webHookURL:string="ewrwerewrew"
  constructor(private shopifyService : ShopifyService,     private toastr: ToastrService) { }

  ngOnInit(): void {
    this.fetchWebHookURL()
  }

  saveData(){
      this.shopifyService.saveShopifyInfo(this.STORE_URL,this.STORE_PASSWORD,this.STORE_ACCESS_ID, this.API_VERSION).subscribe((res)=>{
        console.log(res)
        this.toastr.success(res?.message, 'Success');
        this.STORE_PASSWORD=""
        this.STORE_ACCESS_ID=""
        this.STORE_URL=""
        this.API_VERSION=""
      },
      (error) => {
        this.toastr.error(error ? error : error?.error?.message, 'Error');
    
      })

  }
  FetchData(){
    this.shopifyService.fetchShopifyData().subscribe((res)=>{
      console.log(res)
    },  (error) => {
      this.toastr.error(error ? error : error?.error?.message, 'Error');
  
    })
  }
  copyToClipboard() {
    if (this.webHookURL) {
      const textArea = document.createElement('textarea');
      textArea.value = this.webHookURL;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      this.toastr.success('URL copied to clipboard', 'Success');
    } else {
      this.toastr.error('No URL available to copy', 'Error');
    }
  }
  fetchWebHookURL(){
    this.shopifyService.fetchWebhookURL(1).subscribe((res)=>{
      console.log(res)
      this.webHookURL=res?.data?.orderCreationUrl
    },  (error) => {
      this.toastr.error(error ? error : error?.error?.message, 'Error');

    })
  }
}
