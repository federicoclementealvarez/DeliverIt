import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrlService } from './base-url.service';
import { Shop } from '../entities/shop.entity';
import { Product } from '../entities/product.entity';

type statsType = {
  totalSellAmount: number,
  topProducts: productStatsType[]
}

type productStatsType = {
    product: Product,
    amount: number
}

@Injectable({
  providedIn: 'root'
})

export class StatsService {

  private shop : Shop

  constructor(private http: HttpClient, private baseUrlService: BaseUrlService) { }

  readonly url = `${this.baseUrlService.getBaseUrl()}shops/`;


  getStats() {
    const url = `${this.url}${this.shop.id}/true`
    
    return this.http.get<statsType>(url)
  }

  getShop() {
    return this.shop;
  }

  setShop(shop:Shop){
    this.shop = shop;
  }
}
