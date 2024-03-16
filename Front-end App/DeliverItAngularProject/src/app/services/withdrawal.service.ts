import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Withdrawal } from '../entities/withdrawal.entity';
import { Observable, map } from 'rxjs';
import { BaseUrlService } from './base-url.service';


@Injectable({
  providedIn: 'root'
})

export class WithdrawalService 
{

  readonly url = `${this.baseUrl.getBaseUrl()}withdrawal` 

  constructor(private http: HttpClient, private baseUrl: BaseUrlService) { }


  findAllByDelivery(): Observable<Withdrawal[]>
  {
    return this.http.get<Withdrawal[]>(`${this.url}/all-delivery-withdrawals/65dff25c076e3ac03ba6ed89`).pipe(map((response: any) => response.data))
  }

  add(withdrawal: any): Observable<Withdrawal>
  {
      const body = {
      "amount": withdrawal.amount,
      "dateTime": withdrawal.dateTime,
      "user": "65dff25c076e3ac03ba6ed89"
    }
    return this.http.post<Withdrawal>(this.url, body).pipe(map((response: any) => response.message))
  }













}
