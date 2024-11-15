import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AddTrackingComponent} from './components/add-tracking/add-tracking.component';
import {OrdersComponent} from './components/orders/orders.component';
import {HomeComponent} from './components/home/home.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { LocationsComponent } from './components/locations/locations.component';
import { LoginComponent } from './components/login/login.component';
import {AuthGuard} from './_guards/auth.guard';
import {StripeSuccessComponent} from './components/stripe-success/stripe-success.component';
import { RulesComponent } from './components/rules/rules.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { StaffComponent } from './components/staff/staff.component';
import {StateRulesComponent} from './components/state-rules/state-rules.component';
import {RetailerComponent} from './components/retailer/retailer.component';
import {FulfillmentsComponent} from './components/fulfillments/fulfillments.component';
import {BalancesComponent} from './components/balances/balances.component';

const routes: Routes = [
  {path: 'add-tracking/:id', component: AddTrackingComponent},
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
        path: 'payments',
        component: PaymentsComponent,
      },
      {
        path: 'balances',
        component: BalancesComponent
      },
      {
        path: 'staff',
        component: StaffComponent,
      },
      {
        path: 'fulfillments',
        component: FulfillmentsComponent
      },
      // {
      //   path: 'stripe-success/:successId',
      //   component: StripeSuccessComponent,
      // },

  ],
},
{
  path: 'stripe-success/:successId',
  component: StripeSuccessComponent,
},
{
  path: 'login', component:LoginComponent
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
