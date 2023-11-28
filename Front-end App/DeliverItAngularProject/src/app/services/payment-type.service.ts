import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrlService } from './base-url.service';
import { PaymentType } from '../entities/paymentType.entity';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentTypeService {
  url: string = this.baseUrlService.getBaseUrl() + 'paymentTypes/'

  constructor(private http: HttpClient, private baseUrlService: BaseUrlService) { }
  
  getAll(): Observable<PaymentType[]> {
    return this.http.get<PaymentType[]>(this.url)
      .pipe(
        map((response: any) => response.data)
      )
  }

  findOne(paymentTypeId: string): Observable<PaymentType> {
    return this.http.get<PaymentType>(`${this.url}/${paymentTypeId}`)
  }

  create(paymentType: PaymentType): Observable<any> {
    return this.http.post(this.url, paymentType)
  }

  update(paymentType: PaymentType): Observable<any> {
    const data = { description: paymentType.description }
    return this.http.put<any>(`${this.url}/${paymentType.id}`, data)
  }

  delete(paymentTypeId: string): Observable<any> {
    return this.http.delete<any>(`${this.url}/${paymentTypeId}`)
  }

}
