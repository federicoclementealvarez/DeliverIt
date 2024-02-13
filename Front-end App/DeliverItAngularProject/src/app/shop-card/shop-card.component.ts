import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../entities/product.entity';

@Component({
  selector: 'app-shop-card',
  templateUrl: './shop-card.component.html',
  styleUrls: ['./shop-card.component.scss']
})
export class ShopCardComponent {

  @Output() retrieveOrderId = new EventEmitter<string>()
  @Input() shopId: string
  @Input() productId: string
  @Input() product: Product
  @Input() title: string;
  @Input() subtitle: string;
  @Input() bottomText: string;
  @Input() hasStar: boolean;
  @Input() hasDropdown: boolean = false;
  @Input() hasAddButton: boolean;
  @Input() hasEditButton: boolean = false;
  @Input() imagePath: string;
  @Input() hasDescription: boolean = false; // enables the dropdown order description
  
  // dropdown order description parameters
  @Input() orderId : string;
  @Input() description: string;
  @Input() price: string;
  @Input() client: string;
  @Input() paymentType: string;
  @Input() orderStatus: string;
  @Input() dateTimeArrival: string;

  constructor() {}

  showDescription(){this.hasDescription=!this.hasDescription}

  getOrderId()
  {
    this.retrieveOrderId.emit(this.orderId)
  }


}
