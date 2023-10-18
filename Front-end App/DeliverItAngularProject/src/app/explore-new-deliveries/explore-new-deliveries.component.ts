import { Component, OnInit } from '@angular/core';
import { ExploreNewDeliveriesService } from '../services/explore-new-deliveries.service';

export class Order {
  orderId: number;
  clientId: number;
  deliverId: number
  orderStatus: string;

  constructor(id: number, status: string) {
  this.orderId = id;
  this.clientId = id;
  this.deliverId = id;
  this.orderStatus = status;
  }
}

@Component({
  selector: 'app-explore-new-deliveries',
  templateUrl: './explore-new-deliveries.component.html',
  styleUrls: ['./explore-new-deliveries.component.scss']
})

export class ExploreNewDeliveriesComponent implements OnInit{

  totalOrders: Order[] = [];
  pendingOrders: Order[] = [];
  viewOrders: boolean; //cuando esto sea falso es porque no hay pedidos pendientes y debe mostrar una pantalla de que no hay pedidos pend

  constructor(private service: ExploreNewDeliveriesService) {}

  ngOnInit(): void {
    if (this.service.showOrders(this.pendingOrders))
      this.viewOrders = true;
    else
      this.viewOrders = false; 
  }

  loadPendingOrders(){ //esto podria ir dentro del onInit directamente
    this.service.getList().subscribe(response => this.totalOrders = response);
    this.pendingOrders = this.totalOrders.filter(order => order.orderStatus === 'Pendiente');
  }/*obtener la lista de todos los pedidos pendientes*/

  //falta implementar una funcion para que cuando el repartidor tome el pedido pase su estado a 'Aceptado' y se le asigne el repartidor que lo aceptó 
}

/*deberemos obtener el conjunto de pedidos pendientes, luego listarlos y obtener todos sus atributos
  
  pedido atributos:
    pedidoId: number:
    clienteId: number;
/
  shopCard atributos:
    productId: string;
    title: string;
    subtitle: string;
    bottomText: string;
    hasStar: boolean;
    hasDropdown: boolean = false;
    hasButton: boolean = false;
    orderDescription: boolean = false;
/
  deliver-order-description atributos:
    description: string;
    price: string;
    client: string;
    paymentType: string;
    orderStatus: string;
    buttonName: string; 
    /
    de forma tal que tengamos los objetos enteros con todos los atributos de los pedidos para ver tanto el id del pedido,  el shop del que vienen, los datos del cliente, y los datos de la orden. lo que podriamos hacere es un objeto tal que:
    class Order {
      orderId: number;
      shop: {
        productId: string;
        title: string;
        subtitle: string;
        bottomText: string;
        hasStar: boolean;
        hasDropdown: boolean = false;
        hasButton: boolean = false;
        orderDescription: boolean = false;
      };
      orderDescription: {
          description: string;
          price: string;
          client: string;
          paymentType: string;
          orderStatus: string;
          buttonName: string;
      } 
*/

