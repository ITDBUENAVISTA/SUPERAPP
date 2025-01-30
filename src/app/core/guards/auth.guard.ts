import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { LocalStorageService } from '../services/local-storage.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const localStorageService = inject(LocalStorageService);
  const router = inject(Router);
  const valido = await authService.validateToken();
  if (valido) {
    const user = localStorageService.getUsuario();
    const rol = user?.rols;
    if (rol?.includes('01')) {
      router.navigateByUrl('/soporte/dashboard');
      return true;
    } else if (rol?.includes('02')) {
      router.navigateByUrl('/clientes/dashboard');
      return true;
    }
  }
  return true;
};
