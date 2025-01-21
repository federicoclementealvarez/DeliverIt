import { Injectable } from '@angular/core';
import { User } from '../entities/user.entity';
import { HttpClient } from '@angular/common/http';
import { BaseUrlService } from './base-url.service';
import { Observable, map } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly url = `${this.baseUrl.getBaseUrl()}user`;

  constructor(
    private http: HttpClient,
    private baseUrl: BaseUrlService,
    private loginService: LoginService
  ) {}

  loggedUser = this.loginService.getLoggedUser();

  findOne(): Observable<User> {
    return this.http
      .get<User>(`${this.url}/${this.loggedUser.id}`)
      .pipe(map((response: any) => response.data));
  }

  update(ammountToUpdate: number): Observable<User> {
    const body = { creditBalance: ammountToUpdate };
    return this.http
      .put<User>(`${this.url}/${this.loggedUser.id}`, body)
      .pipe(map((response: any) => response.message));
  }

  updateAll(body) {
    return this.http.patch<User>(`${this.url}/${this.loggedUser.id}`, body);
  }

  updateAddress(direccionForm: FormGroup): Observable<User> {
    const body = { ...direccionForm.value, creditBalance: 0 };
    return this.http
      .put<User>(`${this.url}/${this.loggedUser.id}`, body)
      .pipe(map((response: any) => response.message));
  }
}
