import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SignupComponent } from './signup/signup.component';
import { DatosPersonalesComponent } from './datos-personales/datos-personales.component';
import { DireccionComponent } from './direccion/direccion.component';
import { SignupShopData1Component } from './signup_shop_data/signup-shop-data1/signup-shop-data1.component';
import { SignupShopData2Component } from './signup_shop_data/signup-shop-data2/signup-shop-data2.component';
import { SignupShopDataIcecreamflavorsComponent } from './signup_shop_data/signup-shop-data-icecreamflavors/signup-shop-data-icecreamflavors.component';
import { HomeCustomerComponent } from './home-customer/home-customer.component';
import { ShopCustomerComponent } from './shop-customer/shop-customer.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { HomeDeliveryBoyComponent } from './home-delivery-boy/home-delivery-boy.component';
import { ExploreNewDeliveriesComponent } from './explore-new-deliveries/explore-new-deliveries.component';


const routes: Routes = [
  { path: "", component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'datos-personales', component: DatosPersonalesComponent },
  { path: 'direccion', component: DireccionComponent },
  { path: 'home-customer', component: HomeCustomerComponent },
  { path: 'shop-customer', component: ShopCustomerComponent },
  { path: 'order-details', component: OrderDetailsComponent },
  { path: 'signup_shop_data1', component: SignupShopData1Component },
  { path: 'signup_shop_data2', component: SignupShopData2Component },
  {path: 'signup_shop_data_icecreamflavors', component: SignupShopDataIcecreamflavorsComponent},
  { path: 'home-delivery-boy', component: HomeDeliveryBoyComponent },
  { path: 'explore-new-deliveries', component: ExploreNewDeliveriesComponent },
  { path: '**', component: LandingPageComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
