import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseUrlService {

  getBaseUrl(){
    return 'http://localhost:3000/api/'
  }
}
