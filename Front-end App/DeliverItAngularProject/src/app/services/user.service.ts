import { Injectable } from '@angular/core';
import { User } from '../entities/user.entity';
import { HttpClient } from '@angular/common/http';
import { BaseUrlService } from './base-url.service';
import { Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class UserService 
{
  readonly url = `${this.baseUrl.getBaseUrl()}user`

  constructor(private http: HttpClient, private baseUrl: BaseUrlService) { }


  findOne(): Observable<User>
  {
    return this.http.get<User>(`${this.url}/655b6dd2c6e26081bf21ffb1`).pipe(map((response: any) => response.data));
  }

  update(ammountToUpdate: number): Observable<User>
  {
    const body = { "creditBalance": ammountToUpdate }
    return this.http.put<User>(`${this.url}/655b6dd2c6e26081bf21ffb1`,body).pipe(map((response: any) => response.message));
  }


}
