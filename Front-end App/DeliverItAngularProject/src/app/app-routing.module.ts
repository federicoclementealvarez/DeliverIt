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
import { CustomerCurrentOrdersComponent } from './customer-current-orders/customer-current-orders.component';
import { OrderConfirmedComponent } from './order-confirmed/order-confirmed.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AddPaymentTypeComponent } from './add-payment-type/add-payment-type.component';
import { AddProductCategoryComponent } from './add-product-category/add-product-category.component';
import { EditPaymentTypeComponent } from './edit-payment-type/edit-payment-type.component';
import { EditProductCategoryComponent } from './edit-product-category/edit-product-category.component';
import { PaymentTypeListComponent } from './payment-type-list/payment-type-list.component';
import { ProductCategoryListComponent } from './product-category-list/product-category-list.component';
import { ErrorPanelComponent } from './error-panel/error-panel.component';
import { FlavoursCustomerComponent } from './flavours-customer/flavours-customer.component';
import { WithdrawalMenuComponent } from './withdrawal-menu/withdrawal-menu.component';
import { WithdrawOptionsComponent } from './withdraw-options/withdraw-options.component';
import { WithdrawalConfirmedComponent } from './withdrawal-confirmed/withdrawal-confirmed.component';
import { WithdrawalAmountComponent } from './withdrawal-amount/withdrawal-amount.component';
import { AddCommissionPercentageComponent } from './add-commission-percentage/add-commission-percentage.component';
import { CommissionPercentageListComponent } from './commission-percentage-list/commission-percentage-list.component';
import { EditCommissionPercentageComponent } from './edit-commission-percentage/edit-commission-percentage.component';
import { ShopListProductVariationsComponent } from './shop-list-product-variations/shop-list-product-variations.component';
import { ShopModifyProductVariationsComponent } from './shop-modify-product-variations/shop-modify-product-variations.component';
import { CustomerPendShopReviewsComponent } from './customer-pend-shop-reviews/customer-pend-shop-reviews.component';
import { ReviewComponent } from './review/review.component';
import { ShopReviewsComponent } from './shop-reviews/shop-reviews.component';
import { AllDeliveryWithdrawalsComponent } from './all-delivery-withdrawals/all-delivery-withdrawals.component';
import { ShopStatsComponent } from './shop-stats/shop-stats.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  //Not protected routes
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'datos-personales', component: DatosPersonalesComponent },
  { path: 'direccion', component: DireccionComponent },
  { path: 'error-panel', component: ErrorPanelComponent },

  { path: 'signup_shop_data1', component: SignupShopData1Component },
  { path: 'signup_shop_data2', component: SignupShopData2Component },
  {
    path: 'signup_shop_data_icecreamflavors',
    component: SignupShopDataIcecreamflavorsComponent,
  },

  //Protected Client routes
  {
    path: 'home-customer',
    component: HomeCustomerComponent,
    canActivate: [AuthGuard],
    data: { role: ['client'] },
  },
  {
    path: 'search-customer',
    component: CustomerSearchResultsComponent,
    canActivate: [AuthGuard],
    data: { role: ['client'] },
  },
  {
    path: 'shop-customer/:shopId',
    component: ShopCustomerComponent,
    canActivate: [AuthGuard],
    data: { role: ['client'] },
  },
  {
    path: 'flavours-customer',
    component: FlavoursCustomerComponent,
    canActivate: [AuthGuard],
    data: { role: ['client'] },
  },
  {
    path: 'order-details',
    component: OrderDetailsComponent,
    canActivate: [AuthGuard],
    data: { role: ['client'] },
  },
  {
    path: 'order-confirmed',
    component: OrderConfirmedComponent,
    canActivate: [AuthGuard],
    data: { role: ['client'] },
  },
  {
    path: 'customer-pend-shop-reviews',
    component: CustomerPendShopReviewsComponent,
    canActivate: [AuthGuard],
    data: { role: ['client'] },
  },
  {
    path: 'review',
    component: ReviewComponent,
    canActivate: [AuthGuard],
    data: { role: ['client'] },
  },
  {
    path: 'reviews/shop',
    component: ShopReviewsComponent,
    canActivate: [AuthGuard],
    data: { role: ['client'] },
  },
  {
    path: 'customer-current-orders',
    component: CustomerCurrentOrdersComponent,
    canActivate: [AuthGuard],
    data: { role: ['client'] },
  },

  // Protected Owner routes
  {
    path: 'home-shop',
    component: HomeShopComponent,
    canActivate: [AuthGuard],
    data: { role: ['owner'] },
  },
  {
    path: 'shop-add-product',
    component: ShopAddProductComponent,
    canActivate: [AuthGuard],
    data: { role: ['owner'] },
  },
  {
    path: 'shop-list-product',
    component: ShopListProductComponent,
    canActivate: [AuthGuard],
    data: { role: ['owner'] },
  },
  {
    path: 'shop-modify-product',
    component: ShopModifyProductComponent,
    canActivate: [AuthGuard],
    data: { role: ['owner'] },
  },
  {
    path: 'shop-stats',
    component: ShopStatsComponent,
    canActivate: [AuthGuard],
    data: { role: ['owner'] },
  },
  {
    path: 'shop-list-productVariations',
    component: ShopListProductVariationsComponent,
    canActivate: [AuthGuard],
    data: { role: ['owner'] },
  },
  {
    path: 'shop-modify-productVariations',
    component: ShopModifyProductVariationsComponent,
    canActivate: [AuthGuard],
    data: { role: ['owner'] },
  },

  //Protected Delivery routes
  {
    path: 'home-delivery-boy',
    component: HomeDeliveryBoyComponent,
    canActivate: [AuthGuard],
    data: { role: ['delivery'] },
  },
  {
    path: 'explore-new-deliveries',
    component: ExploreNewDeliveriesComponent,
    canActivate: [AuthGuard],
    data: { role: ['delivery'] },
  },
  {
    path: 'all-delivered-orders',
    component: AllDeliveredOrdersComponent,
    canActivate: [AuthGuard],
    data: { role: ['delivery'] },
  },
  {
    path: 'withdrawal-menu',
    component: WithdrawalMenuComponent,
    canActivate: [AuthGuard],
    data: { role: ['delivery'] },
  },
  {
    path: 'withdraw-options',
    component: WithdrawOptionsComponent,
    canActivate: [AuthGuard],
    data: { role: ['delivery'] },
  },
  {
    path: 'withdrawal-confirmed',
    component: WithdrawalConfirmedComponent,
    canActivate: [AuthGuard],
    data: { role: ['delivery'] },
  },
  {
    path: 'withdrawal-amount',
    component: WithdrawalAmountComponent,
    canActivate: [AuthGuard],
    data: { role: ['delivery'] },
  },
  {
    path: 'all-delivery-withdrawals',
    component: AllDeliveryWithdrawalsComponent,
    canActivate: [AuthGuard],
    data: { role: ['delivery'] },
  },

  //Protected Admin routes
  {
    path: 'admin-panel',
    component: AdminPanelComponent,
    canActivate: [AuthGuard],
    data: { role: ['admin'] },
  },
  {
    path: 'add-payment-type',
    component: AddPaymentTypeComponent,
    canActivate: [AuthGuard],
    data: { role: ['admin'] },
  },
  {
    path: 'add-product-category',
    component: AddProductCategoryComponent,
    canActivate: [AuthGuard],
    data: { role: ['admin'] },
  },
  {
    path: 'edit-product-category',
    component: EditProductCategoryComponent,
    canActivate: [AuthGuard],
    data: { role: ['admin'] },
  },
  {
    path: 'edit-payment-type',
    component: EditPaymentTypeComponent,
    canActivate: [AuthGuard],
    data: { role: ['admin'] },
  },
  {
    path: 'payment-type-list',
    component: PaymentTypeListComponent,
    canActivate: [AuthGuard],
    data: { role: ['admin'] },
  },
  {
    path: 'product-category-list',
    component: ProductCategoryListComponent,
    canActivate: [AuthGuard],
    data: { role: ['admin'] },
  },
  {
    path: 'add-commission-percentage',
    component: AddCommissionPercentageComponent,
    canActivate: [AuthGuard],
    data: { role: ['admin'] },
  },
  {
    path: 'commission-percentage-list',
    component: CommissionPercentageListComponent,
    canActivate: [AuthGuard],
    data: { role: ['admin'] },
  },
  {
    path: 'edit-commission-percentage',
    component: EditCommissionPercentageComponent,
    canActivate: [AuthGuard],
    data: { role: ['admin'] },
  },

  //Shared routes
  //...Non shared routes yet

  { path: '**', component: LandingPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
