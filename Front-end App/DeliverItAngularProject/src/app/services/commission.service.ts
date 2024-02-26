import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseUrlService} from './base-url.service';
import { Observable, map } from 'rxjs';
import { Commission } from '../entities/commission.entity';


@Injectable({
  providedIn: 'root'
})

export class CommissionService 
{
  url: string = this.baseUrlService.getBaseUrl() + 'commissions/'
  
  constructor(private http: HttpClient, private baseUrlService: BaseUrlService) {}

  findAll(): Observable<Commission[]>
  {
    return this.http.get<Commission[]>(this.url).pipe(map((response: any) => response.data))
  }
  
  findOne(commissionId): Observable<Commission>
  {
    return this.http.get<Commission>(`${this.url}/${commissionId}`)
  }
 
  remove(commissionId: string): Observable<any>
  {
    return this.http.delete<any>(`${this.url}/${commissionId}`)
  }
  
  add(commission: Commission): Observable<any>
  {
    return this.http.post(this.url, commission)
  }
  
  update(commission: Commission): Observable<any>
  {
    const data = 
    { 
      percentage: commission.percentage,
      validSince: commission.validSince,
    }
    
    return this.http.put<any>(`${this.url}/${commission.id}`, data)
  }

  getCurrentCommission(commissions: Commission[])
  {
    const commissionsUpToDate = []

    for (const commission of commissions)
    {
      if(commission.validSince <= (new Date()).toISOString())
      {
        commissionsUpToDate.push(commission)
      }
    }
    return commissionsUpToDate[0]
  }
}