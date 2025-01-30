import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { UiServiceService } from 'src/app/shared/services/ui-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  usuarioIngreso;
  logging: boolean = false;

  constructor (
    private readonly authService: AuthService,
    private readonly uiService: UiServiceService
  ){
    this.usuarioIngreso = {
      username: '',
      password: ''
    };
  }

  ingreso(){
    this.logging = true;
    if (this.usuarioIngreso.username == '' || this.usuarioIngreso.password == '') {
      // return this.uiService.alertaError('El usuario y la contraseña son obligatorios.')
      console.log("El usuario y la contraseña son obligatorios");

    }

    this.authService.login(this.usuarioIngreso).subscribe({
      next: () => {
        this.usuarioIngreso = {username: '', password: ''};
        this.logging = false;
      },
      error: (err) => {
        this.uiService.alertaError(err.error.message);
        localStorage.clear();
        this.logging = false;
      }
    });

  }

}
