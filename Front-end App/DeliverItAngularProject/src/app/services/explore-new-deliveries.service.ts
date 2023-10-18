import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../explore-new-deliveries/explore-new-deliveries.component'; //esto debera ser eliminado en un futuro y deberemos importar la clase del backend

@Injectable({
  providedIn: 'root'
})
export class ExploreNewDeliveriesService {

  readonly baseUrl = 'URL_DE_TU_BACKEND';
  constructor(private http: HttpClient) { }

  getList() { 
    const url = this.baseUrl + 'pedidos';
    return this.http.get<Order[]>(url)
  }

  showOrders(orders: Order[]):boolean {
  return (orders.length > 0)
  }
  
  acceptOrder(orderId: number, asignedDelivery: string) {
  const updateUrl = `${this.baseUrl}/orders/${orderId}`;
  const updateData = {
    orderStatus: 'Confirmado',
    deliveryPerson: asignedDelivery
  };

  return this.http.patch(updateUrl, updateData);
  }
}
