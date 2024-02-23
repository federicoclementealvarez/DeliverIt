import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommissionService } from '../services/commission.service';


@Component({
  selector: 'app-edit-commission-percentage',
  templateUrl: './edit-commission-percentage.component.html',
  styleUrls: ['./edit-commission-percentage.component.scss']
})
export class EditCommissionPercentageComponent 
{
  id: string

  constructor(private commissionService: CommissionService, private router: Router){}

  ngOnInit() 
  {
    this.id = sessionStorage.getItem('idCommission')
  }

 delete()
  {
    this.commissionService.remove(this.id).subscribe(()=>{sessionStorage.removeItem('idCommission'); alert('Comisión eliminada'); this.router.navigate(['admin-panel'])})
  }

}
