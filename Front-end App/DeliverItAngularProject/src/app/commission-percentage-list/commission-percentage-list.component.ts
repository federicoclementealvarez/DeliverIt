import { Component } from '@angular/core';
import { Commission } from '../entities/commission.entity';
import { CommissionService } from '../services/commission.service';
import { Router } from '@angular/router';
import { ValidatorsService } from '../services/validators.service';

@Component({
  selector: 'app-commission-percentage-list',
  templateUrl: './commission-percentage-list.component.html',
  styleUrls: ['./commission-percentage-list.component.scss']
})

export class CommissionPercentageListComponent 
{
  commissions?: Commission[] = []

  constructor(private CommissionService: CommissionService, private router: Router, private validatorService: ValidatorsService){}

  ngOnInit() 
  {
    this.CommissionService.findAll().subscribe((response) => this.commissions = response)
  }

  getCurrentCommission()
  {
    return this.CommissionService.getCurrentCommission(this.commissions)
  }

  onEditClick(commission: Commission)
  {
    if (commission.validSince >= (new Date()).toISOString().slice(0,10)) 
    {
      sessionStorage.setItem('idCommission',commission.id)
      this.router.navigate(['edit-commission-percentage'])
    }
  }
}










