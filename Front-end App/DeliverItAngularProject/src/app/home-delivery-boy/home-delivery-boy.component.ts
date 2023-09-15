import { Component } from '@angular/core';

@Component({
  selector: 'app-home-delivery-boy',
  templateUrl: './home-delivery-boy.component.html',
  styleUrls: ['./home-delivery-boy.component.scss']
})
export class HomeDeliveryBoyComponent {
  pedidosEnCurso: boolean = true; //esto será un arreglo con los pedidos en curso
  orderDescription: boolean = false; 
alterView (){
  this.pedidosEnCurso = !this.pedidosEnCurso;
}
expandDeliver(){ //opcion para expandir y ver el pedido completo
  this.orderDescription = !this.orderDescription;
}

}
