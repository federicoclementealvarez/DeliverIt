import { Injectable } from '@angular/core';
import { User } from '../entities/user.entity';
import { HttpClient } from '@angular/common/http';
import { BaseUrlService } from './base-url.service';
import { Observable, map } from 'rxjs';
import { FormGroup } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})

export class UserService {
  readonly url = `${this.baseUrl.getBaseUrl()}user`

  constructor(private http: HttpClient, private baseUrl: BaseUrlService) { }


  findOne(): Observable<User> {
    return this.http.get<User>(`${this.url}/65dff25c076e3ac03ba6ed89`).pipe(map((response: any) => response.data));
  }

  update(ammountToUpdate: number): Observable<User> {
    const body = { "creditBalance": ammountToUpdate }
    return this.http.put<User>(`${this.url}/65dff25c076e3ac03ba6ed89`, body).pipe(map((response: any) => response.message));
  }

  updateAddress(direccionForm: FormGroup): Observable<User> {
    const body = { ...direccionForm.value, creditBalance: 0 }
    return this.http.put<User>(`${this.url}/654c09e2da8e9efaeeae0253`, body).pipe(map((response: any) => response.message));
  }
}
