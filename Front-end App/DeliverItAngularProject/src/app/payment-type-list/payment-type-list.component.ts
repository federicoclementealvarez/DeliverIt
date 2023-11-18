import { Component } from '@angular/core';
import { PaymentType } from '../entities/paymentType.entity';
import { PaymentTypeService } from '../services/payment-type.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-type-list',
  templateUrl: './payment-type-list.component.html',
  styleUrls: ['./payment-type-list.component.scss']
})
export class PaymentTypeListComponent 
{
  paymentTypes?: PaymentType[] = []

  constructor(private paymentTypeService: PaymentTypeService, private router: Router){}

  ngOnInit() 
  {
    this.paymentTypeService.findAll().subscribe((response) => this.paymentTypes=response.data)
  }

  onEditClick(paymentTypeId: string)
  {
    sessionStorage.setItem('idPaymentType',paymentTypeId)
    this.router.navigate(['edit-payment-type',paymentTypeId])
  }
}
