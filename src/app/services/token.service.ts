import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  // Guardar el token en localStorage
  saveToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  // Obtener el token de localStorage
  getToken() {
    const token = localStorage.getItem('access_token');
    return token;
  }
}
