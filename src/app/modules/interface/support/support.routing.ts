import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { InterfaceComponent } from '../interface.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { PaymentsComponent } from './payments/payments.component';
import { ReservationsComponent } from './reservations/reservations.component';

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
        path: 'pagos', component: PaymentsComponent, canActivate: []
      },
      {
        path: 'reservaciones', component: ReservationsComponent, canActivate: []
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
