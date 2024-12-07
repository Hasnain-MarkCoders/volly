import { BrandProfileService } from './../../services/brand-profile.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountsService } from 'src/app/services/accounts.service';
import { ShopifyService } from 'src/app/services/shopify.service';

@Component({
  selector: 'app-brand-profile',
  templateUrl: './brand-profile.component.html',
  styleUrls: ['./brand-profile.component.scss']
})
export class BrandProfileComponent implements OnInit {
  brandName:string
  email:string
  contact:string
  website:string
  id:number
  currentUserValue: any = null;
 public filterValidEntries<T extends object>(obj: T): Partial<T> {
    return Object.keys(obj).reduce((accumulator, key) => {
      const value = obj[key];
      if (value !== null && value !== undefined && value !== '') {
        accumulator[key] = value;
      }
      return accumulator;
    }, {} as Partial<T>);
  }
  constructor(private brandService : BrandProfileService,     private toastr: ToastrService,   private accountsService: AccountsService) { }
  ngOnInit(): void {
    this.accountsService.currentUser.subscribe(user => {
      this.currentUserValue = user;
      this.id=this.currentUserValue?.user?.id

    })

    this.FetchData()

  }
  

  updateBrand(){
  const data =   this.filterValidEntries({brandName:this.brandName,email:this.email,contact:this.contact,website:this.website})
      this.brandService.updateBrand(data).subscribe((res)=>{
        console.log(res)
        this.toastr.success(res?.message, 'Success');
      },
      (error) => {
        this.toastr.error(error ? error : error?.error?.message, 'Error');
      })

  }
  FetchData(){
    this.brandService.fetchBrand(this.id).subscribe((res)=>{
      this.brandName=res?.data.brandName
      this.email=res?.data.email
      this.contact=res?.data.contact
      this.website=res?.data.website
      this.id = res?.data.id
    },  (error) => {
      this.toastr.error(error ? error : error?.error?.message, 'Error');
  
    })
  }

}