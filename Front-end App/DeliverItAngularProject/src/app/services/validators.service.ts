import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }

  validFileFormats=[
    "image/jpeg",
    "image/jpg"
  ]

  public validatePrice():ValidatorFn{
    return(control: AbstractControl) : ValidationErrors| null =>{
      const isInvalid = (control.value=="" || Number.isNaN(control.value) || control.value<0);
      return (isInvalid)? {'notValid':true}:null;
    }
  }

  public validateTodayDate():ValidatorFn{
    return(control: AbstractControl) : ValidationErrors| null =>{
      const isInvalid = (control.value!=this.getTodayDate());
      return (isInvalid)? {'notValid':true}:null;
    }
  }

  public validateFutureDate():ValidatorFn{
    return(control: AbstractControl) : ValidationErrors| null =>{
      const isInvalid = (control.value<this.getTodayDate());
      return (isInvalid)? {'notValid':true}:null;
    }
  }

  public validateImageFormat(file:File){
    if (file===undefined){
      return false;
    }
    return (this.validFileFormats.includes(file.type));
  }

  public getTodayDate(){
        const d = new Date(new Date());
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        const year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        return [year, month, day].join('-');
  }
}
