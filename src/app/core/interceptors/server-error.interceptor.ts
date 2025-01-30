import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { UiServiceService } from 'src/app/shared/services/ui-service.service';

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {

  constructor(
    private readonly uiServices: UiServiceService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 500 && error.error) {
          this.uiServices.alertaError(`Por favor contacta con el administrador. ${error.error.code}`)
        }
        return throwError(() => error);
      })
    );
  }
}
