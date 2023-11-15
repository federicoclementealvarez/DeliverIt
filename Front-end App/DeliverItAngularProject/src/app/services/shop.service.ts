import { Injectable } from '@angular/core';
import { Shop } from '../entities/shop.entity';
import { Observable, map } from 'rxjs';
import { BaseUrlService } from './base-url.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  constructor(private baseUrlService: BaseUrlService, private http: HttpClient) { }

  readonly baseUrl = `${this.baseUrlService.getBaseUrl()}shops/`;

  getAll(): Observable<Shop[]> {
    return this.http.get<Shop[]>(this.baseUrl)
      .pipe(
        map((response: any) => response.body)
      )
  }

  getOne(shopId: string): Observable<Shop> {
    return this.http.get<Shop>(this.baseUrl + shopId)
      .pipe(
        map((response: any) => response.body)
      );
  }

  getShopsByShopType(shopTypeId: string): Observable<Shop[]> {
    return this.http.get<Shop[]>(this.baseUrl + '~/' + shopTypeId + '/~')
      .pipe(
        map((response: any) => response.body)
      );
  }

  getShopsBySearchInput(searchInput: string): Observable<Shop[]> {
    return this.http.get<Shop[]>(this.baseUrl + searchInput + '/~/' + searchInput)
      .pipe(
        map((response: any) => response.body)
      );
  }
}
