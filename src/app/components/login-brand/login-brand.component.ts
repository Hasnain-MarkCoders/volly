import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AccountsService } from '../../services/accounts.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-brand',
  templateUrl: './login-brand.component.html',
  styleUrls: ['./login-brand.component.scss']
})
export class LoginBrandComponent implements OnInit {
  usernameFocus;
  passwordFocus;
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  selectedRememberMeOption: string;
  formValueChanges: any;
  formErrors: any = { 'username': '', 'password': '' };
  validationMessages: any = {
    'username': { required: "Username is required" },
    'password': { required: "Password is required" }
  };
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountsService: AccountsService,
    private toastr: ToastrService

  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false]
    });

    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';

  }

  get f() { return this.loginForm.controls; }
  handleNavigate(){
    this.router.navigate(['/brand-register'], { queryParams: { returnUrl: "/" } })
  }

  onSubmit() {
    this.submitted = true;
    
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    
    this.loading = true;
    this.accountsService.loginBrand(this.loginForm.value.email, this.loginForm.value.password,this.f.rememberMe.value)
    .pipe(first())
    .subscribe(
      data => {
          this.returnUrl = (this.returnUrl === '/') ? '/' : this.returnUrl;
          this.router.navigate([this.returnUrl]);
      },
      error => {
        this.toastr.error(error?error:error?.error?.message, 'Error');
        const that = this;
        this.error = error;
        this.loading = false;
        setTimeout(() => {
          that.error = '';
        }, 5000);
      });
    }

}
