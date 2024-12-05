import { BrandsGuard } from './_guards/BrandsGuard ';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddTrackingComponent } from './components/add-tracking/add-tracking.component';
import { OrdersComponent } from './components/orders/orders.component';
import { HomeComponent } from './components/home/home.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { LocationsComponent } from './components/locations/locations.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './_guards/auth.guard';

import { StripeSuccessComponent } from './components/stripe-success/stripe-success.component';
import { RulesComponent } from './components/rules/rules.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { StaffComponent } from './components/staff/staff.component';
import { StateRulesComponent } from './components/state-rules/state-rules.component';
import { RetailerComponent } from './components/retailer/retailer.component';
import { FulfillmentsComponent } from './components/fulfillments/fulfillments.component';
import { BalancesComponent } from './components/balances/balances.component';
import { LoginBrandComponent } from './components/login-brand/login-brand.component';
import { RegisterBrandComponent } from './components/register-brand/register-brand.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CredentialsComponent } from './components/credentials/credentials.component';
import { RequestedRetailerComponent } from './components/requested-retailer/requested-retailer.component';

const routes: Routes = [
  { path: 'add-tracking/:id', component: AddTrackingComponent },
  // {path: 'orders', component: OrdersComponent},
  // {path: '*', component: HomeComponent},
  {
    path: '',
    component: SidebarComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: OrdersComponent,
      },
      // {
      //   path: 'retailer',
      //   component: HomeComponent,
      // },
      {
        path: 'location',
        component: LocationsComponent,
      },
      {
        path: 'location/product-rules',
        component: RulesComponent,
      },
      {
        path: 'location/state-rules',
        component: StateRulesComponent,
      },
      {
        path: 'retailer',
        component: RetailerComponent,
      },
      {
        path: 'requested-retailers',
        component: RequestedRetailerComponent,
      },
      // {
      //   path: 'payments',
      //   component: PaymentsComponent,
      // },
      // {
      //   path: 'balances',
      //   component: BalancesComponent,
      // },
      // {
      //   path: 'staff',
      //   component: StaffComponent,
      // },
      // {
      //   path: 'fulfillments',
      //   component: FulfillmentsComponent,
      // },
      // {
      //   path: 'brands',
      //   component: BrandsComponent
      // },
      {
        path: 'credentials',
        component: CredentialsComponent,
      },
      // {
      //   path: 'stripe-success/:successId',
      //   component: StripeSuccessComponent,
      // },
    ],
  },
  {
    path: '',
    component: SidebarComponent,
    canActivate: [AuthGuard, BrandsGuard],

    children: [
      {
        path: 'brands',
        component: BrandsComponent,
      },
      {
        path: 'staff',
        component: StaffComponent,
      },
      {
        path: 'fulfillments',
        component: FulfillmentsComponent,
      },
      {
        path: 'payments',
        component: PaymentsComponent,
      },
      {
        path: 'balances',
        component: BalancesComponent,
      },
    ],

    // canActivate: [AuthGuard, BrandsGuard],
  },
  {
    path: 'stripe-success/:successId',
    component: StripeSuccessComponent,
  },
  // {
  //   path: 'login',
  //   component: LoginComponent,
  // },
  // {
  //   path: 'brand-login',
  //   component: LoginBrandComponent,
  // },
  {
    path: 'login',
    component: LoginBrandComponent,
  },
  {
    path: 'admin-login',
    component: LoginComponent,
  },
  {
    path: 'brand-register',
    component: RegisterBrandComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
