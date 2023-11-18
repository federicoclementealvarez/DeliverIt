import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrlService } from './base-url.service';
import { Observable } from 'rxjs';
import { ProductCategory } from '../entities/productCategory.entity';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService 

{
  url: string = this.baseUrlService.getBaseUrl() + 'productCategories/'

  constructor(private http: HttpClient, private baseUrlService:BaseUrlService ) {}

create(productCategory: ProductCategory): Observable<any>
{
  return this.http.post(this.url,productCategory)
}

getAll()
{
  return this.http.get<any>(this.url)
}

update(productCategory: ProductCategory): Observable<any>
{
  const data = {description: productCategory.description}
  return this.http.put<any>(`${this.url}/${productCategory.id}`,data)
}

delete(productCategoryId: string): Observable<any>
{
  return this.http.delete<any>(`${this.url}/${productCategoryId}`)
}
}