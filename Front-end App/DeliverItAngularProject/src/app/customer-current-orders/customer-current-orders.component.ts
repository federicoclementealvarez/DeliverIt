import { Component } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Order } from '../entities/order.entity';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-current-orders',
  templateUrl: './customer-current-orders.component.html',
  styleUrls: ['./customer-current-orders.component.scss']
})

export class CustomerCurrentOrdersComponent 

{
  currentOrders = []

  constructor(private orderService: OrderService) {}

  ngOnInit()
  {
    this.orderService.findCurrentCustomerOrders().subscribe((response)=> this.currentOrders=response)
  }
 
  getPrice(order: Order): number
  {
    return this.orderService.getSubTotal(order)
  }

  getDescription(order: Order): string
  {
    return this.orderService.getDescription(order)
  }

}
