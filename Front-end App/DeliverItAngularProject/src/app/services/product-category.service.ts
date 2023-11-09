import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrlService } from './base-url.service';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {
  constructor(private http : HttpClient, private baseUrlService: BaseUrlService) { }
  
  getAll() {
      const url = this.baseUrlService.getBaseUrl() + 'productCategories';
      return this.http.get<any>(url);
  }
}



