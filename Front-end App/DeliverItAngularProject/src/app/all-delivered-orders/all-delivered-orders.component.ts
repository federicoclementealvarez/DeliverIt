import { Component} from '@angular/core';
import { OrderService } from '../services/order.service';
import { Order } from '../entities/order.entity';

@Component({
  selector: 'app-all-delivered-orders',
  templateUrl: './all-delivered-orders.component.html',
  styleUrls: ['./all-delivered-orders.component.scss']
})
export class AllDeliveredOrdersComponent{

  deliveredOrders = [];

  constructor(private orderService: OrderService){}

  ngOnInit()
  {
    this.orderService.findAllByDelivery().subscribe((response)=> this.deliveredOrders=response.reverse()) //shows all delivieries, ordered by dateTimeArrival DESC
  }

  getDescription(order: Order): string
  {
    return this.orderService.getDescription(order)
  }
} 
