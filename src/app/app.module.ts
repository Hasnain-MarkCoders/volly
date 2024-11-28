import { BrowserModule, HAMMER_GESTURE_CONFIG, HammerModule } from '@angular/platform-browser';
import {enableProdMode, NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AddTrackingComponent } from './components/add-tracking/add-tracking.component';
import { LocationsComponent } from './components/locations/locations.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import {AuthGuard} from './_guards/auth.guard';
import {JwtInterceptor} from './_helpers/jwt.interceptor';
import {ErrorInterceptor} from './_helpers/error.interceptor';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { StripeSuccessComponent } from './components/stripe-success/stripe-success.component';
import { RulesComponent } from './components/rules/rules.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { PaymentsComponent } from './components/payments/payments.component';
import { MomentModule } from 'ngx-moment';
import { ToastrModule } from 'ngx-toastr';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { StaffComponent } from './components/staff/staff.component';
import { StateRulesComponent } from './components/state-rules/state-rules.component';
import { RetailerComponent } from './components/retailer/retailer.component';
import { FulfillmentsComponent } from './components/fulfillments/fulfillments.component';
import { BalancesComponent } from './components/balances/balances.component';
import { LoginBrandComponent } from './components/login-brand/login-brand.component';
import { RegisterBrandComponent } from './components/register-brand/register-brand.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CredentialsComponent } from './components/credentials/credentials.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
enableProdMode();


@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent,
    AddTrackingComponent,
    LocationsComponent,
    LoginComponent,
    HomeComponent,
    SidebarComponent,
    StripeSuccessComponent,
    RulesComponent,
    PaymentsComponent,
    StaffComponent,
    StateRulesComponent,
    RetailerComponent,
    FulfillmentsComponent,
    BalancesComponent,
    LoginBrandComponent,
    RegisterBrandComponent,
    BrandsComponent,
    CredentialsComponent,
  ],
  imports: [
    NgMultiSelectDropDownModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule, ReactiveFormsModule,
    NgxIntlTelInputModule,
    BrowserAnimationsModule,
    MomentModule,
    JwBootstrapSwitchNg2Module,
    ToastrModule.forRoot(),
    ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
