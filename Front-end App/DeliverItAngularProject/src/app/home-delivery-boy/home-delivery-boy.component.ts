import { Component, OnInit, ViewChild } from '@angular/core';
import { HomeDeliveryBoyService } from '../services/home-delivery-boy.service';
import { Order } from '../explore-new-deliveries/explore-new-deliveries.component'; //esto debera ser eliminado en un futuro y deberemos importar la clase de la carpeta model
import { Deliver } from '../all-delivered-orders/all-delivered-orders.component'; //esto debera ser eliminado en un futuro y deberemos importar la clase de la carpeta model

@Component({
  selector: 'app-home-delivery-boy',
  templateUrl: './home-delivery-boy.component.html',
  styleUrls: ['./home-delivery-boy.component.scss']
})

export class HomeDeliveryBoyComponent implements OnInit{
  pedidosEnCurso: boolean = true; //esto será eliminado  junto a la funcion alterView ya que dependen del evento click del h6 del template
  orderDescription: boolean = false; 
  totalOrders : Order[] = [];
  activeOrders : Order[] = [];
  actualDeliver: Deliver;
  viewOrders: boolean; //esta opcion mostrara si hay pedidos true y mostrara un determinado template y si es false mostrara que no hay pedidos

  constructor(private service: HomeDeliveryBoyService) {}

  ngOnInit(): void {
    if (this.service.showOrders(this.activeOrders))
      this.viewOrders = true;
    else
      this.viewOrders = false;
  }

  loadActiveOrders(){ //esto podria ir dentro del onInit directamente
    this.service.getList().subscribe(response => this.totalOrders = response);
    this.activeOrders = this.totalOrders.filter(order => { return (order.orderStatus === 'En Curso' || order.orderStatus === 'En Camino') && order.deliverId === this.actualDeliver.deliverId })
  }//Lo que hace esta funcion es busca todas los pedidos Confirmados o En camino del delivery actual, el cual debera ser el que tengamos "logueado"

  alterView (){ //esto será eliminado ya que dependen del evento click del h6 del template
  this.pedidosEnCurso = !this.pedidosEnCurso;
  }
}
/* En este componente falta todavia una funcion para actualizar el estado del pedido, de En Curso a En Camino y de En Camino a Entregado la funcion es parecida a la que se usa en el componente al explore-new-deliveries
tambien falta mostrar las ultimas 2 entregas en la seccion de ultimas entregas, eso se hace parecido a lo que esta hecho en all-delivered-orders
*/
