import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../explore-new-deliveries/explore-new-deliveries.component'; //esto debera ser eliminado en un futuro y deberemos importar la clase de la carpeta model

@Injectable({
  providedIn: 'root'
})
export class HomeDeliveryBoyService {

  readonly baseUrl = 'URL_DE_TU_BACKEND';
  constructor(private http: HttpClient) { }

  getList() { 
    const url = this.baseUrl + 'pedidos';
    return this.http.get<Order[]>(url)
  }

  showOrders(orders: Order[]):boolean {
  return (orders.length > 0)
  }
  
}
