import { Component, Input } from '@angular/core';
import { AddProductCustomerService } from '../services/add-product-customer.service';

@Component({
  selector: 'app-add-product-button',
  templateUrl: './add-product-button.component.html',
  styleUrls: ['./add-product-button.component.scss']
})
export class AddProductButtonComponent {
  public quantity: number = 0;
  @Input() productId: number;

  constructor(private service: AddProductCustomerService) {
    console.log(this.quantity)
  }


  incrementQuantity(productId: number) {
    this.quantity = 8
    console.log(this.quantity)
    this.service.addProduct(productId)
  }

  diminishQuantity(productId: number) {
    this.quantity--
    this.service.removeProduct(productId)
  }
}
