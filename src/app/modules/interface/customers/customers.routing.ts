import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { InterfaceComponent } from '../interface.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PaymentsComponent } from './payments/payments.component';

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
        path: 'pagos', component: PaymentsComponent, canActivate: []
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
export class CustomerRoutingModule { }
