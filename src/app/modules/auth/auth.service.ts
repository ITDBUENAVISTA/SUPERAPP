import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/app/environments/environment';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { tap } from 'rxjs';
import { User } from 'src/app/core/interfaces/users/user.intrefaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly authURL = `${environment.apiUrl}`+'/auth';

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly localStorageService: LocalStorageService
  ) { }

  login(login_form: any){
    return this.http.post(`${this.authURL}/login`,login_form).pipe(
      tap( (resp: any) => {
        this.localStorageService.setToken(resp.data.accessToken);
        const authenticatedUser: User = resp.data.authenticatedUser;
        this.localStorageService.setUsuario(JSON.stringify(authenticatedUser));
        if((authenticatedUser.rols).includes('01')){
          this.router.navigateByUrl('/soporte/dashboard');
        } else if((authenticatedUser.rols).includes('02')){
          this.router.navigateByUrl('/clientes/dashboard');
        }
      })
    );
  }

  validateToken(){
    const token = this.localStorageService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return new Promise((resolve) => {
      this.http.get(`${this.authURL}/validate`, {headers}).subscribe({
        next: (res: any) =>{
          this.localStorageService.setToken(res.data.token);
          this.localStorageService.setUsuario(JSON.stringify(res.data.authenticatedUser));
          resolve(true);
        },
        error: () => {
          resolve(false);
        }
      });
    });
  }

  logout(){
    this.localStorageService.clear();
    this.router.navigateByUrl('/login')
  }
}
