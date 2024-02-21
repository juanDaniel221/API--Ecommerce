import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { tap } from 'rxjs/operators';

import { Auth } from '../models/authToke.model';
import { User } from '../models/user.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl: string = 'https://young-sands-07814.herokuapp.com';

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  // Autenticar usuario
  login(email: string, password: string) {
    return this.http.post<Auth>(`${this.apiUrl}/api/auth/login`, { email, password })
    .pipe(
      tap(response => {
        this.tokenService.saveToken(response.access_token);
      })
    )
  }

  // Obtener el perfil de un usuario autenticado
  profile() {
    return this.http.get<User>(`${this.apiUrl}/api/auth/profile`)
  }
}
