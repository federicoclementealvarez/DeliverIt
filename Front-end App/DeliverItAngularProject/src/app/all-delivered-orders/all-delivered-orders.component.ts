import { Component, OnInit } from '@angular/core';
import { AllDeliveredOrdersService } from '../services/all-delivered-orders.service';
import { Order } from '../explore-new-deliveries/explore-new-deliveries.component'; //esto debera ser eliminado en un futuro y deberemos importar la clase de la carpeta model

export class Deliver {
  deliverId: number;
  constructor (id:number){
    this.deliverId = id;
  }
}

@Component({
  selector: 'app-all-delivered-orders',
  templateUrl: './all-delivered-orders.component.html',
  styleUrls: ['./all-delivered-orders.component.scss']
})
export class AllDeliveredOrdersComponent implements OnInit{

  actualDeliver : Deliver;
  totalOrders : Order[] = [];
  deliveredOrders : Order[] = [];

  constructor(private service: AllDeliveredOrdersService){}

  ngOnInit(): void {

  }

  loadDeliveredOrders(){ //esto podria ir dentro del onInit directamente
    this.service.getList().subscribe(response => this.totalOrders = response);
    this.deliveredOrders = this.totalOrders.filter(order => { return order.orderStatus === 'Entregado' && order.deliverId === this.actualDeliver.deliverId } );
  }//Lo que hace esta funcion es busca todas los pedidos finalizados del deliveri actual, el cual debera ser el que tengamos "logueado"
}
/*en este componente falta la funcionalidad de los filtros*/