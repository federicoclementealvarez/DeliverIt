import { Injectable } from '@angular/core';
import { ProductVariation } from '../entities/productVariation.entity';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Shop } from '../entities/shop.entity';
import { HttpClient } from '@angular/common/http';
import { BaseUrlService } from './base-url.service';

@Injectable({
  providedIn: 'root'
})

export class ProductVariationsService {

  private selectedProductVariationId = new BehaviorSubject<any>({})
  private selectedShop = new BehaviorSubject<any>({})


  constructor(private http: HttpClient, private baseUrlService: BaseUrlService) { }

  readonly url = `${this.baseUrlService.getBaseUrl()}productVariations`;


  filterProductVariations(productVariations: ProductVariation[]){
    let filteredProductVariations : ProductVariation[] = []

    productVariations.forEach((pv)=>{
      if(pv.isDisabled==false){
        filteredProductVariations.push(pv)
      }
    })

    return filteredProductVariations
  }

  setSelectedProductVariationId(id:string){
    this.selectedProductVariationId.next(id);
  }

  getSelectedProductVariationId() {
    return this.selectedProductVariationId.asObservable();
  }

  setSelectedShop(shop:Shop){
    this.selectedShop.next(shop);
  }

  getSelectedShop() {
    return this.selectedShop.asObservable();
  }

  create(productVariations: ProductVariation[]): Observable<ProductVariation[]> {
    const url = `${this.url}`

    const body = {productVariations: productVariations}

    return this.http.post<ProductVariation[]>(url, body).pipe(
            map((response: any) => response.body)
          )
  }
  
  update(productVariation: ProductVariation): Observable<ProductVariation> {
    const url = `${this.url}/${productVariation.id}`

    const body = {
      productVariations:[
        productVariation
      ]
    }

    return this.http.put<ProductVariation>(url, body).pipe(
      map((response: any) => response.body)
    )
  }

  delete(id: string): Observable<ProductVariation> {
    const url = `${this.url}/${id}`

    return this.http.delete<any>(url).pipe(
      map((response: any) => response.body)
    )
  }

}
