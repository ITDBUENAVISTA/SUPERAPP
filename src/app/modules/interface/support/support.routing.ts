import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { InterfaceComponent } from '../interface.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: '',
    component: InterfaceComponent,
    canActivate: [],
    children: [
      {
        path: 'dashboard', component: DashboardComponent, canActivate: []
      },
      {
        path: 'usuarios', component: UsersComponent, canActivate: []
      },
      {
        path: '', redirectTo: '/dashboard', pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportRoutingModule { }
