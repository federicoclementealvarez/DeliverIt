import { Component, Input } from '@angular/core';
import { AddProductCustomerService } from '../services/add-product-customer.service';

@Component({
  selector: 'app-add-product-button',
  templateUrl: './add-product-button.component.html',
  styleUrls: ['./add-product-button.component.scss']
})
export class AddProductButtonComponent {

  constructor(private service: AddProductCustomerService) {}

  @Input() quantity: number = 0;
  @Input() productId: string;

  incrementQuantity(productId: string) {
    this.quantity++
    this.service.addProduct(parseInt(productId))
  }

  diminishQuantity(productId: string) {
    this.quantity--
    this.service.removeProduct(parseInt(productId))
  }
}
