import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TenantInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const frontendHost = window.location.hostname;

    const cloned = req.clone({
      setHeaders: {
        'x-frontend-host': frontendHost
      }
    });

    return next.handle(cloned);
  }
}