import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidatorsService } from '../services/validators.service';
import { Router } from '@angular/router';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';
import { WithdrawalService } from '../services/withdrawal.service';

@Component({
  selector: 'app-withdrawal-amount',
  templateUrl: './withdrawal-amount.component.html',
  styleUrls: ['./withdrawal-amount.component.scss']
})

export class WithdrawalAmountComponent 
{
  user: User = new User
  addWithdrawalAmountForm : FormGroup
  submitted: boolean = false

  constructor(private router : Router, private validator : ValidatorsService, private userService: UserService, private withdrawalService: WithdrawalService){}

  ngOnInit() 
  {
    this.addWithdrawalAmountForm  = new FormGroup({
    amount: new FormControl('', [Validators.required,this.validator.validatePrice()])})

    this.userService.findOne().subscribe((response) => this.user = response)
  }

  getAmount()
  {
    return this.addWithdrawalAmountForm.get('amount');
  }

  
  submit()
  {
    this.submitted=true;
    if(this.addWithdrawalAmountForm.valid)
    {
      const withdrawal = { 
        amount: this.addWithdrawalAmountForm.get('amount').value,
        dateTime: this.validator.getCurrentDateTime() }
        
      this.userService.update(withdrawal.amount*-1).subscribe((response)=>console.log(response))
      this.withdrawalService.add(withdrawal).subscribe((response) => { console.log(response); localStorage.setItem('withdrawalAmount',withdrawal.amount.toString()) ; this.router.navigate(['withdrawal-confirmed']) })
    }
  }
}
