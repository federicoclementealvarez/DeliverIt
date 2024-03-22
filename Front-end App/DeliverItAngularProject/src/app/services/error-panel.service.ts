import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorPanelService {

  errorMessage: string = ''
  errorStatusCode: string = ''

  setProperties(err: any)
  {
    this.errorMessage = err.error.message
    this.errorStatusCode = err.status
  }
   
  removeProperties()
  {
    this.errorMessage = ''
    this.errorStatusCode = ''
  }
}
