import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrlService } from './base-url.service';
import { Shop } from '../entities/shop.entity';
import { map, Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ShopRegisterServiceService {

  private signupShopBody = {};
  
    constructor(
      private http: HttpClient,
      private baseUrlService: BaseUrlService,
      private loginService: LoginService,
    ) {}
  
    readonly baseUrl = `${this.baseUrlService.getBaseUrl()}shops`;
  
    addShopFormData(shopAddData) {
      this.signupShopBody = { ...this.signupShopBody, ...shopAddData };
    }
    register(): Observable<Shop> {
      const loggedUser = this.loginService.getLoggedUser();
      this.signupShopBody = { ...this.signupShopBody, ...{owner: loggedUser.id} };

      const formData = new FormData();
  
      Object.keys(this.signupShopBody).forEach((key) => {
        const value = this.signupShopBody[key];
    
        if (value instanceof File) {
          formData.append(key, value);
        } else if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      });
    
      return this.http
        .post<Shop>(`${this.baseUrl}`, formData)
        .pipe(map((response: any) => response.data));
    }
}
