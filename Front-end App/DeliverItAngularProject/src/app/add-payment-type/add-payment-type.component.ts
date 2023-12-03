import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PaymentType } from '../entities/paymentType.entity';
import { PaymentTypeService } from '../services/payment-type.service';

@Component({
  selector: 'app-add-payment-type',
  templateUrl: './add-payment-type.component.html',
  styleUrls: ['./add-payment-type.component.scss']
})
export class AddPaymentTypeComponent {
 
  addPaymentTypeForm : FormGroup;
  submitted: boolean = false;
    
  constructor(private router : Router, private paymentTypeService: PaymentTypeService){}

  ngOnInit() 
  {
    this.addPaymentTypeForm = new FormGroup({description: new FormControl('', Validators.required)})
  }
  
  getDescription(){return this.addPaymentTypeForm.get('description');}
    
  submit()
  {
    this.submitted=true;
    if(this.addPaymentTypeForm.valid)
    {
      const paymentType : PaymentType = 
      {
        description: this.getDescription().value,
      }
      this.paymentTypeService.create(paymentType).subscribe(() => {alert('Forma de pago creada');this.router.navigate(['admin-panel'])})
    }
  }
}
