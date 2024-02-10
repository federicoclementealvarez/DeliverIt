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
    this.CommissionService.findAll().subscribe(
    {
        next: (response) => this.commissions=response ,
        error: (error) => {sessionStorage.setItem('errorMessage',error.error.message);sessionStorage.setItem('statusCode',error.status);this.router.navigate(['error-panel'])}
      })
    sessionStorage.removeItem('idCommission')

    


  }

  onEditClick(commissionId: string)
  {
    sessionStorage.setItem('idCommission',commissionId)
    this.router.navigate(['edit-commission-percentage'])
  }
}











