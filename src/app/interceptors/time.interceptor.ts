import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContext,
  HttpContextToken
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

const CHECK_TIME = new HttpContextToken<boolean>(() => false);

// Habilitar el contexto del interceptor
export function checkTime() {
  return new HttpContext().set(CHECK_TIME, true);
}

@Injectable()
export class TimeInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Verificar si el request tiene el contexto encendido
    if (request.context.get(CHECK_TIME)) {
      const start = performance.now();
      return next
      .handle(request)
      .pipe(
        tap(() => {
          const time = (performance.now() - start) + ' ms';
          // Mostrar el tiempo que tardó la petición
          console.log(request.url, time);
        })
      );
    }

    return next.handle(request)
  }
}
