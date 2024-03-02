import { Component, ViewChild } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Order } from '../entities/order.entity';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-home-delivery-boy',
  templateUrl: './home-delivery-boy.component.html',
  styleUrls: ['./home-delivery-boy.component.scss']
})

export class HomeDeliveryBoyComponent 
{
  currentDeliveries = []
  pastDeliveries = []

  constructor(private orderService: OrderService, private router: Router, private userService: UserService) { }

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav

  ngOnInit() {
    this.orderService.findCurrentDeliveryOrders().subscribe((response) => this.currentDeliveries = response)
    this.orderService.findAllByDelivery().subscribe((response) => this.pastDeliveries = response.slice(0,3)) //shows the last 3 delivieries, ordered by dateTimeArrival DESC
  }

  getDescription(order: Order): string {
    return this.orderService.getDescription(order)
  }

  setArrival(idOrder: string, ammountToUpdate: number) {
    this.orderService.setDateTimeArrival(idOrder).subscribe(() => { alert('Pedido entregado con éxito'); this.updateUser(ammountToUpdate); this.router.navigate(['all-delivered-orders']) })
  }

  updateUser(ammountToUpdate: number)
  {
    return this.userService.update(ammountToUpdate).subscribe((response)=>console.log(response))
  }

  navigateForward()
  {
    this.router.navigate(['/all-delivered-orders'], { queryParams: { origin: 'home-delivery-boy' } });
  }









}
