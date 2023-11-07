import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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
import { ShopCustomerComponent } from './shop-customer/shop-customer.component';
import { AddProductButtonComponent } from './add-product-button/add-product-button.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { HomeDeliveryBoyComponent } from './home-delivery-boy/home-delivery-boy.component';
import { ExploreNewDeliveriesComponent } from './explore-new-deliveries/explore-new-deliveries.component';
import { DeliverOrderDescriptionComponent } from './deliver-order-description/deliver-order-description.component';
import { HomeShopComponent } from './home-shop/home-shop.component';
import { ShopAddProductComponent } from './shop-add-product/shop-add-product.component';
import { ShopModifyProductComponent } from './shop-modify-product/shop-modify-product.component';
import { SecondaryButtonComponent } from './secondary-button/secondary-button.component';
import { AllDeliveredOrdersComponent } from './all-delivered-orders/all-delivered-orders.component';
import { ShopListProductComponent } from './shop-list-product/shop-list-product.component';
import { EditProductButtonComponent } from './edit-product-button/edit-product-button.component';
import { CustomerSearchResultsComponent } from './customer-search-results/customer-search-results.component';

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
    ShopTypeIconComponent,
    ShopCustomerComponent,
    AddProductButtonComponent,
    OrderDetailsComponent,
    HomeDeliveryBoyComponent,
    ExploreNewDeliveriesComponent,
    DeliverOrderDescriptionComponent,
    HomeShopComponent,
    ShopAddProductComponent,
    ShopModifyProductComponent,
    SecondaryButtonComponent,
    AllDeliveredOrdersComponent,
    ShopListProductComponent,
    EditProductButtonComponent,
    CustomerSearchResultsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
