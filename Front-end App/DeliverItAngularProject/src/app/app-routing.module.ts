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
import { HomeShopComponent } from './home-shop/home-shop.component';
import { ShopAddProductComponent } from './shop-add-product/shop-add-product.component';
import { ShopModifyProductComponent } from './shop-modify-product/shop-modify-product.component';
import { AllDeliveredOrdersComponent } from './all-delivered-orders/all-delivered-orders.component';
import { ShopListProductComponent } from './shop-list-product/shop-list-product.component';
import { CustomerSearchResultsComponent } from './customer-search-results/customer-search-results.component';
import { OrderConfirmedComponent } from './order-confirmed/order-confirmed.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AddPaymentTypeComponent } from './add-payment-type/add-payment-type.component';
import { AddProductCategoryComponent } from './add-product-category/add-product-category.component';
import { EditPaymentTypeComponent } from './edit-payment-type/edit-payment-type.component';
import { EditProductCategoryComponent } from './edit-product-category/edit-product-category.component';
import { PaymentTypeListComponent } from './payment-type-list/payment-type-list.component';
import { ProductCategoryListComponent } from './product-category-list/product-category-list.component';
import { ErrorPanelComponent } from './error-panel/error-panel.component';

const routes: Routes = [
  { path: "", component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'datos-personales', component: DatosPersonalesComponent },
  { path: 'direccion', component: DireccionComponent },
  { path: 'home-customer', component: HomeCustomerComponent },
  { path: 'search-customer', component: CustomerSearchResultsComponent },
  { path: 'shop-customer/:shopId', component: ShopCustomerComponent },
  { path: 'order-details', component: OrderDetailsComponent },
  { path: 'order-confirmed', component: OrderConfirmedComponent },
  { path: 'signup_shop_data1', component: SignupShopData1Component },
  { path: 'signup_shop_data2', component: SignupShopData2Component },
  { path: 'signup_shop_data_icecreamflavors', component: SignupShopDataIcecreamflavorsComponent },
  { path: 'home-shop', component: HomeShopComponent },
  { path: 'shop-add-product', component: ShopAddProductComponent },
  { path: 'shop-list-product', component: ShopListProductComponent },
  { path: 'shop-modify-product', component: ShopModifyProductComponent },
  { path: 'home-delivery-boy', component: HomeDeliveryBoyComponent },
  { path: 'explore-new-deliveries', component: ExploreNewDeliveriesComponent },
  { path: 'all-delivered-orders', component: AllDeliveredOrdersComponent },
  { path: 'admin-panel', component: AdminPanelComponent },
  { path: 'add-payment-type', component: AddPaymentTypeComponent },
  { path: 'add-product-category', component: AddProductCategoryComponent },
  { path: 'edit-product-category/:id', component: EditProductCategoryComponent },
  { path: 'edit-payment-type/:id', component: EditPaymentTypeComponent },
  { path: 'payment-type-list', component: PaymentTypeListComponent },
  { path: 'product-category-list', component: ProductCategoryListComponent },
  { path: 'error-panel', component: ErrorPanelComponent},
  { path: '**', component: LandingPageComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
