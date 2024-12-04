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

  constructor(private shopifyService : ShopifyService,     private toastr: ToastrService) { }

  ngOnInit(): void {
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

}
