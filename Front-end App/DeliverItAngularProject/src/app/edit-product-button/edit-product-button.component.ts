import { Component, Input } from '@angular/core';
import { AddProductCustomerService } from '../services/add-product-customer.service';

@Component({
  selector: 'app-edit-product-button',
  templateUrl: './edit-product-button.component.html',
  styleUrls: ['./edit-product-button.component.scss']
})
export class EditProductButtonComponent {

  @Input() productId: string;

  constructor(private service: AddProductCustomerService){}
  
  clickOnEdit(){
    this.service.clickOnEdit(this.productId);
  }
}
