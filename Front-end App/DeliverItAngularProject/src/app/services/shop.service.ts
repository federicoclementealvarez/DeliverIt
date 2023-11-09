import { Injectable } from '@angular/core';
import { Shop } from '../entities/shop.entity';
import { BaseUrlService } from './base-url.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  //private shops: Shop[]

  constructor(private baseUrlService: BaseUrlService, private http: HttpClient) {
    /*this.shops = []
    this.shops.push(new Shop(1, "Lemmy's Pizza", 300, 4.5, 'Urquiza 1500'))
    this.shops.push(new Shop(2, "Mostaza", 320, 4.2, 'Av. Pellegrinni 1700'))
    this.shops.push(new Shop(3, "Gianduia Gelateria", 340, 4.1, 'Bv. Oroño 200'))*/
  }

  getAll() {
      const url = this.baseUrlService.getBaseUrl()+'shops'
  
      return this.http.get<any>(url) 
  }

  getOne(shopId: string) {
    const url = this.baseUrlService.getBaseUrl()+'shops/'+shopId
    return this.http.get<any>(url)
  }
}
