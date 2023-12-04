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
    this.paymentTypeService.getAll().subscribe(
    {
        next: (response) => this.paymentTypes=response ,
        error: (error) => {sessionStorage.setItem('errorMessage',error.error.message);sessionStorage.setItem('statusCode',error.status);this.router.navigate(['error-panel'])}
      })
    sessionStorage.removeItem('idPaymentType')
  }

  onEditClick(paymentTypeId: string)
  {
    sessionStorage.setItem('idPaymentType',paymentTypeId)
    this.router.navigate(['edit-payment-type'])
  }
}
