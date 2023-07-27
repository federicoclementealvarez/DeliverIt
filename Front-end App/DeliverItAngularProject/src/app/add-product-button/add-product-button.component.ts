import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-add-product-button',
  templateUrl: './add-product-button.component.html',
  styleUrls: ['./add-product-button.component.scss']
})
export class AddProductButtonComponent {
  quantity: number = 0;

  incrementQuantity() {
    this.quantity++;
  }

  diminishQuantity() {
    this.quantity--;
  }
}
