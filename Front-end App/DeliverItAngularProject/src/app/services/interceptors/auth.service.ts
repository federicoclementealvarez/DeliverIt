import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let headers: HeadersInit = {};

    const token = sessionStorage.getItem('access_token');
    if (token) {
      headers = {
        Authorization: `Bearer ${token}`,
      };
    }

    request = request.clone({
      setHeaders: headers,
    });

    return next.handle(request);
  }
}
