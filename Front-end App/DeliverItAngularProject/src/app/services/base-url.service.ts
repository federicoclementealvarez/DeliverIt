import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseUrlService {

  getBaseUrl(){
    return `${environment.apiUrl}/`
  }
}
