import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-withdrawal-confirmed',
  templateUrl: './withdrawal-confirmed.component.html',
  styleUrls: ['./withdrawal-confirmed.component.scss']
})
export class WithdrawalConfirmedComponent 
{
  amount: string

  constructor(private router: Router){}

  ngOnInit()
  {
    this.amount = localStorage.getItem('withdrawalAmount')
  }

  goBackToMenu()
  {
    localStorage.removeItem('withdrawalAmount')
    this.router.navigate(['withdrawal-menu'])
  }

}
