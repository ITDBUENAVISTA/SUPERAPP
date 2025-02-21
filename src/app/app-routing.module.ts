import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { sessionGuard } from './core/guards/session.guard';

const routes: Routes = [
  // Redirigir al usuario dependiendo de su sesión
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login' // Puedes cambiarlo a 'dashboard' si prefieres
  },
  // Módulo de autenticación (maneja 'login' y otras rutas)
  {
    path: '',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  // Módulo principal (protegido por el guard)
  {
    path: '',
    canActivate: [sessionGuard],
    loadChildren: () => import('./modules/interface/interface.module').then(m => m.InterfaceModule)
  },
  // Redirigir cualquier ruta no encontrada a login
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
