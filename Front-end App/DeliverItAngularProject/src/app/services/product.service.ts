import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrlService } from './base-url.service';
import { Product } from '../entities/product.entity';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  shopProducts: Product[]

  constructor(private http: HttpClient, private baseUrlService: BaseUrlService) { }

  readonly url = `${this.baseUrlService.getBaseUrl()}products/`;

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url)
      .pipe(
        map((response: any) => response.body)
      );
  }

  getOne(id: string): Observable<Product> {
    return this.http.get<Product>(this.url + id + '/~')
      .pipe(
        map((response: any) => response.body)
      );
  }

  getByShopId(shopId: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.url + '/~/' + shopId)
      .pipe(
        map((response: any) => response.body)
      );
  }

  create(prod: Product) {
    const formData = new FormData();
    formData.append("name", prod.name);
    formData.append("description", prod.description);
    formData.append("price", String(prod.price));
    formData.append("shop", prod.shop);
    formData.append("productCategory", prod.productCategory);
    formData.append("fileBeginner", 'prd');
    formData.append("photo", prod.photo);

    this.http.post<any>(this.url, formData).subscribe(response => console.log(response))
  }

  update(prod: Product) {
    const formData = new FormData();
    formData.append("name", prod.name);
    formData.append("description", prod.description);
    formData.append("price", String(prod.price));
    formData.append("validSince", prod.validSince.toString());
    formData.append("fileBeginner", 'prd');
    formData.append("photo", prod.photo);

    const url = this.baseUrlService.getBaseUrl() + 'products/' + prod.id

    this.http.put<any>(url, formData).subscribe(response => console.log(response))
  }

  delete(id: string) {
    const url = this.baseUrlService.getBaseUrl() + 'products/' + id

    this.http.delete<any>(url).subscribe(response => console.log(response))
  }
}