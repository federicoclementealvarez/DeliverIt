import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimaryButtonComponent } from './primary-button/primary-button.component';
import { ShopCardComponent } from './shop-card/shop-card.component';
import { LoginComponent } from './login/login.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SignupShopData1Component } from './signup_shop_data/signup-shop-data1/signup-shop-data1.component';
import { SignupShopData2Component } from './signup_shop_data/signup-shop-data2/signup-shop-data2.component';
import { SignupShopDataIcecreamflavorsComponent } from './signup_shop_data/signup-shop-data-icecreamflavors/signup-shop-data-icecreamflavors.component';
import { ItemCardComponent } from './item-card/item-card.component';
import { DeleteButtonComponent } from './delete-button/delete-button.component';
import { SignupComponent } from './signup/signup.component';
import { InputPasswordComponent } from './input-password/input-password.component';
import { DatosPersonalesComponent } from './datos-personales/datos-personales.component';
import { DireccionComponent } from './direccion/direccion.component';
import { HomeCustomerComponent } from './home-customer/home-customer.component';
import { ShopTypeIconComponent } from './shop-type-icon/shop-type-icon.component';

@NgModule({
  declarations: [
    AppComponent,
    PrimaryButtonComponent,
    ShopCardComponent,
    LoginComponent,
    LandingPageComponent,
    SignupComponent,
    InputPasswordComponent,
    DatosPersonalesComponent,
    DireccionComponent,
    SignupShopData1Component,
    SignupShopData2Component,
    SignupShopDataIcecreamflavorsComponent,
    ItemCardComponent,
    DeleteButtonComponent,
    HomeCustomerComponent,
    ShopTypeIconComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
