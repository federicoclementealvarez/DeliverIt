import { Component, Input } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Product } from '../entities/product.entity';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product-button',
  templateUrl: './add-product-button.component.html',
  styleUrls: ['./add-product-button.component.scss']
})
export class AddProductButtonComponent {
  quantity: number;
  @Input() product: Product;

  constructor(private router: Router, private orderService: OrderService) {
    this.quantity = 0
  }

  incrementQuantity(product: Product) {
    this.quantity++
    this.router.navigateByUrl('/flavours-customer', { state: product })
    this.orderService.addProduct(product)
  }

  diminishQuantity(product: Product) {
    this.quantity--
    this.orderService.removeProduct(product)
  }
}
