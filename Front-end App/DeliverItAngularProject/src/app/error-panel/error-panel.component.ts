import { Component } from '@angular/core';


@Component({
  selector: 'app-error-panel',
  templateUrl: './error-panel.component.html',
  styleUrls: ['./error-panel.component.scss']
})
export class ErrorPanelComponent 
{
  statusCode?: string = sessionStorage.getItem('statusCode')
  errorMsg?: string = sessionStorage.getItem('errorMessage')

}
