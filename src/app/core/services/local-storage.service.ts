import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { User } from '../interfaces/users/user.intrefaces';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private readonly secretKey = '7728819923123';

  constructor() { }

  setToken(token: any): void {
    const tokenEncriptado = CryptoJS.AES.encrypt(token, this.secretKey).toString();
    sessionStorage.setItem('token', tokenEncriptado);
  }

  setUsuario(usuario: any): void {
    const usuarioEncriptado = CryptoJS.AES.encrypt(usuario, this.secretKey).toString();
    sessionStorage.setItem('usuario', usuarioEncriptado);
  }

  getToken(): any {
    const tokenEncriptado = sessionStorage.getItem('token');
    if (tokenEncriptado) {
      const bytes = CryptoJS.AES.decrypt(tokenEncriptado, this.secretKey);
      const token = bytes.toString(CryptoJS.enc.Utf8);
      return token;
    }
    return null;
  }

  getUsuario(): User{
    const usuarioEncriptado = sessionStorage.getItem('usuario');
    if (usuarioEncriptado) {
      const bytes = CryptoJS.AES.decrypt(usuarioEncriptado, this.secretKey);
      const userioJson = bytes.toString(CryptoJS.enc.Utf8);
      return JSON.parse(userioJson);
    }
    const user = {} as User;
    return user;
  }

  clear(): void {
    sessionStorage.clear();
  }
}
