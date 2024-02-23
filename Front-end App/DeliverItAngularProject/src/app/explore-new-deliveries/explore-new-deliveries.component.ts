import { Component } from '@angular/core';
import { Order } from '../entities/order.entity';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-explore-new-deliveries',
  templateUrl: './explore-new-deliveries.component.html',
  styleUrls: ['./explore-new-deliveries.component.scss']
})

export class ExploreNewDeliveriesComponent 
{
  ordersWithoutDelivery = [];
  
  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit() 
  {
    this.orderService.findOrdersWithoutDelivery().subscribe((response)=> this.ordersWithoutDelivery=response)
  }

  getDescription(order: Order): string
  {
    return this.orderService.getDescription(order)
  }

  setDelivery(idOrder: string)
  {
    this.orderService.setDelivery(idOrder).subscribe(()=>{alert('Pedido asignado para repartir');this.router.navigate(['home-delivery-boy'])})
  }
}
