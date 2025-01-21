import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { LoginResponse, User } from '../entities/user.entity';
import { BaseUrlService } from './base-url.service';
import { UserType } from '../entities/userType.entity';

@Injectable({
  providedIn: 'root',
})
export class DatosPersonalesService {
  private signupBody = {};

  constructor(
    private http: HttpClient,
    private baseUrlService: BaseUrlService
  ) {}

  readonly baseUrl = `${this.baseUrlService.getBaseUrl()}user`;

  getUserTypes(): Observable<any> {
    return this.http
      .get<any>(`${this.baseUrlService.getBaseUrl()}userTypes`)
      .pipe(map((response: any) => response.data));
  }

  sendSignUpForm(signUpForm) {
    this.signupBody = { ...this.signupBody, ...signUpForm };
  }

  sendUserDataForm(userDataForm) {
    this.signupBody = { ...this.signupBody, ...userDataForm };
  }

  sendDireccionForm(direccionForm) {
    this.signupBody = { ...this.signupBody, ...direccionForm };
  }

  register(): Observable<User> {
    return this.http
      .post<User>(`${this.baseUrl}/register`, this.signupBody)
      .pipe(map((response: any) => response.data));
  }

  getUserAndPassword() {
    const body = {
      email: this.signupBody['email'],
      password: this.signupBody['password'],
    };
    return body;
  }
}
