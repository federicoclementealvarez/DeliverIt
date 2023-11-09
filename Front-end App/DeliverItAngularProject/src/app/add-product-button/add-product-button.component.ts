import { Component, Input } from '@angular/core';
import { AddProductCustomerService } from '../services/add-product-customer.service';

@Component({
  selector: 'app-add-product-button',
  templateUrl: './add-product-button.component.html',
  styleUrls: ['./add-product-button.component.scss']
})
export class AddProductButtonComponent {
  quantity: number;
  @Input() productId: string;

  constructor(private service: AddProductCustomerService) {
    this.quantity = 0;
    console.log('created')
  }

  incrementQuantity(productId: string) {
    this.quantity++
    this.service.addProduct(productId)
  }

  diminishQuantity(productId: string) {
    this.quantity--
    this.service.removeProduct(productId)
  }
}
