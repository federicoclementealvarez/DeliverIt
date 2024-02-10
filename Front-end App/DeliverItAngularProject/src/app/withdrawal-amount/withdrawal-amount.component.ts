import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidatorsService } from '../services/validators.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-withdrawal-amount',
  templateUrl: './withdrawal-amount.component.html',
  styleUrls: ['./withdrawal-amount.component.scss']
})

export class WithdrawalAmountComponent 
{
  withdrawalAmount: number = 24
  addWithdrawalAmountForm : FormGroup
  submitted: boolean = false

  constructor(private router : Router, private validator : ValidatorsService){}

  ngOnInit() 
  {
    this.addWithdrawalAmountForm  = new FormGroup({
    amount: new FormControl('', [Validators.required,this.validator.validatePrice()])})
  }

  getAmount()
  {
    return this.addWithdrawalAmountForm.get('amount');
  }

  /* 
  submit()
  {
    this.submitted=true;
    if(this.addWithdrawalAmountForm.valid)
      {
        const withdrawal = { amount: this.addWithdrawalAmountForm.get('amount').value }
        this.userService.update(withdrawal)
        this.router.navigate(['/withdrawal-confirmed']);
      }
  }*/
}
