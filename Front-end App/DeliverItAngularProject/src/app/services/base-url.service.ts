import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseUrlService {

  getBaseUrl(){
    return `${environment.apiUrl}/api/`
  }
}
