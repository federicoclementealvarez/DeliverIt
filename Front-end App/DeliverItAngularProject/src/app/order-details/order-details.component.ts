import { Component } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';
import { PaymentTypeService } from '../services/payment-type.service';
import { PaymentType } from '../entities/paymentType.entity';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent {
  constructor(private orderService: OrderService,
    private paymentTypeService: PaymentTypeService,
    private router: Router) { }

  items = []
  subTotal: number
  shippingPrice: number
  total: number
  paymentTypes: PaymentType[]
  submitted = false
  paymentTypeForm = new FormGroup({
    selectedPaymentType: new FormControl('', Validators.required)
  })

  ngOnInit() {
    this.getItems()
    this.getSubTotal()
    this.getShippingPrice()
    this.getPaymentTypes()
    this.total = this.subTotal + this.shippingPrice
  }

  // Devuelvo un Array con los Productos y sus cantidades
  getItems() {
    this.items = this.orderService.getOrder().lineItems
  }

  getSubTotal() {
    this.subTotal = this.orderService.getSubTotal()
  }

  getShippingPrice() {
    this.shippingPrice = 300
  }

  getSelectedPaymentType() {
    return this.paymentTypeForm.get('selectedPaymentType')
  }

  create() {
    this.submitted = true
    if (this.paymentTypeForm.valid) {
      this.orderService.create(this.getSelectedPaymentType().value).subscribe(() => {
        this.router.navigate(['order-confirmed'])
      })
    }
  }

  getPaymentTypes() {
    this.paymentTypeService.getAll().subscribe((data: PaymentType[]) => {
      this.paymentTypes = data
    })
  }
}
