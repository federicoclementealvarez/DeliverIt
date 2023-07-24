import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [
  { path: "", component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'datos-personales', component: DatosPersonalesComponent },
  { path: 'direccion', component: DireccionComponent }
  { path: 'signup_shop_data1', component: SignupShopData1Component },
  { path: 'signup_shop_data2', component: SignupShopData2Component },
  {path: 'signup_shop_data_icecreamflavors', component: SignupShopDataIcecreamflavorsComponent},
  { path: '**', component: LandingPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
