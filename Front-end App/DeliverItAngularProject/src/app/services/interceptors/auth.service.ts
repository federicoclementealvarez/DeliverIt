import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from '../login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private loginService: LoginService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let headers: HeadersInit = {};

    const token = this.loginService.getToken();
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
