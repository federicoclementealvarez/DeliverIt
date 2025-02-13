import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrlService } from './base-url.service';
import { Product } from '../entities/product.entity';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Shop } from '../entities/shop.entity';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  shopProducts: Product[]
  private selectedShop = new BehaviorSubject<any>({})

  constructor(private http: HttpClient, private baseUrlService: BaseUrlService) { }

  readonly url = `${this.baseUrlService.getBaseUrl()}products`;

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url)
      .pipe(
        map((response: any) => response.body)
      );
  }

  getOne(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.url}/${id}/~`)
      .pipe(
        map((response: any) => response.body)
      );
  }

  getByShopId(shopId: string): Observable<Product[]> {
    return this.http.get<any>(this.url + '/~/' + shopId)
      .pipe(
        map((response: any) => response.body)
      );
  }

  setSelectedShop(shop:Shop){
      this.selectedShop.next(shop);
    }

  getSelectedShop() {
      return this.selectedShop.asObservable();
    }

  create(prod: Product) {
    const formData = new FormData();
    formData.append("name", prod.name);
    formData.append("description", prod.description);
    formData.append("price", String(prod.price));
    formData.append("shop", prod.shop);
    formData.append("productCategory", prod.productCategory);
    formData.append("photo", prod.photo);
    formData.append("allowsVariations", prod.allowsVariations);

    if(prod.maxVariations!==undefined){
      formData.append("maxVariations", String(prod.maxVariations));
    }

    this.http.post<any>(this.url, formData).subscribe(response => console.log(response))
  }

  update(prod: Product): Observable<Product> {
    const formData = new FormData();
    formData.append("name", prod.name);
    formData.append("description", prod.description);
    formData.append("price", String(prod.price));
    formData.append("validSince", prod.validSince.toString());
    formData.append("photo", prod.photo);

    const url = this.baseUrlService.getBaseUrl() + 'products/' + prod.id

    return this.http.put<Product>(url, formData).pipe(
      map((response: any) => response.body)
    )
  }

  delete(id: string): Observable<Product> {
    const url = this.baseUrlService.getBaseUrl() + 'products/' + id

    return this.http.delete<any>(url).pipe(
      map((response: any) => response.body)
    )
  }
}