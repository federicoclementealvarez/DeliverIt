import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorPanelService } from '../error-panel.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private errorPanelService: ErrorPanelService,
    private router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          // Client-side error
          console.error('Client-side error:', error.error.message);
        } else {
          // Server-side error
          console.error(
            `Server-side error: ${error.status} - ${error.message}`
          );
          this.errorPanelService.setProperties(error);
          this.router.navigate(['error-panel']);
        }
        return throwError(
          () => new Error('Something went wrong; please try again later.')
        );
      })
    );
  }
}
