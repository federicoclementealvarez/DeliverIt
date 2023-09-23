import { Component } from '@angular/core';
import { AddProductCustomerService } from '../services/add-product-customer.service';

@Component({
  selector: 'app-home-customer',
  templateUrl: './home-customer.component.html',
  styleUrls: ['./home-customer.component.scss']
})
export class HomeCustomerComponent {

  constructor(private addProductCustomerService: AddProductCustomerService) { }

  ngOnInit() {
    this.addProductCustomerService.resetProducts();
  }
}
