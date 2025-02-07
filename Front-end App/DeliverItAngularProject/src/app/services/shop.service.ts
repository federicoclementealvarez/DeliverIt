import { Injectable } from '@angular/core';
import { Shop } from '../entities/shop.entity';
import { Observable, map } from 'rxjs';
import { BaseUrlService } from './base-url.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../entities/user.entity';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  constructor(private baseUrlService: BaseUrlService, private http: HttpClient) { }

  readonly baseUrl = `${this.baseUrlService.getBaseUrl()}shops/`;

  public shops: Observable<Shop[]>;
  public shop: Observable<Shop>;

  getAll(): Observable<Shop[]> {
    this.shops = this.http.get<Shop[]>(this.baseUrl)
      .pipe(
        map((response: any) => response.body)
      )

    return this.shops
  }

  getOne(shopId: string): Observable<Shop> {
    this.shop = this.http.get<Shop>(this.baseUrl + shopId)
      .pipe(
        map((response: any) => response.body)
      );

    return this.shop
  }

  getShopByOwnerId(ownerId: string): Observable<Shop> {
    this.shop = this.http.get<Shop>(this.baseUrl+'owner/'+ownerId)
      .pipe(
        map((response: any) => response.body)
      );

    return this.shop
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
