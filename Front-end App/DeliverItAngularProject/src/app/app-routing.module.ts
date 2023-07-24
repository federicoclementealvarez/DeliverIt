import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SignupComponent } from './signup/signup.component';
import { DatosPersonalesComponent } from './datos-personales/datos-personales.component';
import { DireccionComponent } from './direccion/direccion.component';

const routes: Routes = [
  { path: "", component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'datos-personales', component: DatosPersonalesComponent },
  { path: 'direccion', component: DireccionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
