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

  public validateMaxCharString(maxChar: number):ValidatorFn{
    return(control: AbstractControl) : ValidationErrors| null =>{
      const isInvalid = (control.value.length>maxChar);
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

  public getCurrentDateTime()
  {
    const d = this.getTodayDate()
    //const h = [(new Date()).getHours(),(new Date()).getMinutes()].join(':')
    let h = '' + (new Date()).getHours()
    let m = '' + (new Date()).getMinutes()
    if (h.length < 2) h = '0' + h;
    if (m.length < 2) m = '0' + m;
    const t = [h,m].join(':')
    const dt = [d,t].join(' ')
    return dt
  }

}
