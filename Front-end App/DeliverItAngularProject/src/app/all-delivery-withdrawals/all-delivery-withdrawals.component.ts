import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WithdrawalService } from '../services/withdrawal.service';


@Component({
  selector: 'app-all-delivery-withdrawals',
  templateUrl: './all-delivery-withdrawals.component.html',
  styleUrls: ['./all-delivery-withdrawals.component.scss']
})
export class AllDeliveryWithdrawalsComponent 
{
  pastWithdrawals = []

  constructor(private router: Router, private withdrawalService: WithdrawalService){}

  ngOnInit()
  {
    this.withdrawalService.findAllByDelivery().subscribe((response)=> this.pastWithdrawals=response)
  }





}
