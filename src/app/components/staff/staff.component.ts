import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StaffService } from 'src/app/services/staff.service';
import { SearchCountryField, CountryISO } from 'ngx-intl-tel-input';
import * as $ from 'jquery';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {
  staffForm: FormGroup;
  editStaffForm: FormGroup;
  submitted = false;
  staffList = [] = [];
  SearchCountryField = SearchCountryField;
  // TooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  resetPasswordForm: FormGroup;

  constructor(private modalService: NgbModal, private staffService: StaffService, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.list();
    this.staffForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      contactNumber: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      // roleId: new FormControl(0, [Validators.required]),
      password: new FormControl('', [Validators.required]),
      status: new FormControl(false)
    });
  }

  list(){

    const reqTablesParameters = {
      skip: 0,
      limit: 50,
  };
    this.staffService.list(reqTablesParameters).subscribe((data: any) => {
      this.staffList = data.data.staffList;
    });
  }

  open(content) {

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {

    }, (reason) => {

    });
  }

  private buildForm(){
    this.editStaffForm = new FormGroup({
      id: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      contactNumber: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      status: new FormControl(false)
    });
  }

  updateModal(content, staff) {
      this.editStaffForm = new FormGroup({
        id: new FormControl('', [Validators.required]),
        name: new FormControl('', [Validators.required]),
        contactNumber: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        status: new FormControl(false)
      });
    
    this.editStaffForm.patchValue({
      id : staff.id,
      name: staff.name,
      contactNumber: staff.contactNumber,
      email:staff.email,
      status: staff.status

    });
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {

    }, (reason) => {

    });
  }

  reset(content, staff) {
    this.resetPasswordForm = new FormGroup({
      id: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  
    this.resetPasswordForm.patchValue({
      id: staff.id,
      password: ''
    });
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {

  }, (reason) => {

  });
}


  save() {
    this.submitted = true;
    console.log(this.staffForm.value)
    if (this.staffForm.invalid) {
      return;
    }
    let contactNumber =
    `${this.staffForm.value.contactNumber.dialCode} ${this.staffForm.value.contactNumber.number.replace(/ /g, '')
    .replace(this.staffForm.value.contactNumber.dialCode, '')}`;
    const body = {
      name: this.staffForm.value.name,
      email:this.staffForm.value.email,
      contactNumber:contactNumber,
      password : this.staffForm.value.password,
      roleId : 0,
      status:this.staffForm.value.status

    }
    console.log(body)
    this.staffService.add(body).subscribe((response) => {
      this.toastr.success(response.message,'', {
        timeOut: 2000,
      });
      this.list();
     this.modalService.dismissAll();
      this.staffForm.reset();
    }, (error) => {
      this.toastr.error(error, '',{
        timeOut: 2000,
      })

    });
  }

  delete(staff:any) {
    this.staffService.delete(staff.id).subscribe((response) => {
      this.toastr.success(response.message, '',{
        timeOut: 2000,
      });
      this.list();
      this.ngOnInit();
    }, (error) => {
      this.toastr.error(error, '',{
        timeOut: 2000,
      })
    });

  }

  update(){
    this.submitted = true;
    console.log(this.editStaffForm.value)
    if (this.editStaffForm.invalid) {
      return;
    }
    let contactNumber =
    `${this.editStaffForm.value.contactNumber.dialCode} ${this.editStaffForm.value.contactNumber.number.replace(/ /g, '')
    .replace(this.editStaffForm.value.contactNumber.dialCode, '')}`;
    const body = {
      id:  this.editStaffForm.value.id,
      name: this.editStaffForm.value.name,
      email:this.editStaffForm.value.email,
      contactNumber:contactNumber,
      roleId : 0,
      status:this.editStaffForm.value.status

    }
    console.log(body)
    this.staffService.update(body).subscribe((response) => {
      this.toastr.success(response.message,'',{
        timeOut: 2000,
      });
      this.list();
     this.modalService.dismissAll();
      this.editStaffForm.reset();
    }, (error) => {
      this.toastr.error(error, '',{
        timeOut: 2000,
      })

    });
  }

  async resetPassword() {
    if (this.resetPasswordForm.invalid) {
      return;
    }

    const resetPassword: any = this.resetPasswordForm.value;
    console.log(resetPassword)
      this.staffService.resetPassword(resetPassword.id, resetPassword.password).subscribe((response) => {
        this.toastr.success(response.message, '',{
          timeOut: 2000,
        });
        this.list();
       this.modalService.dismissAll();
        // success
        this.resetPasswordForm.reset();
      }, (error) => {
        this.toastr.error(error, '',{
          timeOut: 2000,
        })
      
    });

}
}
