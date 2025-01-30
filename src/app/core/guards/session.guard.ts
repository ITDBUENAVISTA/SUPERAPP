import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/auth.service';

export const sessionGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const valido = await authService.validateToken();
  if (valido) return true;
  router.navigateByUrl('/login');
  return false;
};
