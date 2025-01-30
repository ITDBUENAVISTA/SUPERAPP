import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { SupportRoutingModule } from './support.routing';
import { UsersComponent } from './users/users.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserFormComponent } from './users/user-form/user-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PaymentsComponent } from './payments/payments.component';



@NgModule({
  declarations: [
    DashboardComponent,
    UsersComponent,
    UserFormComponent,
    PaymentsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SupportRoutingModule,
    SharedModule
  ]
})
export class SupportModule { }
