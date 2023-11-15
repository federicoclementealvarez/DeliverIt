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

  readonly baseUrl = `${this.baseUrlService.getBaseUrl()}shopTypes/`;

  getAll(): Observable<ShopType[]> {
    return this.http.get<ShopType[]>(this.baseUrl)
      .pipe(
        map((response: any) => response.body)
      );
  }

  getOne(id: string): Observable<ShopType> {
    return this.http.get<ShopType>(this.baseUrl + id)
      .pipe(
        map((response: any) => response.body)
      );
  }
}
