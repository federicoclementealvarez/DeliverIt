import { Component, ViewChild } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Order } from '../entities/order.entity';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-home-delivery-boy',
  templateUrl: './home-delivery-boy.component.html',
  styleUrls: ['./home-delivery-boy.component.scss']
})

export class HomeDeliveryBoyComponent {
  currentDeliveries = []
  pastDeliveries = []

  constructor(private orderService: OrderService, private router: Router) { }

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav

  ngOnInit() {
    this.orderService.findCurrentDeliveryOrders().subscribe((response) => this.currentDeliveries = response)
    this.orderService.findAllByDelivery().subscribe((response) => this.pastDeliveries = response.slice(-3).reverse()) //shows the last 3 delivieries, ordered by dateTimeArrival DESC
  }

  getPrice(order: Order): number {
    return this.orderService.getSubTotal(order)
  }

  getDescription(order: Order): string {
    return this.orderService.getDescription(order)
  }

  setDateTimeArrival(idOrder: string) {
    this.orderService.setDateTimeArrival(idOrder).subscribe(() => { alert('Pedido entregado con éxito'); this.router.navigate(['all-delivered-orders']) })
  }
}
