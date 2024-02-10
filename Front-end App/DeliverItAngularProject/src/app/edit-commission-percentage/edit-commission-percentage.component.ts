import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Commission } from '../entities/commission.entity';
import { CommissionService } from '../services/commission.service';
import { ValidatorsService } from '../services/validators.service';

@Component({
  selector: 'app-edit-commission-percentage',
  templateUrl: './edit-commission-percentage.component.html',
  styleUrls: ['./edit-commission-percentage.component.scss']
})
export class EditCommissionPercentageComponent 
{
  /*
  editCommissionPercentageForm : FormGroup;
  submitted: boolean = false;
  
  constructor(private router: Router, private commissionService: CommissionService, private validator: ValidatorsService){}

  ngOnInit() 
  {
    this.editCommissionPercentageForm = new FormGroup({
    num: new FormControl('', [Validators.required,this.validator.validatePrice()]),
    validSince: new FormControl({value: this.validator.getTodayDate(),disabled : false}, [Validators.required, this.validator.validateFutureDate()])})    
  }

  getNum(){return this.editCommissionPercentageForm.get('num')}

  getValidSince(){return this.editCommissionPercentageForm.get('validSince');}

  submit()
  {

    this.submitted=true
    if (this.editPaymentTypeForm.valid)
    {
      const commission: Commission = 
      {
        id: sessionStorage.getItem('idCommission'),
        percentage: this.getDescription().value,
        percentage: this.getDescription().value

      }
      
      //this.paymentTypeService.update(paymentType).subscribe(() =>{sessionStorage.removeItem('idPaymentType'); alert('Forma de pago editada'); this.router.navigate(['admin-panel'])})

      this.paymentTypeService.update(paymentType).subscribe(
      {
        next: () =>{sessionStorage.removeItem('idPaymentType'); alert('Forma de pago editada'); this.router.navigate(['admin-panel'])},
        error: (error) => {sessionStorage.setItem('errorMessage',error.error.message);sessionStorage.setItem('statusCode',error.status);this.router.navigate(['error-panel'])}
      })
    }
 
  }
*/
}
