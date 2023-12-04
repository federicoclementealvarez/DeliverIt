import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-deliver-order-description',
  templateUrl: './deliver-order-description.component.html',
  styleUrls: ['./deliver-order-description.component.scss']
})
export class DeliverOrderDescriptionComponent {

  @Output() buttonClicked = new EventEmitter<void>()
  @Input() description: string;
  @Input() price: string;
  @Input() client: string;
  @Input() paymentType: string;
  @Input() orderStatus: string;
  @Input() dateTimeArrival: string;
  buttonName: string; 

  addButtonName(): string{
    if (this.orderStatus==='Para repartir'){this.buttonName='Cambiar Estado'}
    else {this.buttonName='Aceptar Pedido'}
    return this.buttonName;
  }

  getOrderStatus(): boolean
  {
    if (this.orderStatus!=='Entregada' && this.orderStatus!=='En camino'){return true}
    else return false
  }

  onClickedButton()
  {
    this.buttonClicked.emit()
  }
}
