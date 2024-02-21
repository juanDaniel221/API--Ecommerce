import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private tokenService: TokenService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Agregar token de autenticación
    request = this.addToken(request);
    return next.handle(request);
  }

  // Agregar el token a la petición
  addToken(request: HttpRequest<unknown>) {
    // Obtener el token
    const token = this.tokenService.getToken();

    if (token) {
      // Clonar la petición
      const authRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      });

      return authRequest;
    }

    return request;
  }
}
