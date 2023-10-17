import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-deliver-order-description',
  templateUrl: './deliver-order-description.component.html',
  styleUrls: ['./deliver-order-description.component.scss']
})
export class DeliverOrderDescriptionComponent {

  @Input() description: string;
  @Input() price: string;
  @Input() client: string;
  @Input() paymentType: string;
  @Input() orderStatus: string;
  buttonName: string; 

  addButtonName(): string{
    if (this.orderStatus==='En camino'){this.buttonName='Cambiar Estado'}
    else {this.buttonName='Aceptar Pedido'}
    return this.buttonName;
  }

  /*paymentType = [
    {id: 0, description: "Efectivo"},
    {id: 1, description: "Tarjeta"}
    ];
  orderStatus = [
    {id: 0, description: "Pendiente"},
    {id: 1, description: "Confirmado"},
    {id: 2, description: "En camino"},
    {id: 3, description: "Entregado"},
    {id: 4, description: "Cancelado"}
  ];*/
}
