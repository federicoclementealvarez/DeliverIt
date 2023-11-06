import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrlService } from './base-url.service';
import { Product } from '../entities/product.entity';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient, private baseUrlService: BaseUrlService) { }


  generateBoundary(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 30; // You can adjust the length as needed
  
    let boundary = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      boundary += characters.charAt(randomIndex);
    }
  
    return boundary;
  }
  


  create(prod:Product){
    const formData = new FormData();  
      
  
    formData.append("name", prod.name); 
    formData.append("description", prod.description);   
    formData.append("price", String(prod.price));
    formData.append("photo", prod.photo);
    
    //console.log(formData.get("price"))
    console.log('acá:')
    console.log(formData.append)
    const url = this.baseUrlService.getBaseUrl()+'products'

    console.log(url)
    console.log(prod.name)
    console.log(prod.description)
    console.log(prod.price)
    console.log(prod.photo)

     const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryAijcVzOttmUEFX3t'
      })
    }

    this.http.post<any>(/*'http://localhost:3001/upload'*/url, formData/*, httpOptions*/).subscribe(response =>  console.log(response) )
  }
}