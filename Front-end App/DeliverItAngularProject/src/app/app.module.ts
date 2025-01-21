import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
import { CustomerSearchbarComponent } from './customer-searchbar/customer-searchbar.component';
import { OrderConfirmedComponent } from './order-confirmed/order-confirmed.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AddPaymentTypeComponent } from './add-payment-type/add-payment-type.component';
import { AddProductCategoryComponent } from './add-product-category/add-product-category.component';
import { EditProductCategoryComponent } from './edit-product-category/edit-product-category.component';
import { EditPaymentTypeComponent } from './edit-payment-type/edit-payment-type.component';
import { ProductCategoryListComponent } from './product-category-list/product-category-list.component';
import { PaymentTypeListComponent } from './payment-type-list/payment-type-list.component';
import { ErrorPanelComponent } from './error-panel/error-panel.component';
import { CustomerCurrentOrdersComponent } from './customer-current-orders/customer-current-orders.component';
import { FlavoursCustomerComponent } from './flavours-customer/flavours-customer.component';
import { FlavoursCustomerItemComponent } from './flavours-customer-item/flavours-customer-item.component';
import { WithdrawalMenuComponent } from './withdrawal-menu/withdrawal-menu.component';
import { WithdrawOptionsComponent } from './withdraw-options/withdraw-options.component';
import { WithdrawalConfirmedComponent } from './withdrawal-confirmed/withdrawal-confirmed.component';
import { WithdrawalAmountComponent } from './withdrawal-amount/withdrawal-amount.component';
import { AddCommissionPercentageComponent } from './add-commission-percentage/add-commission-percentage.component';
import { CommissionPercentageListComponent } from './commission-percentage-list/commission-percentage-list.component';
import { EditCommissionPercentageComponent } from './edit-commission-percentage/edit-commission-percentage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShopListProductVariationsComponent } from './shop-list-product-variations/shop-list-product-variations.component';
import { ShopModifyProductVariationsComponent } from './shop-modify-product-variations/shop-modify-product-variations.component';
import { CustomerPendShopReviewsComponent } from './customer-pend-shop-reviews/customer-pend-shop-reviews.component';
import { ReviewComponent } from './review/review.component';
import { ShopReviewsComponent } from './shop-reviews/shop-reviews.component';
import { AllDeliveryWithdrawalsComponent } from './all-delivery-withdrawals/all-delivery-withdrawals.component';
import { ShopStatsComponent } from './shop-stats/shop-stats.component';
import { ErrorInterceptor } from './services/interceptors/error.service';
import { LoginService } from './services/login.service';

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
    CustomerSearchbarComponent,
    OrderConfirmedComponent,
    AdminPanelComponent,
    AddPaymentTypeComponent,
    AddProductCategoryComponent,
    EditProductCategoryComponent,
    EditPaymentTypeComponent,
    ProductCategoryListComponent,
    PaymentTypeListComponent,
    ErrorPanelComponent,
    CustomerCurrentOrdersComponent,
    FlavoursCustomerComponent,
    FlavoursCustomerItemComponent,
    WithdrawalMenuComponent,
    WithdrawOptionsComponent,
    WithdrawalConfirmedComponent,
    WithdrawalAmountComponent,
    AddCommissionPercentageComponent,
    CommissionPercentageListComponent,
    EditCommissionPercentageComponent,
    ShopListProductVariationsComponent,
    ShopModifyProductVariationsComponent,
    CustomerPendShopReviewsComponent,
    ReviewComponent,
    ShopReviewsComponent,
    AllDeliveryWithdrawalsComponent,
    ShopStatsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDividerModule,
    MatIconModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
