import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrlService } from './base-url.service';
import { ShopType } from '../entities/shopType.entity';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopTypeService {
  constructor(private http: HttpClient, private baseUrlService: BaseUrlService) { }

  getAll() {
    const url = this.baseUrlService.getBaseUrl() + 'shopTypes';
    return this.http.get<any>(url);
  }

  getShopTypes(): Observable<ShopType[]> {
    const url = this.baseUrlService.getBaseUrl() + 'shopTypes/';
    return this.http.get<ShopType[]>(url)
      .pipe(
        map((response: any) => response.body)
      );
  }

  getOne(id: string): Observable<ShopType> {
    const url = this.baseUrlService.getBaseUrl() + 'shopTypes/' + id;
    return this.http.get<ShopType>(url)
      .pipe(
        map((response: any) => response.body)
      );
  }
}
