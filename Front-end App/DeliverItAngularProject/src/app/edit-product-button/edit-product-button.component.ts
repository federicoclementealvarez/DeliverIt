import { Component, Input } from '@angular/core';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-edit-product-button',
  templateUrl: './edit-product-button.component.html',
  styleUrls: ['./edit-product-button.component.scss']
})
export class EditProductButtonComponent {

  @Input() productId: string;

  constructor(private service: OrderService) { }

  clickOnEdit() {
    this.service.clickOnEdit(this.productId);
  }
}
