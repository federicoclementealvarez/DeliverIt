import { Component } from '@angular/core';
import { ValidatorsService } from '../services/validators.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Commission } from '../entities/commission.entity';
import { Router } from '@angular/router';
import { CommissionService } from '../services/commission.service';

@Component({
  selector: 'app-add-commission-percentage',
  templateUrl: './add-commission-percentage.component.html',
  styleUrls: ['./add-commission-percentage.component.scss']
})
export class AddCommissionPercentageComponent 
{
  addCommissionPercentageForm : FormGroup;
  submitted: boolean = false;

  constructor(private router : Router, private validator : ValidatorsService, private commissionService: CommissionService){}

  getValidSince()
  {
    return this.addCommissionPercentageForm.get('validSince');
  }

  ngOnInit() 
  {
    this.addCommissionPercentageForm = new FormGroup({
    num: new FormControl('', [Validators.required,this.validator.validatePrice()]),
    validSince: new FormControl({value: this.validator.getTodayDate(),disabled : false}, [Validators.required, this.validator.validateFutureDate()])})    
  }

  getNum(){return this.addCommissionPercentageForm.get('num')}

  submit()
  {
    this.submitted=true;
    if(this.addCommissionPercentageForm.valid)
    {
      const commission : Commission = 
      {
        percentage: this.addCommissionPercentageForm.get('num').value,
        validSince: this.addCommissionPercentageForm.get('validSince').value
      }
      this.commissionService.add(commission).subscribe(() => {alert('Comisión creada');this.router.navigate(['admin-panel'])})
    }

  }  
}
