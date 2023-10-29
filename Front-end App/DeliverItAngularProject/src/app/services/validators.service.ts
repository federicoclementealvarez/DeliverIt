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
    console.log("entró");
    return(control: AbstractControl) : ValidationErrors| null =>{
      console.log(control.value);
      const isInvalid = (control.value!=this.getTodayDate());
      console.log("isInvalid: "+ isInvalid);
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
      const fecha = new Date().toLocaleDateString();
      const year = fecha.slice(6,10);
      const month = fecha.slice(3,5);
      const day = fecha.slice(0,2);
      return (year+'-'+month+'-'+day);
  }
}
