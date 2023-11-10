import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrlService } from './base-url.service';
import { Product } from '../entities/product.entity';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient, private baseUrlService: BaseUrlService) { }

  create(prod:Product){
    const formData = new FormData();  
    formData.append("name", prod.name); 
    formData.append("description", prod.description);   
    formData.append("price", String(prod.price));
    formData.append("shop", prod.shop);
    formData.append("productCategory", prod.productCategory);
    formData.append("fileBeginner", 'prd');
    formData.append("photo", prod.photo);

    const url = this.baseUrlService.getBaseUrl()+'products'
 
    this.http.post<any>(url, formData).subscribe(response =>  console.log(response) )
  }

  update(prod:Product){
    const formData = new FormData();  
    formData.append("name", prod.name); 
    formData.append("description", prod.description); 
    formData.append("price", String(prod.price));
    formData.append("validSince", prod.validSince.toString());
    formData.append("fileBeginner", 'prd');
    formData.append("photo", prod.photo);

    const url = this.baseUrlService.getBaseUrl()+'products/'+prod.id

    this.http.put<any>(url, formData).subscribe(response =>  console.log(response) )
  }

  delete(id:string){
    const url = this.baseUrlService.getBaseUrl()+'products/'+id

    this.http.delete<any>(url).subscribe(response =>  console.log(response) )
  }

  getOne(id:string){
    const url = this.baseUrlService.getBaseUrl()+'products/'+id+'/~'

    return this.http.get<any>(url)
  }

  getByShopId(shopId:string){
    const url = this.baseUrlService.getBaseUrl()+'products/~/'+shopId

    return this.http.get<any>(url)
  }
}