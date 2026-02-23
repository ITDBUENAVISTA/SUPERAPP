import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../../core/services/users.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/modules/auth/auth.service';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {

  changePasswordForm: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly usersService: UsersService,
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordsMatchValidator
    });
  }

  passwordsMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { notMatching: true };
  }

  submit() {
    if (this.changePasswordForm.invalid) return;

    this.loading = true;
    this.errorMessage = '';

    const { currentPassword, newPassword } = this.changePasswordForm.value;

    this.usersService.changePassword({ currentPassword, newPassword })
      .subscribe({
        next: async () => {
          this.loading = false;

          await Swal.fire({
          icon: 'success',
          title: 'Contraseña actualizada',
          text: 'Por seguridad, debes iniciar sesión nuevamente.',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#0d6efd'
        });

        this.authService.logout();
          
        },
        error: (err) => {
          this.loading = false;

          if (err.status === 401) {
            Swal.fire({
              icon: 'error',
              title: 'Sesión expirada',
              text: 'Debes iniciar sesión nuevamente.'
            }).then(() => {
              this.authService.logout();
            });
            return;
          }

          this.errorMessage = err.error?.message || 'Error al cambiar la contraseña';
        }
      });
  }

}