import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShopType } from '../entities/shopType.entity';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeCustomerService {

  readonly baseUrl = 'http://localhost:3000/api/shopTypes/';
  constructor(private http: HttpClient) { }

  getShopTypes(): Observable<ShopType[]> {
    return this.http.get<ShopType[]>(this.baseUrl)
      .pipe(
        map((response: any) => response.body)
      );
  }
}
