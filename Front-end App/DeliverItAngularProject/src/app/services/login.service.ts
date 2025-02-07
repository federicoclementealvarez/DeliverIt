import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrlService } from './base-url.service';
import { map, Observable } from 'rxjs';
import { ReviewRequest } from '../entities/review.entity';
import { LoginResponse, User } from '../entities/user.entity';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private router: Router,
    private http: HttpClient,
    private baseUrlService: BaseUrlService
  ) {}

  readonly baseUrl = `${this.baseUrlService.getBaseUrl()}user`;

  login(user): Observable<User> {
    return this.http
      .post<LoginResponse>(`${this.baseUrl}/login`, user)
      .pipe(map((response: LoginResponse) => response.data));
  }

  redirectUser(user) {
    if (user.userType.description === 'admin') {
      this.router.navigate(['admin-panel']);
    }
    if (user.userType.description === 'client') {
      this.router.navigate(['home-customer']);
    }
    if (user.userType.description === 'delivery') {
      this.router.navigate(['home-delivery-boy']);
    }
    if (user.userType.description === 'owner') {
      this.router.navigate(['home-shop']);
    }
  }

  getLoggedUser() {
    return JSON.parse(sessionStorage.getItem('user'));
  }

  setLoggedUser(user) {
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  getLoggedShop() {
    return JSON.parse(sessionStorage.getItem('shop'));
  }

  setLoggedShop(shop) {
    sessionStorage.setItem('shop', JSON.stringify(shop));
  }
}
