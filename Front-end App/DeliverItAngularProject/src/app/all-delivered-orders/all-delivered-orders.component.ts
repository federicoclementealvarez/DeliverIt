import { Component } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Order } from '../entities/order.entity';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-all-delivered-orders',
  templateUrl: './all-delivered-orders.component.html',
  styleUrls: ['./all-delivered-orders.component.scss'],
})
export class AllDeliveredOrdersComponent {
  deliveredOrders = [];
  origin: string;

  constructor(
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.orderService
      .findAllByDelivery()
      .subscribe((response) => (this.deliveredOrders = response)); //shows all delivieries, ordered by dateTimeArrival DESC
  }

  getDescription(order: Order): string {
    return this.orderService.getDescription(order);
  }
}
