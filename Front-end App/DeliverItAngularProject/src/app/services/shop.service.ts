import { Injectable } from '@angular/core';
import { Shop } from '../entities/shop.entity';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  private shops: Shop[]

  constructor() {
    this.shops = []
    this.shops.push(new Shop(1, "Lemmy's Pizza", 300, 4.5, 'Urquiza 1500'))
    this.shops.push(new Shop(2, "Mostaza", 320, 4.2, 'Av. Pellegrinni 1700'))
    this.shops.push(new Shop(3, "Gianduia Gelateria", 340, 4.1, 'Bv. Oroño 200'))
  }

  getAll() {
    return this.shops
  }

  // getOne(shopId: number) {
  //   return this.shops.find((s) => s.id === shopId)
  // }
}
