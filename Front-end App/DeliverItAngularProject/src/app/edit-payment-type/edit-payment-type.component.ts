import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { PaymentTypeService } from '../services/payment-type.service';
import { PaymentType } from '../entities/paymentType.entity';

@Component({
  selector: 'app-edit-payment-type',
  templateUrl: './edit-payment-type.component.html',
  styleUrls: ['./edit-payment-type.component.scss']
})

export class EditPaymentTypeComponent 
{
  editPaymentTypeForm : FormGroup;
  submitted: boolean = false;

  
  constructor(private router : Router, private paymentTypeService: PaymentTypeService){}

  ngOnInit() 
  {
    this.editPaymentTypeForm = new FormGroup({description: new FormControl('', Validators.required),})
  }


  getDescription()
  {
    return this.editPaymentTypeForm.get('description');
  }

  submit()
  {
    this.submitted=true
    if (this.editPaymentTypeForm.valid)
    {
      const paymentType: PaymentType = 
      {
        id: sessionStorage.getItem('idPaymentType'),
        description: this.getDescription().value
      }
      
      this.paymentTypeService.update(paymentType).subscribe(response => console.log(response))
      sessionStorage.removeItem('idPaymentType')
      this.router.navigate(['payment-type-list'])
    }

  }

  delete()
  {
    const id = sessionStorage.getItem('idPaymentType')
    this.paymentTypeService.delete(id).subscribe(response => console.log(response))
    sessionStorage.removeItem('idPaymentType')
    this.router.navigate(['payment-type-list'])
  }







}
